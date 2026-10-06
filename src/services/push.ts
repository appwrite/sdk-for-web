import type {
    IClientOptions,
    IConnackPacket,
    IPublishPacket,
    MqttClient,
} from 'mqtt';

import { Client } from '../client';
import type { ResolvedTopic, Topic } from '../topic';

/** A message delivered on a subscribed topic (the MQTT analog of a Realtime event). */
export interface PushMessage {
    topic: string;
    /** The payload decoded as UTF-8 text, as it was sent. */
    data: string;
    /** The raw payload, for binary messages. */
    payload: Uint8Array;
    qos: number;
}

export type MessageCallback = (message: PushMessage) => void | Promise<void>;

/** Per-subscription options passed to `subscribe` and `PushSubscription.update`. */
export interface SubscribeOptions {
    /**
     * Also surface each matching message as a browser notification while the tab is
     * open. Defaults to false.
     */
    background?: boolean;
    /** Notification title for this subscription. Defaults to the message topic. */
    title?: string;
    /**
     * Retry delivery of messages missed while disconnected. `true` (the default) subscribes
     * at QoS 1 so the broker holds this topic's messages and redelivers them on reconnect;
     * `false` uses QoS 0 (at-most-once, may be lost). Per-subscription — the connection
     * always keeps its session (clean start off).
     */
    retry?: boolean;
}

/**
 * Handle for a live subscription. `unsubscribe()` drops it (and closes the connection
 * once the last one is gone); `update()` toggles this subscription's per-message options
 * without resubscribing.
 */
export interface PushSubscription {
    unsubscribe(): void;
    update(options: SubscribeOptions): void;
}

type AuthMethod = 'appwrite-jwt' | 'appwrite-session' | '';

const TAB_ID_KEY = 'appwrite-push-client-id';

interface Transport {
    connect: typeof import('mqtt').connect;
    Buffer: typeof import('buffer').Buffer;
}

// Loaded on first connect, so an app that never uses Push does not bundle mqtt.js.
let transport: Promise<Transport> | null = null;

function loadTransport(): Promise<Transport> {
    if (!transport) {
        transport = Promise.all([import('mqtt'), import('buffer')]).then(
            // The browser build of mqtt.js (dist/mqtt.esm.js) exports only a default.
            ([mqtt, buffer]) => ({
                connect: (mqtt.default ?? mqtt).connect,
                Buffer: buffer.Buffer,
            }),
        );
        // A failed load must not poison later connects.
        transport.catch(() => {
            transport = null;
        });
    }
    return transport;
}

// Fixed connection tuning — not exposed as options.
const KEEP_ALIVE_SECONDS = 60;
const RECONNECT_PERIOD_MS = 2000;

/**
 * Appwrite native push service — the Realtime analog over an MQTT broker, without
 * FCM or APNS. In the browser the transport is MQTT 5 over WebSocket: while the page is
 * open the connection stays up and each message is handed to your callback, and a
 * subscription may also opt into a browser notification per message.
 *
 * The connection has no tunables — it always keeps its session (clean start off) so the
 * broker can redeliver missed messages, and reliability is chosen per subscription via
 * `retry`. `subscribe` opens the connection lazily and returns a
 * {@link PushSubscription} handle (unlike Realtime's bare unsubscribe callable — Push
 * carries per-subscription state). The credential is read off the client — set a JWT or
 * session on it (`Client.setJWT` / `Client.setSession`), the same way every other service
 * reads auth.
 *
 *     const client = new Client().setEndpoint(...).setProject(...).setJWT(jwt);
 *     const push = new Push(client);
 *     const sub = await push.subscribe('user/123/#', (m) =>
 *       console.log(m.topic, m.data),
 *     );
 *     // sub.update({ background: true }); sub.unsubscribe();
 */
export class Push {
    client: Client;

    private mqtt: MqttClient | null = null;
    private connecting: Promise<void> | null = null;
    private Buffer: Transport['Buffer'] | null = null;
    /** Bumped by close(), so a connect still loading mqtt.js knows to stop. */
    private generation = 0;
    /** Set once the first CONNACK lands, so 'connect' events after are reconnects. */
    private everConnected = false;

    private onOpenCb?: () => void;
    private onCloseCb?: () => void;
    private onErrorCb?: (error: Error) => void;
    /** Errors already handed to onError, so one failure is reported once. */
    private reported = new WeakSet<Error>();
    /** mqtt.js connect errors mapped to the error handed out for them (see connectError). */
    private connectErrors = new WeakMap<Error, Error>();
    /** True while the first connect is in flight: its errors go to the waiting caller. */
    private opening = false;

    // Local id -> subscription state. The id is never sent to the broker; it only lets
    // the same topic carry more than one callback (each with its own options).
    /**
     * This tab's part of the default client id when the tab has none yet (see claimTabId):
     * random, but kept for this instance so reconnects resume the same broker session.
     */
    private readonly fallbackClientId = randomId();
    /** The default client id claimed for this instance's connection, released on close(). */
    private tabId = '';
    /** In-flight claim of {@link tabId}, memoized per generation: a credential switch (same
     * generation) shares the one claim; a close/reopen (new generation) chains a fresh claim. */
    private tabIdClaim: Promise<string> | null = null;
    private tabIdClaimGeneration = -1;
    private connectedKey = '';
    private connectionEpoch = 0;

    private readonly subscriptions = new Map<
        string,
        {
            topic: string;
            callback: MessageCallback;
            background: boolean;
            title?: string;
            qos: 0 | 1;
        }
    >();

    constructor(client: Client) {
        this.client = client;
    }

    // The broker subscription for a filter uses the highest QoS any local subscription on
    // it wants, so a QoS-0 subscription never downgrades a QoS-1 one sharing the filter.
    private effectiveQos(filter: string): 0 | 1 {
        for (const sub of this.subscriptions.values()) {
            if (sub.topic === filter && sub.qos === 1) {
                return 1;
            }
        }
        return 0;
    }

    /** Register a callback invoked when the connection opens (CONNACK success). */
    onOpen(callback: () => void): this {
        this.onOpenCb = callback;
        return this;
    }

    /** Register a callback invoked when the connection closes. */
    onClose(callback: () => void): this {
        this.onCloseCb = callback;
        return this;
    }

    /** Register a callback invoked on a connection error. */
    onError(callback: (error: Error) => void): this {
        this.onErrorCb = callback;
        return this;
    }

    /**
     * The signed-in user's own topic, `users/<userId>`, for a topic-less subscribe. The id comes
     * from the credential the connection authenticates with: the JWT when one is set (never
     * the session, which could belong to a different user), else the session.
     */
    private userTopic(): string {
        const { jwt, session } = this.client.config;
        const userId = jwt ? userIdFromJwt(jwt) : userIdFromSession(session);
        if (!userId) {
            throw new Error(
                'subscribe() without a topic needs a signed-in user: set a JWT or session on the client',
            );
        }
        return `users/${userId}`;
    }

    /**
     * Hand an error to the onError callback, once per error. These errors happen outside any
     * call (reconnects, broker DISCONNECTs, background re-subscribes), so they are never
     * thrown, which would crash the app from inside mqtt.js: with no callback registered
     * they are logged, like Realtime does.
     */
    private report(error: unknown): void {
        const err = toError(error);
        if (this.reported.has(err)) {
            return;
        }
        this.reported.add(err);
        if (!this.onErrorCb) {
            console.error('Appwrite Push error:', err);
            return;
        }
        try {
            this.onErrorCb(err);
        } catch (callbackError) {
            console.error('Appwrite Push onError threw:', callbackError);
        }
    }

    /**
     * For a call that fails to its caller: report the error to onError when a callback is
     * registered, then throw it to the caller, who can catch it.
     */
    private fail(error: unknown): never {
        const err = toError(error);
        if (this.onErrorCb) {
            this.report(err);
        }
        throw err;
    }

    // --- realtime-like API ---

    /**
     * Subscribe to one or more topics. Resolves to a {@link PushSubscription} handle.
     *
     * Each topic is a string or a `Topic` builder, e.g.
     * `Topic.path(['user', userId]).all()`.
     *
     * Called with only a callback, `subscribe((message) => {...}, options)` subscribes to the
     * signed-in user's own topic, `users/<userId>`, like FCM/APNs delivery to a device. The
     * user id is read from the JWT (or session) set on the client. This form defaults to
     * `background: true` and `retry: true` (QoS 1); pass either in the options to override.
     *
     * Awaiting resolves only once the broker has acked every SUBSCRIBE (SUBACK):
     * the broker only starts routing a topic once its subscription is registered,
     * so publishing before the ack races the message ahead of the subscription and
     * it is dropped (no retained replay on MQTT). Awaiting here makes
     * subscribe-then-publish reliable.
     *
     * Pass `{ background: true, title }` to also show a browser notification per matching
     * message while the tab is open, and `{ retry: false }` for at-most-once
     * (QoS 0) delivery; toggle either later with the handle's `update`.
     */
    subscribe(
        callback: MessageCallback,
        options?: SubscribeOptions,
    ): Promise<PushSubscription>;
    subscribe(
        topics:
            string | Topic | ResolvedTopic | (string | Topic | ResolvedTopic)[],
        callback: MessageCallback,
        options?: SubscribeOptions,
    ): Promise<PushSubscription>;
    async subscribe(
        topicsOrCallback:
            | string
            | Topic
            | ResolvedTopic
            | (string | Topic | ResolvedTopic)[]
            | MessageCallback,
        callbackOrOptions?: MessageCallback | SubscribeOptions,
        topicOptions: SubscribeOptions = {},
    ): Promise<PushSubscription> {
        // Every failure reaches onError (when registered) and is thrown to the caller.
        try {
            return await this.subscribeWith(
                topicsOrCallback,
                callbackOrOptions,
                topicOptions,
            );
        } catch (err) {
            this.fail(err);
        }
    }

    private async subscribeWith(
        topicsOrCallback:
            | string
            | Topic
            | ResolvedTopic
            | (string | Topic | ResolvedTopic)[]
            | MessageCallback,
        callbackOrOptions: MessageCallback | SubscribeOptions | undefined,
        topicOptions: SubscribeOptions,
    ): Promise<PushSubscription> {
        // Topic-less form: subscribe(callback, options) targets the signed-in user's topic.
        const userForm = typeof topicsOrCallback === 'function';
        const topics = userForm ? this.userTopic() : topicsOrCallback;
        const callback = (
            userForm ? topicsOrCallback : callbackOrOptions
        ) as MessageCallback;
        const options = (
            userForm ? (callbackOrOptions ?? {}) : topicOptions
        ) as SubscribeOptions;
        const topicList = (Array.isArray(topics) ? topics : [topics]).map(
            (topic) => topic.toString(),
        );
        // The user topic defaults to background delivery, like FCM/APNs; topics default off.
        const background = options.background ?? userForm;
        const qos: 0 | 1 = (options.retry ?? true) ? 1 : 0;

        if (background) {
            this.requestNotificationPermission();
        }

        let client: MqttClient;
        try {
            client = await this.connect();
        } catch (err) {
            if (err instanceof SupersededError) {
                return this.subscribeWith(
                    topicsOrCallback,
                    callbackOrOptions,
                    topicOptions,
                );
            }
            throw err;
        }
        const epoch = this.connectionEpoch;

        const ids: string[] = [];
        const acks: Promise<void>[] = [];
        for (const topic of topicList) {
            const id = randomId();
            ids.push(id);
            this.subscriptions.set(id, {
                topic,
                callback,
                background,
                title: options.title,
                qos,
            });
            acks.push(
                new Promise<void>((resolve, reject) => {
                    client.subscribe(
                        topic,
                        { qos: this.effectiveQos(topic) },
                        (err) => (err ? reject(err) : resolve()),
                    );
                }),
            );
        }

        const unsubscribe = () => {
            // Filters whose removed sub was QoS 1: their effective QoS may now drop.
            const maybeDowngrade = new Set<string>();
            for (const id of ids) {
                const entry = this.subscriptions.get(id);
                this.subscriptions.delete(id);
                if (entry?.qos === 1) {
                    maybeDowngrade.add(entry.topic);
                }
                // Only unsubscribe the broker filter once its last local callback is gone.
                const stillUsed = [...this.subscriptions.values()].some(
                    (s) => s.topic === entry?.topic,
                );
                if (entry && this.mqtt && !stillUsed) {
                    this.mqtt.unsubscribe(entry.topic, (err) => {
                        if (err) {
                            this.report(err);
                        }
                    });
                }
            }
            // A filter that lost its last QoS-1 sub but still has QoS-0 subs must be
            // re-SUBSCRIBEd at the lower QoS, or the broker keeps replaying to at-most-once subs.
            for (const filter of maybeDowngrade) {
                const stillUsed = [...this.subscriptions.values()].some(
                    (s) => s.topic === filter,
                );
                if (stillUsed && this.effectiveQos(filter) === 0) {
                    this.mqtt?.subscribe(filter, { qos: 0 }, (err) => {
                        if (err) {
                            this.report(err);
                        }
                    });
                }
            }
            if (this.subscriptions.size === 0) {
                this.close();
            }
        };

        // If any topic's subscribe fails, roll this call's registrations back (and drop
        // any now-unused broker filter) so a failed subscribe leaks no callback, then rethrow.
        try {
            await Promise.all(acks);
        } catch (err) {
            if (epoch !== this.connectionEpoch) {
                for (const id of ids) {
                    this.subscriptions.delete(id);
                }
                return this.subscribeWith(
                    topicsOrCallback,
                    callbackOrOptions,
                    topicOptions,
                );
            }
            unsubscribe();
            throw err;
        }

        const update = (next: SubscribeOptions) => {
            const enabling = next.background === true;
            const changedFilters = new Set<string>();
            // Remember the pre-update QoS per id so a rejected re-SUBSCRIBE can be rolled back.
            const previous = new Map<string, 0 | 1>();
            for (const id of ids) {
                const entry = this.subscriptions.get(id);
                if (!entry) {
                    continue;
                }
                if (next.background !== undefined) {
                    entry.background = next.background;
                }
                if (next.title !== undefined) {
                    entry.title = next.title;
                }
                if (next.retry !== undefined) {
                    const q: 0 | 1 = next.retry ? 1 : 0;
                    if (q !== entry.qos) {
                        previous.set(id, entry.qos);
                        entry.qos = q;
                        changedFilters.add(entry.topic);
                    }
                }
            }
            if (enabling) {
                this.requestNotificationPermission();
            }
            // Re-SUBSCRIBE the affected filters at their new effective QoS (a SUBSCRIBE to an
            // existing filter just updates its QoS — no unsubscribe gap). If the broker rejects
            // it, the old subscription still stands, so restore the local QoS to match and
            // surface the error rather than silently assuming the change took effect.
            for (const filter of changedFilters) {
                this.mqtt?.subscribe(
                    filter,
                    { qos: this.effectiveQos(filter) },
                    (err) => {
                        if (!err) {
                            return;
                        }
                        for (const [id, q] of previous) {
                            const entry = this.subscriptions.get(id);
                            if (entry && entry.topic === filter) {
                                entry.qos = q;
                            }
                        }
                        this.report(err);
                    },
                );
            }
        };

        return { unsubscribe, update };
    }

    /** Tear down the connection and drop all active subscriptions. */
    close(): void {
        if (this.mqtt) {
            this.mqtt.end(true);
            this.mqtt = null;
        }
        if (this.tabId !== '') {
            releaseTabId(this.tabId);
            this.tabId = '';
        }
        this.connecting = null;
        // Bumping the generation ends the current claim: one still in flight releases its id when
        // it resolves, and the next open() chains a fresh claim after it (see claimClientId).
        this.generation++;
        this.everConnected = false;
        this.subscriptions.clear();
    }

    /**
     * Re-register every active subscription. Called on each reconnect so a client that
     * reconnects with a fresh (or cleared) session does not silently stop receiving;
     * re-subscribing an existing filter is idempotent.
     */
    private resubscribeAll(): void {
        const client = this.mqtt;
        if (!client) {
            return;
        }
        const filters = new Set(
            [...this.subscriptions.values()].map((s) => s.topic),
        );
        for (const filter of filters) {
            client.subscribe(
                filter,
                { qos: this.effectiveQos(filter) },
                (err) => {
                    if (err) {
                        this.report(err);
                    }
                },
            );
        }
    }

    // --- internals ---

    private connect(): Promise<MqttClient> {
        if (
            (this.mqtt || this.connecting) &&
            this.connectedKey !== this.credentialKey()
        ) {
            this.connectionEpoch++;
            this.mqtt?.end(true);
            this.mqtt = null;
            this.connecting = null;
            this.everConnected = this.subscriptions.size > 0;
        }
        if (this.mqtt && !this.connecting) {
            return Promise.resolve(this.mqtt);
        }
        if (!this.connecting) {
            const connecting = this.open();
            this.connecting = connecting;
            // A failed open must not poison future attempts — clear the cached
            // in-flight promise so a later subscribe/publish can retry.
            connecting.catch(() => {
                if (this.connecting === connecting) {
                    this.connecting = null;
                }
            });
        }
        return this.connecting.then(() => this.mqtt!);
    }

    private credential(): { authMethod: AuthMethod; credential: string } {
        if (this.client.config.jwt) {
            return {
                authMethod: 'appwrite-jwt',
                credential: this.client.config.jwt,
            };
        }
        if (this.client.config.session) {
            return {
                authMethod: 'appwrite-session',
                credential: this.client.config.session,
            };
        }
        throw new Error(
            'No credential set on the client; call Client.setJWT() or Client.setSession() first.',
        );
    }

    private credentialKey(): string {
        try {
            const { authMethod, credential } = this.credential();
            return [
                this.endpointUrl(),
                this.client.config.project ?? '',
                this.client.config.pushClientId ?? '',
                authMethod,
                credential,
            ].join('|');
        } catch {
            return '';
        }
    }

    private endpointUrl(): string {
        // The push endpoint set on the client (Client.setPushEndpoint) wins.
        if (this.client.config.endpointPush !== '') {
            return this.client.config.endpointPush;
        }
        // Otherwise default to a `push.` host on the regular API endpoint (not the
        // independently-configurable realtime endpoint), scheme switched to ws/wss.
        const wsEndpoint = this.client.config.endpoint
            .replace('https://', 'wss://')
            .replace('http://', 'ws://');
        // Prefix the host with `push.` (scheme://host/path -> scheme://push.host/path).
        const separator = '://';
        const at = wsEndpoint.indexOf(separator);
        return at === -1
            ? wsEndpoint
            : `${wsEndpoint.slice(0, at + separator.length)}push.${wsEndpoint.slice(at + separator.length)}`;
    }

    /**
     * Claim this connection's default client id, memoized per generation. A credential switch (same
     * generation) shares the one claim, so concurrent open() calls never each claim. A close/reopen
     * (a new generation) chains a fresh claim after the previous one has settled and released its
     * id, so the reopened connection can take the tab's stored id back rather than a fallback. A
     * claim that resolves after its generation has ended releases its id instead of keeping it, so
     * a stale open connects with nothing reserved and the stored id is never stranded.
     */
    private claimClientId(): Promise<string> {
        const generation = this.generation;
        if (
            this.tabIdClaim === null ||
            this.tabIdClaimGeneration !== generation
        ) {
            const previous = this.tabIdClaim ?? Promise.resolve('');
            this.tabIdClaimGeneration = generation;
            const claim = previous
                .catch(() => '')
                .then(() => claimTabId(this.fallbackClientId))
                .then((id) => {
                    if (this.generation !== generation) {
                        releaseTabId(id);
                        return '';
                    }
                    this.tabId = id;
                    return id;
                });
            this.tabIdClaim = claim;
            return claim;
        }
        return this.tabIdClaim;
    }

    private async open(): Promise<void> {
        const { authMethod, credential } = this.credential();
        this.connectedKey = this.credentialKey();
        const epoch = this.connectionEpoch;
        const generation = this.generation;

        const project = this.client.config.project ?? '';
        // Client id, when the app did not set one with Client.setPushClientId(). Unlike the
        // native SDKs (which send an empty id and let the broker derive a stable one), mqtt.js
        // rejects an empty id with clean start off, so derive one per user and tab from the
        // credential this connection authenticates with (the JWT's userId, or the session's user
        // id) and an id kept in the tab's sessionStorage. It stays the same across reloads, so
        // the broker's replay cursor resumes, and differs between tabs and browsers, so two of
        // them do not take over each other's session. The credential itself is never used.
        const userId =
            authMethod === 'appwrite-jwt'
                ? userIdFromJwt(credential)
                : userIdFromSession(credential);
        // Claim once per instance (memoized) and reuse it across reconnects and credential
        // switches, so concurrent open() calls never each claim and strand the tab's stored id.
        // Concurrent instances still get distinct ids. If close() ran while the claim was pending
        // this open is stale, so stop before connecting (the claim releases its own id).
        if (!this.client.config.pushClientId) {
            await this.claimClientId();
            if (generation !== this.generation) {
                throw new Error('Push was closed while connecting.');
            }
        }
        const tabId = this.tabId;
        const clientId =
            this.client.config.pushClientId ||
            (userId ? `${userId}-${tabId}` : tabId);

        const { connect, Buffer } = await loadTransport();
        if (generation !== this.generation) {
            throw new Error('Push was closed while connecting.');
        }
        if (epoch !== this.connectionEpoch) {
            throw new SupersededError();
        }
        this.Buffer = Buffer;

        const options: IClientOptions = {
            clientId,
            protocolVersion: 5,
            clean: false, // always keep the session so the broker can replay QoS-1 topics
            keepalive: KEEP_ALIVE_SECONDS,
            reconnectPeriod: RECONNECT_PERIOD_MS,
            manualConnect: true,
            // Enhanced auth carried in CONNECT properties.
            properties: {
                authenticationMethod: authMethod,
                authenticationData: Buffer.from(credential),
                userProperties: { projectId: project },
            },
        };

        const client = connect(this.endpointUrl(), options);
        this.mqtt = client;

        client.on('message', (_topic, _payload, packet) => {
            this.dispatch(packet).catch((err) => this.report(err));
        });

        // Persistent lifecycle listeners. Re-register every subscription on reconnect
        // (harmless if the broker resumed our session), and surface the lifecycle to the
        // caller's onOpen/onClose/onError hooks.
        client.on('connect', () => {
            if (this.everConnected) {
                this.resubscribeAll();
            }
            this.everConnected = true;
            this.onOpenCb?.();
        });
        client.on('close', () => this.onCloseCb?.());
        // The broker explains a refused CONNECT (CONNACK) or a server-initiated DISCONNECT
        // with an MQTT 5 Reason String. mqtt.js reports only the reason code, so capture the
        // string off the packet (packetreceive fires before mqtt.js handles it) and hand it
        // to onError as the error message.
        let refusedReason: string | undefined;
        client.on('packetreceive', (packet) => {
            if (packet.cmd === 'connack') {
                refusedReason =
                    (packet.reasonCode ?? 0) !== 0
                        ? packet.properties?.reasonString
                        : undefined;
            }
        });
        client.on('error', (err) => {
            if (epoch !== this.connectionEpoch) {
                return;
            }
            const error = this.connectError(err, refusedReason);
            // While the first connect is pending its caller receives the error (and reports it
            // through fail()); afterwards, e.g. on reconnect, report it here.
            if (!this.opening) {
                this.report(error);
            }
        });
        client.on('disconnect', (packet) => {
            if ((packet.reasonCode ?? 0) !== 0) {
                this.report(
                    new Error(
                        packet.properties?.reasonString ??
                            `Disconnected by the broker (reason ${packet.reasonCode})`,
                    ),
                );
            }
        });

        this.opening = true;
        await new Promise<void>((resolve, reject) => {
            const onConnect = (packet: IConnackPacket) => {
                cleanup();
                if (epoch !== this.connectionEpoch) {
                    reject(new SupersededError());
                    return;
                }
                const rc = packet.reasonCode ?? packet.returnCode ?? 0;
                if (rc !== 0) {
                    this.close();
                    reject(
                        new Error(
                            refusedReason ??
                                `MQTT authentication failed (CONNACK reason ${rc})`,
                        ),
                    );
                } else {
                    resolve();
                }
            };
            const onError = (err: Error) => {
                cleanup();
                if (epoch !== this.connectionEpoch) {
                    reject(new SupersededError());
                    return;
                }
                this.close();
                reject(this.connectError(err, refusedReason));
            };
            const onClose = () => {
                if (epoch !== this.connectionEpoch) {
                    cleanup();
                    reject(new SupersededError());
                }
            };
            const cleanup = () => {
                if (epoch === this.connectionEpoch) {
                    this.opening = false;
                }
                client.removeListener('connect', onConnect);
                client.removeListener('error', onError);
                client.removeListener('close', onClose);
            };
            client.on('connect', onConnect);
            client.on('error', onError);
            client.on('close', onClose);
            client.connect();
        });
    }

    /**
     * The error for a failed connect: the broker's Reason String when it sent one (a refused
     * CONNACK), else mqtt.js's error. Memoized so both error listeners hand out the same
     * object and it is reported once.
     */
    private connectError(err: unknown, reason: string | undefined): Error {
        const source = toError(err);
        let error = this.connectErrors.get(source);
        if (!error) {
            error = reason ? new Error(reason) : source;
            this.connectErrors.set(source, error);
        }
        return error;
    }

    /** Fan a delivered packet out to every subscription whose filter matches. */
    private async dispatch(packet: IPublishPacket): Promise<void> {
        const Buffer = this.Buffer!;
        const payload = Buffer.isBuffer(packet.payload)
            ? packet.payload
            : Buffer.from(packet.payload);
        const message: PushMessage = {
            topic: packet.topic.toString(),
            data: new TextDecoder().decode(payload),
            payload,
            qos: packet.qos,
        };
        for (const sub of this.subscriptions.values()) {
            if (matches(sub.topic, message.topic)) {
                await sub.callback(message);
                // Notification is per-subscription: only subs that opted in post one,
                // each with its own title.
                if (sub.background) {
                    this.notify(message, sub.title);
                }
            }
        }
    }

    private requestNotificationPermission(): void {
        if (
            typeof Notification !== 'undefined' &&
            Notification.permission === 'default'
        ) {
            Promise.resolve(Notification.requestPermission()).catch((err) =>
                this.report(err),
            );
        }
    }

    /** Post a browser notification for a message a background subscription matched. */
    private notify(message: PushMessage, title?: string): void {
        if (
            typeof Notification === 'undefined' ||
            Notification.permission !== 'granted'
        ) {
            return;
        }
        try {
            new Notification(title ?? message.topic, {
                body: message.data,
            });
        } catch {
            // Some browsers only allow notifications from a service worker; ignore.
        }
    }
}

class SupersededError extends Error {
    constructor() {
        super('The push connection was superseded');
    }
}

/** Normalize anything thrown or passed to an error handler into an `Error`. */
function toError(error: unknown): Error {
    return error instanceof Error ? error : new Error(String(error));
}

/**
 * The userId claim from an Appwrite JWT, used as the default MQTT client id so the
 * broker's replay cursor is stable per user. Returns '' when the token is not a decodable JWT
 * (e.g. a plain string), so the caller can fall back to the session or raw credential.
 */
function userIdFromJwt(jwt?: string): string {
    if (!jwt) {
        return '';
    }
    const parts = jwt.split('.');
    if (parts.length < 2) {
        return '';
    }
    try {
        const payload = JSON.parse(
            decodeBase64(parts[1].replace(/-/g, '+').replace(/_/g, '/')),
        );
        return typeof payload.userId === 'string' ? payload.userId : '';
    } catch {
        return '';
    }
}

/**
 * The user id inside a session secret, which is base64 of JSON `{"id": <userId>, "secret": ...}`.
 * Returns '' when the value is not such a secret.
 */
function userIdFromSession(session?: string): string {
    if (!session) {
        return '';
    }
    try {
        const payload = JSON.parse(decodeBase64(session));
        return typeof payload.id === 'string' ? payload.id : '';
    } catch {
        return '';
    }
}

/** Ids in use by live connections in this page, so two Push instances never share a client id. */
const claimedTabIds = new Set<string>();
/** The tab's stored id, resolved and locked once per page (see claimStoredTabId). */
let storedTabIdClaim: Promise<string> | null = null;

/**
 * A default client id for one Push connection in this page. The first connection alive takes the
 * tab's stored id (kept in sessionStorage and locked for the page's lifetime, so it stays the same
 * across reloads and the broker's replay cursor resumes). Any connection alive at the same time
 * takes a distinct locked id instead, so simultaneous Push instances never share a client id and
 * so cannot take over each other's broker session. `fallback` is this instance's own random id.
 */
async function claimTabId(fallback: string): Promise<string> {
    const stored = await claimStoredTabId(fallback);
    if (stored !== '' && !claimedTabIds.has(stored)) {
        claimedTabIds.add(stored);
        return stored;
    }
    // The tab's id is taken by another live connection here: take a distinct, locked id without
    // touching the tab's stored cursor.
    let id = fallback;
    while (claimedTabIds.has(id)) {
        id = randomId();
    }
    const locks =
        typeof navigator === 'undefined' ? undefined : navigator.locks;
    if (locks) {
        await holdTabId(locks, id);
    }
    claimedTabIds.add(id);
    return id;
}

/** Free an id when its connection closes, so a later connection can reuse it (e.g. the stored id). */
function releaseTabId(id: string): void {
    claimedTabIds.delete(id);
}

/**
 * The tab's stored id, resolved and locked once per page: the value in sessionStorage when a lock
 * on it is free (this tab owns it), else a fresh id that is locked and stored. Without Web Locks
 * (or when locking fails) a copied id cannot be told apart from another tab's, so the page uses a
 * fresh id and leaves sessionStorage alone. '' when sessionStorage cannot be read, so the caller
 * falls back to its own id.
 */
function claimStoredTabId(fallback: string): Promise<string> {
    storedTabIdClaim ??= (async () => {
        const locks =
            typeof navigator === 'undefined' ? undefined : navigator.locks;
        if (!locks) {
            return fallback;
        }
        let stored: string | null;
        try {
            stored = window.sessionStorage.getItem(TAB_ID_KEY);
        } catch {
            return '';
        }
        if (stored && (await holdTabId(locks, stored))) {
            return stored;
        }
        if (!(await holdTabId(locks, fallback))) {
            return fallback;
        }
        try {
            window.sessionStorage.setItem(TAB_ID_KEY, fallback);
        } catch {
            // Not persisted, but still usable as this page's stored id for this session.
        }
        return fallback;
    })();
    return storedTabIdClaim;
}

function holdTabId(locks: LockManager, id: string): Promise<boolean> {
    return new Promise((resolve) => {
        locks
            .request(`${TAB_ID_KEY}:${id}`, { ifAvailable: true }, (lock) => {
                resolve(lock !== null);
                return lock ? new Promise<void>(() => {}) : undefined;
            })
            .catch(() => resolve(false));
    });
}

/** Base64 to UTF-8 text without `buffer`, which only loads once Push connects. */
function decodeBase64(value: string): string {
    return new TextDecoder().decode(
        Uint8Array.from(atob(value), (char) => char.charCodeAt(0)),
    );
}

/** A hex id, uuid4-like enough for a client-generated client id suffix. */
function randomId(): string {
    let out = '';
    for (let i = 0; i < 32; i++) {
        out += Math.floor(Math.random() * 16).toString(16);
    }
    return out;
}

/** MQTT topic-filter match with '+' (single level) and '#' (multi level). */
function matches(filter: string, topic: string): boolean {
    const filterParts = filter.split('/');
    const topicParts = topic.split('/');
    for (let i = 0; i < filterParts.length; i++) {
        const part = filterParts[i];
        if (part === '#') {
            return true;
        }
        if (i >= topicParts.length) {
            return false;
        }
        if (part !== '+' && part !== topicParts[i]) {
            return false;
        }
    }
    return filterParts.length === topicParts.length;
}
