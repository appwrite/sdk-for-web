import { AppwriteException, Client } from '../client';
import { Channel, ActionableChannel, ResolvedChannel } from '../channel';
import { Query } from '../query';

export type RealtimeSubscription = {
    close: () => Promise<void>;
}

export type RealtimeCallback<T = any> = {
    channels: Set<string>;
    queries: string[]; // Array of query strings
    callback: (event: RealtimeResponseEvent<T>) => void;
}

export type RealtimeResponse = {
    type: string;
    data?: any;
}

export type RealtimeResponseEvent<T = any> = {
    events: string[];
    channels: string[];
    timestamp: string;
    payload: T;
    subscriptions: string[]; // Backend-provided subscription IDs
}

export type RealtimeResponseConnected = {
    channels: string[];
    user?: object;
    subscriptions?: { [slot: string]: string }; // Map slot index -> subscriptionId
}

export type RealtimeRequest = {
    type: 'authentication' | 'subscribe';
    data: any;
}

type RealtimeRequestSubscribeRow = {
    subscriptionId?: string;
    channels: string[];
    queries: string[];
}

type RealtimeResponseAction = {
    to?: string;
    success?: boolean;
    subscriptions?: Array<{
        subscriptionId?: string;
        channels?: string[];
        queries?: string[];
    }>;
}

export enum RealtimeCode {
    NORMAL_CLOSURE = 1000,
    POLICY_VIOLATION = 1008,
    UNKNOWN_ERROR = -1
}

export class Realtime {
    private readonly TYPE_ERROR = 'error';
    private readonly TYPE_EVENT = 'event';
    private readonly TYPE_PONG = 'pong';
    private readonly TYPE_CONNECTED = 'connected';
    private readonly TYPE_RESPONSE = 'response';
    private readonly DEBOUNCE_MS = 1;
    private readonly HEARTBEAT_INTERVAL = 20000; // 20 seconds in milliseconds

    private client: Client;
    private socket?: WebSocket;
    // Slot-centric state: Map<slot, { channels: Set<string>, queries: string[], callback: Function }>
    private activeSubscriptions = new Map<number, RealtimeCallback<any>>();
    // Map slot index -> subscriptionId (from backend)
    private slotToSubscriptionId = new Map<number, string>();
    // Inverse map: subscriptionId -> slot index (for O(1) lookup)
    private subscriptionIdToSlot = new Map<string, number>();
    private heartbeatTimer?: number;

    private subCallDepth = 0;
    private pendingSubscribeSlots: number[] = [];
    private reconnectAttempts = 0;
    private subscriptionsCounter = 0;
    private connectionId = 0;
    private reconnect = true;

    private onErrorCallbacks: Array<(error?: Error, statusCode?: number) => void> = [];
    private onCloseCallbacks: Array<() => void> = [];
    private onOpenCallbacks: Array<() => void> = [];

    constructor(client: Client) {
        this.client = client;
    }

    /**
     * Register a callback function to be called when an error occurs
     *
     * @param {Function} callback - Callback function to handle errors
     * @returns {void}
     */
    public onError(callback: (error?: Error, statusCode?: number) => void): void {
        this.onErrorCallbacks.push(callback);
    }

    /**
     * Register a callback function to be called when the connection closes
     *
     * @param {Function} callback - Callback function to handle connection close
     * @returns {void}
     */
    public onClose(callback: () => void): void {
        this.onCloseCallbacks.push(callback);
    }

    /**
     * Register a callback function to be called when the connection opens
     *
     * @param {Function} callback - Callback function to handle connection open
     * @returns {void}
     */
    public onOpen(callback: () => void): void {
        this.onOpenCallbacks.push(callback);
    }

    private startHeartbeat(): void {
        this.stopHeartbeat();
        this.heartbeatTimer = window.setInterval(() => {
            if (this.socket && this.socket.readyState === WebSocket.OPEN) {
                this.socket.send(JSON.stringify({ type: 'ping' }));
            }
        }, this.HEARTBEAT_INTERVAL);
    }

    private stopHeartbeat(): void {
        if (this.heartbeatTimer) {
            window.clearInterval(this.heartbeatTimer);
            this.heartbeatTimer = undefined;
        }
    }

    private async createSocket(): Promise<void> {
        if (this.activeSubscriptions.size === 0) {
            this.reconnect = false;
            await this.closeSocket();
            return;
        }

        const projectId = this.client.config.project;
        if (!projectId) {
            throw new AppwriteException('Missing project ID');
        }

        // URL carries only the project; channels/queries are sent via the subscribe message.
        const queryParams = `project=${projectId}`;

        const endpoint =
            this.client.config.endpointRealtime !== ''
                ? this.client.config.endpointRealtime
                : this.client.config.endpoint || '';
        const realtimeEndpoint = endpoint
            .replace('https://', 'wss://')
            .replace('http://', 'ws://');
        const url = `${realtimeEndpoint}/realtime?${queryParams}`;

        if (this.socket) {
            this.reconnect = false;
            if (this.socket.readyState < WebSocket.CLOSING) {
                await this.closeSocket();
            }
            // Ensure reconnect isn't stuck false if close event was missed.
            this.reconnect = true;
        }

        return new Promise((resolve, reject) => {
            try {
                const connectionId = ++this.connectionId;
                const socket = (this.socket = new WebSocket(url));

                socket.addEventListener('open', () => {
                    if (connectionId !== this.connectionId) {
                        return;
                    }
                    this.reconnectAttempts = 0;
                    this.onOpenCallbacks.forEach(callback => callback());
                    this.startHeartbeat();
                    resolve();
                });

                socket.addEventListener('message', (event: MessageEvent) => {
                    if (connectionId !== this.connectionId) {
                        return;
                    }
                    try {
                        const message = JSON.parse(event.data) as RealtimeResponse;
                        this.handleMessage(message);
                    } catch (error) {
                        console.error('Failed to parse message:', error);
                    }
                });

                socket.addEventListener('close', async (event: CloseEvent) => {
                    if (connectionId !== this.connectionId || socket !== this.socket) {
                        return;
                    }
                    this.stopHeartbeat();
                    this.onCloseCallbacks.forEach(callback => callback());

                    if (!this.reconnect || event.code === RealtimeCode.POLICY_VIOLATION) {
                        this.reconnect = true;
                        return;
                    }

                    const timeout = this.getTimeout();
                    console.log(`Realtime disconnected. Re-connecting in ${timeout / 1000} seconds.`);

                    await this.sleep(timeout);
                    this.reconnectAttempts++;

                    try {
                        await this.createSocket();
                    } catch (error) {
                        console.error('Failed to reconnect:', error);
                    }
                });

                socket.addEventListener('error', (event: Event) => {
                    if (connectionId !== this.connectionId || socket !== this.socket) {
                        return;
                    }
                    this.stopHeartbeat();
                    const error = new Error('WebSocket error');
                    console.error('WebSocket error:', error.message);
                    this.onErrorCallbacks.forEach(callback => callback(error));
                    reject(error);
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    private async closeSocket(): Promise<void> {
        this.stopHeartbeat();

        if (this.socket) {
            return new Promise((resolve) => {
                if (!this.socket) {
                    resolve();
                    return;
                }

                if (this.socket.readyState === WebSocket.OPEN ||
                    this.socket.readyState === WebSocket.CONNECTING) {
                    this.socket.addEventListener('close', () => {
                        resolve();
                    }, { once: true });
                    this.socket.close(RealtimeCode.NORMAL_CLOSURE);
                } else {
                    resolve();
                }
            });
        }
    }

    private getTimeout(): number {
        if (this.reconnectAttempts < 5) {
            return 1000;
        } else if (this.reconnectAttempts < 15) {
            return 5000;
        } else if (this.reconnectAttempts < 100) {
            return 10000;
        } else {
            return 60000;
        }
    }

    private sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    private getKnownSubscriptionId(slot: number): string | undefined {
        return this.slotToSubscriptionId.get(slot);
    }

    private sendSubscribeMessage(): void {
        if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
            return;
        }

        const rows: RealtimeRequestSubscribeRow[] = [];
        this.pendingSubscribeSlots = [];

        for (const [slot, subscription] of this.activeSubscriptions) {
            const queries = subscription.queries ?? [];

            const row: RealtimeRequestSubscribeRow = {
                channels: Array.from(subscription.channels),
                queries
            };
            const knownSubscriptionId = this.getKnownSubscriptionId(slot);
            if (knownSubscriptionId) {
                row.subscriptionId = knownSubscriptionId;
            }

            rows.push(row);
            this.pendingSubscribeSlots.push(slot);
        }

        if (rows.length < 1) {
            return;
        }

        this.socket.send(JSON.stringify(<RealtimeRequest>{
            type: 'subscribe',
            data: rows
        }));
    }

    /**
     * Convert a channel value to a string
     *
     * @private
     * @param {string | Channel<any> | ActionableChannel | ResolvedChannel} channel - Channel value (string or Channel builder instance)
     * @returns {string} Channel string representation
     */
    private channelToString(channel: string | Channel<any> | ActionableChannel | ResolvedChannel): string {
        if (typeof channel === 'string') {
            return channel;
        }
        // All Channel instances have toString() method
        if (channel && typeof (channel as Channel<any>).toString === 'function') {
            return (channel as Channel<any>).toString();
        }
        return String(channel);
    }

    /**
     * Subscribe to a single channel
     *
     * @param {string | Channel<any> | ActionableChannel | ResolvedChannel} channel - Channel name to subscribe to (string or Channel builder instance)
     * @param {Function} callback - Callback function to handle events
     * @returns {Promise<RealtimeSubscription>} Subscription object with close method
     */
    public async subscribe(
        channel: string | Channel<any> | ActionableChannel | ResolvedChannel,
        callback: (event: RealtimeResponseEvent<any>) => void,
        queries?: (string | Query)[]
    ): Promise<RealtimeSubscription>;

    /**
     * Subscribe to multiple channels
     *
     * @param {(string | Channel<any> | ActionableChannel | ResolvedChannel)[]} channels - Array of channel names to subscribe to (strings or Channel builder instances)
     * @param {Function} callback - Callback function to handle events
     * @returns {Promise<RealtimeSubscription>} Subscription object with close method
     */
    public async subscribe(
        channels: (string | Channel<any> | ActionableChannel | ResolvedChannel)[],
        callback: (event: RealtimeResponseEvent<any>) => void,
        queries?: (string | Query)[]
    ): Promise<RealtimeSubscription>;

    /**
     * Subscribe to a single channel with typed payload
     *
     * @param {string | Channel<any> | ActionableChannel | ResolvedChannel} channel - Channel name to subscribe to (string or Channel builder instance)
     * @param {Function} callback - Callback function to handle events with typed payload
     * @returns {Promise<RealtimeSubscription>} Subscription object with close method
     */
    public async subscribe<T>(
        channel: string | Channel<any> | ActionableChannel | ResolvedChannel,
        callback: (event: RealtimeResponseEvent<T>) => void,
        queries?: (string | Query)[]
    ): Promise<RealtimeSubscription>;

    /**
     * Subscribe to multiple channels with typed payload
     *
     * @param {(string | Channel<any> | ActionableChannel | ResolvedChannel)[]} channels - Array of channel names to subscribe to (strings or Channel builder instances)
     * @param {Function} callback - Callback function to handle events with typed payload
     * @returns {Promise<RealtimeSubscription>} Subscription object with close method
     */
    public async subscribe<T>(
        channels: (string | Channel<any> | ActionableChannel | ResolvedChannel)[],
        callback: (event: RealtimeResponseEvent<T>) => void,
        queries?: (string | Query)[]
    ): Promise<RealtimeSubscription>;

    public async subscribe<T = any>(
        channelsOrChannel: string | Channel<any> | ActionableChannel | ResolvedChannel | (string | Channel<any> | ActionableChannel | ResolvedChannel)[],
        callback: (event: RealtimeResponseEvent<T>) => void,
        queries: (string | Query)[] = []
    ): Promise<RealtimeSubscription> {
        const channelArray = Array.isArray(channelsOrChannel)
            ? channelsOrChannel
            : [channelsOrChannel];
        
        // Convert all channels to strings
        const channelStrings = channelArray.map(ch => this.channelToString(ch));
        const channels = new Set(channelStrings);

        // Convert queries to array of strings
        // Ensure each query is a separate string in the array
        const queryStrings: string[] = [];
        for (const q of (queries ?? [])) {
            if (Array.isArray(q)) {
                // Handle nested arrays: [[q1, q2]] -> [q1, q2]
                for (const inner of q) {
                    queryStrings.push(typeof inner === 'string' ? inner : inner.toString());
                }
            } else {
                queryStrings.push(typeof q === 'string' ? q : q.toString());
            }
        }

        // Allocate a new slot index
        this.subscriptionsCounter++;
        const slot = this.subscriptionsCounter;

        // Store slot-centric data: channels, queries, and callback belong to the slot
        // queries is stored as string[] (array of query strings)
        // No channel mutation occurs here - channels are derived from slots in createSocket()
        this.activeSubscriptions.set(slot, {
            channels,
            queries: queryStrings,
            callback
        });

        this.subCallDepth++;

        await this.sleep(this.DEBOUNCE_MS);

        if (this.subCallDepth === 1) {
            if (!this.socket || this.socket.readyState > WebSocket.OPEN) {
                await this.createSocket();
            } else if (this.socket.readyState === WebSocket.OPEN) {
                this.sendSubscribeMessage();
            }
        }

        this.subCallDepth--;

        return {
            close: async () => {
                const subscriptionId = this.slotToSubscriptionId.get(slot);
                this.activeSubscriptions.delete(slot);
                this.slotToSubscriptionId.delete(slot);
                if (subscriptionId) {
                    this.subscriptionIdToSlot.delete(subscriptionId);
                }
                if (this.activeSubscriptions.size === 0) {
                    this.reconnect = false;
                    await this.closeSocket();
                    return;
                }

                if (!this.socket || this.socket.readyState > WebSocket.OPEN) {
                    await this.createSocket();
                } else if (this.socket.readyState === WebSocket.OPEN) {
                    this.sendSubscribeMessage();
                }
            }
        };
    }

    // cleanUp is no longer needed - slots are removed directly in subscribe().close()
    // Channels are automatically rebuilt from remaining slots in createSocket()

    private handleMessage(message: RealtimeResponse): void {
        if (!message.type) {
            return;
        }

        switch (message.type) {
            case this.TYPE_CONNECTED:
                this.handleResponseConnected(message);
                break;
            case this.TYPE_ERROR:
                this.handleResponseError(message);
                break;
            case this.TYPE_EVENT:
                this.handleResponseEvent(message);
                break;
            case this.TYPE_PONG:
                // Handle pong response if needed
                break;
            case this.TYPE_RESPONSE:
                this.handleResponseAction(message);
                break;
        }
    }

    private handleResponseConnected(message: RealtimeResponse): void {
        if (!message.data) {
            return;
        }

        const messageData = message.data as RealtimeResponseConnected;

        // Store subscription ID mappings from backend.
        // Use direct slot first; if URL mapping is zero-based, try slot+1.
        if (messageData.subscriptions) {
            for (const [slotStr, subscriptionId] of Object.entries(messageData.subscriptions)) {
                const slot = Number(slotStr);
                if (isNaN(slot)) {
                    continue;
                }

                const directSlotExists = this.activeSubscriptions.has(slot);
                const shiftedSlot = slot + 1;
                const shiftedSlotExists = this.activeSubscriptions.has(shiftedSlot);
                const targetSlot = directSlotExists ? slot : shiftedSlotExists ? shiftedSlot : slot;

                if (typeof subscriptionId === 'string') {
                    this.slotToSubscriptionId.set(targetSlot, subscriptionId);
                    this.subscriptionIdToSlot.set(subscriptionId, targetSlot);
                }
            }
        }

        let session = this.client.config.session;
        if (!session) {
            try {
                const cookie = JSON.parse(window.localStorage.getItem('cookieFallback') ?? '{}');
                session = cookie?.[`a_session_${this.client.config.project}`];
            } catch (error) {
                console.error('Failed to parse cookie fallback:', error);
            }
        }

        if (session && !messageData.user) {
            this.socket?.send(JSON.stringify(<RealtimeRequest>{
                type: 'authentication',
                data: {
                    session
                }
            }));
        }

        this.sendSubscribeMessage();
    }

    private handleResponseError(message: RealtimeResponse): void {
        const error = new AppwriteException(
            message.data?.message || 'Unknown error'
        );
        const statusCode = message.data?.code;
        this.onErrorCallbacks.forEach(callback => callback(error, statusCode));
    }

    private handleResponseEvent(message: RealtimeResponse): void {
        const data = message.data;
        if (!data) {
            return;
        }

        const channels = data.channels as string[];
        const events = data.events as string[];
        const payload = data.payload;
        const timestamp = data.timestamp as string;
        const subscriptions = data.subscriptions as string[] | undefined;

        if (!channels || !events || !payload || !subscriptions || subscriptions.length === 0) {
            return;
        }

        // Iterate over all matching subscriptionIds and call callback for each
        for (const subscriptionId of subscriptions) {
            // O(1) lookup using subscriptionId
            const slot = this.subscriptionIdToSlot.get(subscriptionId);
            if (slot !== undefined) {
                const subscription = this.activeSubscriptions.get(slot);
                if (subscription) {
                    const response: RealtimeResponseEvent<any> = {
                        events,
                        channels,
                        timestamp,
                        payload,
                        subscriptions
                    };
                    subscription.callback(response);
                }
            }
        }
    }

    private handleResponseAction(message: RealtimeResponse): void {
        const data = message.data as RealtimeResponseAction | undefined;
        if (!data || data.to !== 'subscribe' || !Array.isArray(data.subscriptions)) {
            return;
        }

        for (let i = 0; i < data.subscriptions.length; i++) {
            const subscription = data.subscriptions[i];
            const subscriptionId = subscription?.subscriptionId;
            const slot = this.pendingSubscribeSlots[i];
            if (slot === undefined || !subscriptionId) {
                continue;
            }

            this.slotToSubscriptionId.set(slot, subscriptionId);
            this.subscriptionIdToSlot.set(subscriptionId, slot);
        }
    }
}
