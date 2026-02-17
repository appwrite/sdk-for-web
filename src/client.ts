import { Models } from './models';
import { Channel, ActionableChannel, ResolvedChannel } from './channel';
import { Query } from './query';
import JSONbigModule from 'json-bigint';
const JSONbigParser = JSONbigModule({ storeAsString: false });
const JSONbigSerializer = JSONbigModule({ useNativeBigInt: true });

const MAX_SAFE = BigInt(Number.MAX_SAFE_INTEGER);
const MIN_SAFE = BigInt(Number.MIN_SAFE_INTEGER);

function isBigNumber(value: any): boolean {
    return value !== null
        && typeof value === 'object'
        && value._isBigNumber === true
        && typeof value.isInteger === 'function'
        && typeof value.toFixed === 'function'
        && typeof value.toNumber === 'function';
}

function reviver(_key: string, value: any): any {
    if (isBigNumber(value)) {
        if (value.isInteger()) {
            const str = value.toFixed();
            const bi = BigInt(str);
            if (bi >= MIN_SAFE && bi <= MAX_SAFE) {
                return Number(str);
            }
            return bi;
        }
        return value.toNumber();
    }
    return value;
}

const JSONbig = {
    parse: (text: string) => JSONbigParser.parse(text, reviver),
    stringify: JSONbigSerializer.stringify
};

/**
 * Payload type representing a key-value pair with string keys and any values.
 */
type Payload = {
    [key: string]: any;
}

/**
 * Headers type representing a key-value pair with string keys and string values.
 */
type Headers = {
    [key: string]: string;
}

/**
 * Realtime response structure with different types.
 */
type RealtimeResponse = {
    /**
     * Type of the response: 'error', 'event', 'connected', 'response' or 'pong'.
     */
    type: 'error' | 'event' | 'connected' | 'response' | 'pong';

    /**
     * Data associated with the response based on the response type.
     */
    data: RealtimeResponseAuthenticated | RealtimeResponseConnected | RealtimeResponseError | RealtimeResponseEvent<unknown> | undefined;
}

/**
 * Realtime request structure for authentication.
 */
type RealtimeRequest = {
    /**
     * Type of the request: 'authentication'.
     */
    type: 'authentication';

    /**
     * Data required for authentication.
     */
    data: RealtimeRequestAuthenticate;
}

/**
 * Realtime event response structure with generic payload type.
 */
type RealtimeResponseEvent<T extends unknown> = {
    /**
     * List of event names associated with the response.
     */
    events: string[];

    /**
     * List of channel names associated with the response.
     */
    channels: string[];

    /**
     * Timestamp indicating the time of the event.
     */
    timestamp: string;

    /**
     * Payload containing event-specific data.
     */
    payload: T;

    /**
     * Subscription IDs this event matches (from backend, optional).
     */
    subscriptions?: string[];
}

/**
 * Realtime response structure for errors.
 */
type RealtimeResponseError = {
    /**
     * Numeric error code indicating the type of error.
     */
    code: number;

    /**
     * Error message describing the encountered error.
     */
    message: string;
}

/**
 * Realtime response structure for a successful connection.
 */
type RealtimeResponseConnected = {
    /**
     * List of channels the user is connected to.
     */
    channels: string[];

    /**
     * User object representing the connected user (optional).
     */
    user?: object;

    /**
     * Map slot index -> subscription ID from backend (optional).
     */
    subscriptions?: Record<string, string>;
}

/**
 * Realtime response structure for authenticated connections.
 */
type RealtimeResponseAuthenticated = {
    /**
     * Destination channel for the response.
     */
    to: string;

    /**
     * Boolean indicating the success of the authentication process.
     */
    success: boolean;

    /**
     * User object representing the authenticated user.
     */
    user: object;
}

/**
 * Realtime request structure for authentication.
 */
type RealtimeRequestAuthenticate = {
    /**
     * Session identifier for authentication.
     */
    session: string;
}

type TimeoutHandle = ReturnType<typeof setTimeout> | number;

/**
 * Realtime interface representing the structure of a realtime communication object.
 */
type Realtime = {
    /**
     * WebSocket instance for realtime communication.
     */
    socket?: WebSocket;

    /**
     * Timeout for reconnect operations.
     */
    timeout?: TimeoutHandle;

    /**
     * Heartbeat interval for the realtime connection.
    */
    heartbeat?: TimeoutHandle;

    /**
     * URL for establishing the WebSocket connection.
     */
    url?: string;

    /**
     * Last received message from the realtime server.
     */
    lastMessage?: RealtimeResponse;

    /**
     * Set of channel names the client is subscribed to.
     */
    channels: Set<string>;

    /**
     * Set of query strings the client is subscribed to.
     */
    queries: Set<string>;

    /**
     * Map of subscriptions containing channel names and corresponding callback functions.
     */
    subscriptions: Map<number, {
        channels: string[];
        queries: string[];
        callback: (payload: RealtimeResponseEvent<any>) => void
    }>;

    /**
     * Map slot index -> subscription ID (from backend, set on 'connected').
     */
    slotToSubscriptionId: Map<number, string>;

    /**
     * Map subscription ID -> slot index (for O(1) event dispatch).
     */
    subscriptionIdToSlot: Map<string, number>;

    /**
     * Counter for managing subscriptions.
     */
    subscriptionsCounter: number;

    /**
     * Boolean indicating whether automatic reconnection is enabled.
     */
    reconnect: boolean;

    /**
     * Number of reconnection attempts made.
     */
    reconnectAttempts: number;

    /**
     * Function to get the timeout duration for communication operations.
     */
    getTimeout: () => number;

    /**
     * Function to establish a WebSocket connection.
     */
    connect: () => void;

    /**
     * Function to create a new WebSocket instance.
     */
    createSocket: () => void;

    /**
     * Function to create a new heartbeat interval.
     */
    createHeartbeat: () => void;

    /**
     * Function to clean up resources associated with specified channels.
     *
     * @param {string[]} channels - List of channel names to clean up.
     */
    cleanUp: (channels: string[], queries: string[]) => void;

    /**
     * Function to handle incoming messages from the WebSocket connection.
     *
     * @param {MessageEvent} event - Event containing the received message.
     */
    onMessage: (event: MessageEvent) => void;
}

/**
 * Type representing upload progress information.
 */
type UploadProgress = {
    /**
     * Identifier for the upload progress.
     */
    $id: string;

    /**
     * Current progress of the upload (in percentage).
     */
    progress: number;

    /**
     * Total size uploaded (in bytes) during the upload process.
     */
    sizeUploaded: number;

    /**
     * Total number of chunks that need to be uploaded.
     */
    chunksTotal: number;

    /**
     * Number of chunks that have been successfully uploaded.
     */
    chunksUploaded: number;
}

/**
 * Exception thrown by the  package
 */
class AppwriteException extends Error {
    /**
     * The error code associated with the exception.
     */
    code: number;

    /**
     * The response string associated with the exception.
     */
    response: string;

    /**
     * Error type.
     * See [Error Types](https://appwrite.io/docs/response-codes#errorTypes) for more information.
     */
    type: string;

    /**
     * Initializes a Appwrite Exception.
     *
     * @param {string} message - The error message.
     * @param {number} code - The error code. Default is 0.
     * @param {string} type - The error type. Default is an empty string.
     * @param {string} response - The response string. Default is an empty string.
     */
    constructor(message: string, code: number = 0, type: string = '', response: string = '') {
        super(message);
        this.name = 'AppwriteException';
        this.message = message;
        this.code = code;
        this.type = type;
        this.response = response;
    }
}

/**
 * Client that handles requests to Appwrite
 */
class Client {
    static CHUNK_SIZE = 1024 * 1024 * 5;

    /**
     * Holds configuration such as project.
     */
    config: {
        endpoint: string;
        endpointRealtime: string;
        project: string;
        jwt: string;
        locale: string;
        session: string;
        devkey: string;
    } = {
        endpoint: 'https://cloud.appwrite.io/v1',
        endpointRealtime: '',
        project: '',
        jwt: '',
        locale: '',
        session: '',
        devkey: '',
    };
    /**
     * Custom headers for API requests.
     */
    headers: Headers = {
        'x-sdk-name': 'Web',
        'x-sdk-platform': 'client',
        'x-sdk-language': 'web',
        'x-sdk-version': '22.3.1',
        'X-Appwrite-Response-Format': '1.8.0',
    };

    /**
     * Set Endpoint
     *
     * Your project endpoint
     *
     * @param {string} endpoint
     *
     * @returns {this}
     */
    setEndpoint(endpoint: string): this {
        if (!endpoint || typeof endpoint !== 'string') {
            throw new AppwriteException('Endpoint must be a valid string');
        }

        if (!endpoint.startsWith('http://') && !endpoint.startsWith('https://')) {
            throw new AppwriteException('Invalid endpoint URL: ' + endpoint);
        }

        this.config.endpoint = endpoint;
        this.config.endpointRealtime = endpoint.replace('https://', 'wss://').replace('http://', 'ws://');

        return this;
    }

    /**
     * Set Realtime Endpoint
     *
     * @param {string} endpointRealtime
     *
     * @returns {this}
     */
    setEndpointRealtime(endpointRealtime: string): this {
        if (!endpointRealtime || typeof endpointRealtime !== 'string') {
            throw new AppwriteException('Endpoint must be a valid string');
        }

        if (!endpointRealtime.startsWith('ws://') && !endpointRealtime.startsWith('wss://')) {
            throw new AppwriteException('Invalid realtime endpoint URL: ' + endpointRealtime);
        }

        this.config.endpointRealtime = endpointRealtime;
        return this;
    }

    /**
     * Set Project
     *
     * Your project ID
     *
     * @param value string
     *
     * @return {this}
     */
    setProject(value: string): this {
        this.headers['X-Appwrite-Project'] = value;
        this.config.project = value;
        return this;
    }
    /**
     * Set JWT
     *
     * Your secret JSON Web Token
     *
     * @param value string
     *
     * @return {this}
     */
    setJWT(value: string): this {
        this.headers['X-Appwrite-JWT'] = value;
        this.config.jwt = value;
        return this;
    }
    /**
     * Set Locale
     *
     * @param value string
     *
     * @return {this}
     */
    setLocale(value: string): this {
        this.headers['X-Appwrite-Locale'] = value;
        this.config.locale = value;
        return this;
    }
    /**
     * Set Session
     *
     * The user session to authenticate with
     *
     * @param value string
     *
     * @return {this}
     */
    setSession(value: string): this {
        this.headers['X-Appwrite-Session'] = value;
        this.config.session = value;
        return this;
    }
    /**
     * Set DevKey
     *
     * Your secret dev API key
     *
     * @param value string
     *
     * @return {this}
     */
    setDevKey(value: string): this {
        this.headers['X-Appwrite-Dev-Key'] = value;
        this.config.devkey = value;
        return this;
    }

    private realtime: Realtime = {
        socket: undefined,
        timeout: undefined,
        heartbeat: undefined,
        url: '',
        channels: new Set(),
        queries: new Set(),
        subscriptions: new Map(),
        slotToSubscriptionId: new Map(),
        subscriptionIdToSlot: new Map(),
        subscriptionsCounter: 0,
        reconnect: true,
        reconnectAttempts: 0,
        lastMessage: undefined,
        connect: () => {
            clearTimeout(this.realtime.timeout);
            this.realtime.timeout = window?.setTimeout(() => {
                this.realtime.createSocket();
            }, 50);
        },
        getTimeout: () => {
            switch (true) {
                case this.realtime.reconnectAttempts < 5:
                    return 1000;
                case this.realtime.reconnectAttempts < 15:
                    return 5000;
                case this.realtime.reconnectAttempts < 100:
                    return 10_000;
                default:
                    return 60_000;
            }
        },
        createHeartbeat: () => {
            if (this.realtime.heartbeat) {
                clearTimeout(this.realtime.heartbeat);
            }

            this.realtime.heartbeat = window?.setInterval(() => {
                this.realtime.socket?.send(JSONbig.stringify({
                    type: 'ping'
                }));
            }, 20_000);
        },
        createSocket: () => {
            if (this.realtime.subscriptions.size < 1) {
                this.realtime.reconnect = false;
                this.realtime.socket?.close();
                return;
            }

            const encodedProject = encodeURIComponent((this.config.project as string) ?? '');
            let queryParams = 'project=' + encodedProject;

            this.realtime.channels.forEach(channel => {
                queryParams += '&channels[]=' + encodeURIComponent(channel);
            });

            // Per-subscription queries: channel[slot][]=query so server can route events by subscription
            const selectAllQuery = Query.select(['*']).toString();
            this.realtime.subscriptions.forEach((sub, slot) => {
                const queries = sub.queries.length > 0 ? sub.queries : [selectAllQuery];
                sub.channels.forEach(channel => {
                    queries.forEach(query => {
                        queryParams += '&' + encodeURIComponent(channel) + '[' + slot + '][]=' + encodeURIComponent(query);
                    });
                });
            });

            const url = this.config.endpointRealtime + '/realtime?' + queryParams;

            if (
                url !== this.realtime.url || // Check if URL is present
                !this.realtime.socket || // Check if WebSocket has not been created
                this.realtime.socket?.readyState > WebSocket.OPEN // Check if WebSocket is CLOSING (3) or CLOSED (4)
            ) {
                if (
                    this.realtime.socket &&
                    this.realtime.socket?.readyState < WebSocket.CLOSING // Close WebSocket if it is CONNECTING (0) or OPEN (1)
                ) {
                    this.realtime.reconnect = false;
                    this.realtime.socket.close();
                }

                this.realtime.url = url;
                this.realtime.socket = new WebSocket(url);
                this.realtime.socket.addEventListener('message', this.realtime.onMessage);
                this.realtime.socket.addEventListener('open', _event => {
                    this.realtime.reconnectAttempts = 0;
                    this.realtime.createHeartbeat();
                });
                this.realtime.socket.addEventListener('close', event => {
                    if (
                        !this.realtime.reconnect ||
                        (
                            this.realtime?.lastMessage?.type === 'error' && // Check if last message was of type error
                            (<RealtimeResponseError>this.realtime?.lastMessage.data).code === 1008 // Check for policy violation 1008
                        )
                    ) {
                        this.realtime.reconnect = true;
                        return;
                    }

                    const timeout = this.realtime.getTimeout();
                    console.error(`Realtime got disconnected. Reconnect will be attempted in ${timeout / 1000} seconds.`, event.reason);

                    setTimeout(() => {
                        this.realtime.reconnectAttempts++;
                        this.realtime.createSocket();
                    }, timeout);
                })
            }
        },
        onMessage: (event) => {
            try {
                const message: RealtimeResponse = JSONbig.parse(event.data);
                this.realtime.lastMessage = message;
                switch (message.type) {
                    case 'connected': {
                        const messageData = <RealtimeResponseConnected>message.data;
                        if (messageData?.subscriptions) {
                            this.realtime.slotToSubscriptionId.clear();
                            this.realtime.subscriptionIdToSlot.clear();
                            for (const [slotStr, subscriptionId] of Object.entries(messageData.subscriptions)) {
                                const slot = Number(slotStr);
                                if (!isNaN(slot) && typeof subscriptionId === 'string') {
                                    this.realtime.slotToSubscriptionId.set(slot, subscriptionId);
                                    this.realtime.subscriptionIdToSlot.set(subscriptionId, slot);
                                }
                            }
                        }

                        let session = this.config.session;
                        if (!session) {
                            const cookie = JSONbig.parse(window.localStorage.getItem('cookieFallback') ?? '{}');
                            session = cookie?.[`a_session_${this.config.project}`];
                        }
                        if (session && !messageData?.user) {
                            this.realtime.socket?.send(JSONbig.stringify(<RealtimeRequest>{
                                type: 'authentication',
                                data: {
                                    session
                                }
                            }));
                        }
                        break;
                    }
                    case 'event': {
                        const data = <RealtimeResponseEvent<unknown>>message.data;
                        if (!data?.channels) break;

                        const eventSubIds = data.subscriptions;
                        if (eventSubIds && eventSubIds.length > 0) {
                            for (const subscriptionId of eventSubIds) {
                                const slot = this.realtime.subscriptionIdToSlot.get(subscriptionId);
                                if (slot !== undefined) {
                                    const subscription = this.realtime.subscriptions.get(slot);
                                    if (subscription) {
                                        setTimeout(() => subscription.callback(data));
                                    }
                                }
                            }
                        } else {
                            const isSubscribed = data.channels.some(channel => this.realtime.channels.has(channel));
                            if (!isSubscribed) break;
                            this.realtime.subscriptions.forEach(subscription => {
                                if (data.channels.some(channel => subscription.channels.includes(channel))) {
                                    setTimeout(() => subscription.callback(data));
                                }
                            });
                        }
                        break;
                    }
                    case 'pong':
                        break; // Handle pong response if needed
                    case 'error':
                        throw message.data;
                    default:
                        break;
                }
            } catch (e) {
                console.error(e);
            }
        },
        cleanUp: (channels, queries) => {
            this.realtime.channels.forEach(channel => {
                if (channels.includes(channel)) {
                    let found = Array.from(this.realtime.subscriptions).some(([_key, subscription] )=> {
                        return subscription.channels.includes(channel);
                    })

                    if (!found) {
                        this.realtime.channels.delete(channel);
                    }
                }
            })

            this.realtime.queries.forEach(query => {
                if (queries.includes(query)) {
                    let found = Array.from(this.realtime.subscriptions).some(([_key, subscription]) => {
                        return subscription.queries?.includes(query);
                    });

                    if (!found) {
                        this.realtime.queries.delete(query);
                    }
                }
            })
        }
    }

    /**
     * Subscribes to Appwrite events and passes you the payload in realtime.
     *
     * @deprecated Use the Realtime service instead.
     * @see Realtime
     *
     * @param {string|string[]|Channel<any>|ActionableChannel|ResolvedChannel|(Channel<any>|ActionableChannel|ResolvedChannel)[]} channels
     * Channel to subscribe - pass a single channel as a string or Channel builder instance, or multiple with an array.
     *
     * Possible channels are:
     * - account
     * - collections
     * - collections.[ID]
     * - collections.[ID].documents
     * - documents
     * - documents.[ID]
     * - files
     * - files.[ID]
     * - executions
     * - executions.[ID]
     * - functions.[ID]
     * - teams
     * - teams.[ID]
     * - memberships
     * - memberships.[ID]
     * 
     * You can also use Channel builders:
     * - Channel.database('db').collection('col').document('doc').create()
     * - Channel.bucket('bucket').file('file').update()
     * - Channel.function('func').execution('exec').delete()
     * - Channel.team('team').create()
     * - Channel.membership('membership').update()
     * @param {(payload: RealtimeMessage) => void} callback Is called on every realtime update.
     * @returns {() => void} Unsubscribes from events.
     */
    subscribe<T extends unknown>(
        channels: string | string[] | Channel<any> | ActionableChannel | ResolvedChannel | (Channel<any> | ActionableChannel | ResolvedChannel)[],
        callback: (payload: RealtimeResponseEvent<T>) => void,
        queries: (string | Query)[] = []
    ): () => void {
        const channelArray = Array.isArray(channels) ? channels : [channels];
        // Convert Channel instances to strings
        const channelStrings = channelArray.map(ch => {
            if (typeof ch === 'string') {
                return ch;
            }
            // All Channel instances have toString() method
            if (ch && typeof (ch as Channel<any>).toString === 'function') {
                return (ch as Channel<any>).toString();
            }
            // Fallback to generic string conversion
            return String(ch);
        });
        channelStrings.forEach(channel => this.realtime.channels.add(channel));

        const queryStrings = (queries ?? []).map(q => typeof q === 'string' ? q : q.toString());
        queryStrings.forEach(query => this.realtime.queries.add(query));

        const counter = this.realtime.subscriptionsCounter++;
        this.realtime.subscriptions.set(counter, {
            channels: channelStrings,
            queries: queryStrings,
            callback
        });

        this.realtime.connect();

        return () => {
            this.realtime.subscriptions.delete(counter);
            this.realtime.cleanUp(channelStrings, queryStrings);
            this.realtime.connect();
        }
    }

    prepareRequest(method: string, url: URL, headers: Headers = {}, params: Payload = {}): { uri: string, options: RequestInit } {
        method = method.toUpperCase();

        headers = Object.assign({}, this.headers, headers);

        if (typeof window !== 'undefined' && window.localStorage) {
            const cookieFallback = window.localStorage.getItem('cookieFallback');
            if (cookieFallback) {
                headers['X-Fallback-Cookies'] = cookieFallback;
            }
        }

        let options: RequestInit = {
            method,
            headers,
        };

        if (headers['X-Appwrite-Dev-Key'] === undefined) {
            options.credentials = 'include';
        }

        if (method === 'GET') {
            for (const [key, value] of Object.entries(Client.flatten(params))) {
                url.searchParams.append(key, value);
            }
        } else {
            switch (headers['content-type']) {
                case 'application/json':
                    options.body = JSONbig.stringify(params);
                    break;

                case 'multipart/form-data':
                    const formData = new FormData();

                    for (const [key, value] of Object.entries(params)) {
                        if (value instanceof File) {
                            formData.append(key, value, value.name);
                        } else if (Array.isArray(value)) {
                            for (const nestedValue of value) {
                                formData.append(`${key}[]`, nestedValue);
                            }
                        } else {
                            formData.append(key, value);
                        }
                    }

                    options.body = formData;
                    delete headers['content-type'];
                    break;
            }
        }

        return { uri: url.toString(), options };
    }

    async chunkedUpload(method: string, url: URL, headers: Headers = {}, originalPayload: Payload = {}, onProgress: (progress: UploadProgress) => void) {
        const [fileParam, file] = Object.entries(originalPayload).find(([_, value]) => value instanceof File) ?? [];

        if (!file || !fileParam) {
            throw new Error('File not found in payload');
        }

        if (file.size <= Client.CHUNK_SIZE) {
            return await this.call(method, url, headers, originalPayload);
        }

        let start = 0;
        let response = null;

        while (start < file.size) {
            let end = start + Client.CHUNK_SIZE; // Prepare end for the next chunk
            if (end >= file.size) {
                end = file.size; // Adjust for the last chunk to include the last byte
            }

            headers['content-range'] = `bytes ${start}-${end-1}/${file.size}`;
            const chunk = file.slice(start, end);

            let payload = { ...originalPayload };
            payload[fileParam] = new File([chunk], file.name);

            response = await this.call(method, url, headers, payload);

            if (onProgress && typeof onProgress === 'function') {
                onProgress({
                    $id: response.$id,
                    progress: Math.round((end / file.size) * 100),
                    sizeUploaded: end,
                    chunksTotal: Math.ceil(file.size / Client.CHUNK_SIZE),
                    chunksUploaded: Math.ceil(end / Client.CHUNK_SIZE)
                });
            }

            if (response && response.$id) {
                headers['x-appwrite-id'] = response.$id;
            }

            start = end;
        }

        return response;
    }

    async ping(): Promise<string> {
        return this.call('GET', new URL(this.config.endpoint + '/ping'));
    }

    async call(method: string, url: URL, headers: Headers = {}, params: Payload = {}, responseType = 'json'): Promise<any> {
        const { uri, options } = this.prepareRequest(method, url, headers, params);

        let data: any = null;

        const response = await fetch(uri, options);

        // type opaque: No-CORS, different-origin response (CORS-issue)
        if (response.type === 'opaque') {
            throw new AppwriteException(
                `Invalid Origin. Register your new client (${window.location.host}) as a new Web platform on your project console dashboard`,
                403,
                "forbidden",
                ""
            );
        }

        const warnings = response.headers.get('x-appwrite-warning');
        if (warnings) {
            warnings.split(';').forEach((warning: string) => console.warn('Warning: ' + warning));
        }

        if (response.headers.get('content-type')?.includes('application/json')) {
            data = JSONbig.parse(await response.text());
        } else if (responseType === 'arrayBuffer') {
            data = await response.arrayBuffer();
        } else {
            data = {
                message: await response.text()
            };
        }

        if (400 <= response.status) {
            let responseText = '';
            if (response.headers.get('content-type')?.includes('application/json') || responseType === 'arrayBuffer') {
                responseText = JSONbig.stringify(data);
            } else {
                responseText = data?.message;
            }
            throw new AppwriteException(data?.message, response.status, data?.type, responseText);
        }

        const cookieFallback = response.headers.get('X-Fallback-Cookies');

        if (typeof window !== 'undefined' && window.localStorage && cookieFallback) {
            window.console.warn('Appwrite is using localStorage for session management. Increase your security by adding a custom domain as your API endpoint.');
            window.localStorage.setItem('cookieFallback', cookieFallback);
        }

        return data;
    }

    static flatten(data: Payload, prefix = ''): Payload {
        let output: Payload = {};

        for (const [key, value] of Object.entries(data)) {
            let finalKey = prefix ? prefix + '[' + key +']' : key;
            if (Array.isArray(value)) {
                output = { ...output, ...Client.flatten(value, finalKey) };
            } else {
                output[finalKey] = value;
            }
        }

        return output;
    }
}

export { Client, AppwriteException };
export { Query } from './query';
export type { Models, Payload, UploadProgress };
export type { RealtimeResponseEvent };
export type { QueryTypes, QueryTypesList } from './query';
