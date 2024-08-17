import { Models } from './models';
import { Service } from './service';

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
     * Type of the response: 'error', 'event', 'connected', or 'response'.
     */
    type: 'error' | 'event' | 'connected' | 'response';

    /**
     * Data associated with the response based on the response type.
     */
    data: RealtimeResponseAuthenticated | RealtimeResponseConnected | RealtimeResponseError | RealtimeResponseEvent<unknown>;
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
export type RealtimeResponseEvent<T extends unknown> = {
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
    timestamp: number;

    /**
     * Payload containing event-specific data.
     */
    payload: T;
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

/**
 * Realtime interface representing the structure of a realtime communication object.
 */
type Realtime = {
    /**
     * WebSocket instance for realtime communication.
     */
    socket?: WebSocket;

    /**
     * Timeout duration for communication operations.
     */
    timeout?: number;

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
     * Map of subscriptions containing channel names and corresponding callback functions.
     */
    subscriptions: Map<number, {
        channels: string[];
        callback: (payload: RealtimeResponseEvent<any>) => void
    }>;

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
     * Function to clean up resources associated with specified channels.
     *
     * @param {string[]} channels - List of channel names to clean up.
     */
    cleanUp: (channels: string[]) => void;

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
export type UploadProgress = {
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
    /**
     * Holds configuration such as project.
     */
    config = {
        endpoint: 'https://cloud.appwrite.io/v1',
        endpointRealtime: '',
        project: '',
        jwt: '',
        locale: '',
        session: '',
    };

    /**
     * Custom headers for API requests.
     */
    headers: Headers = {
        'x-sdk-name': 'Web',
        'x-sdk-platform': 'client',
        'x-sdk-language': 'web',
        'x-sdk-version': '16.0.0-rc.2',
        'X-Appwrite-Response-Format': '1.6.0',
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
        this.config.endpoint = endpoint;
        this.config.endpointRealtime = this.config.endpointRealtime || this.config.endpoint.replace('https://', 'wss://').replace('http://', 'ws://');

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


    private realtime: Realtime = {
        socket: undefined,
        timeout: undefined,
        url: '',
        channels: new Set(),
        subscriptions: new Map(),
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
        createSocket: () => {
            if (this.realtime.channels.size < 1) {
                this.realtime.reconnect = false;
                this.realtime.socket?.close();
                return;
            }

            const channels = new URLSearchParams();
            channels.set('project', this.config.project);
            this.realtime.channels.forEach(channel => {
                channels.append('channels[]', channel);
            });

            const url = this.config.endpointRealtime + '/realtime?' + channels.toString();

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
                const message: RealtimeResponse = JSON.parse(event.data);
                this.realtime.lastMessage = message;
                switch (message.type) {
                    case 'connected':
                        const cookie = JSON.parse(window.localStorage.getItem('cookieFallback') ?? '{}');
                        const session = cookie?.[`a_session_${this.config.project}`];
                        const messageData = <RealtimeResponseConnected>message.data;

                        if (session && !messageData.user) {
                            this.realtime.socket?.send(JSON.stringify(<RealtimeRequest>{
                                type: 'authentication',
                                data: {
                                    session
                                }
                            }));
                        }
                        break;
                    case 'event':
                        let data = <RealtimeResponseEvent<unknown>>message.data;
                        if (data?.channels) {
                            const isSubscribed = data.channels.some(channel => this.realtime.channels.has(channel));
                            if (!isSubscribed) return;
                            this.realtime.subscriptions.forEach(subscription => {
                                if (data.channels.some(channel => subscription.channels.includes(channel))) {
                                    setTimeout(() => subscription.callback(data));
                                }
                            })
                        }
                        break;
                    case 'error':
                        throw message.data;
                    default:
                        break;
                }
            } catch (e) {
                console.error(e);
            }
        },
        cleanUp: channels => {
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
        }
    }

    /**
     * Subscribes to Appwrite events and passes you the payload in realtime.
     * 
     * @param {string|string[]} channels 
     * Channel to subscribe - pass a single channel as a string or multiple with an array of strings.
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
     * @param {(payload: RealtimeMessage) => void} callback Is called on every realtime update.
     * @returns {() => void} Unsubscribes from events.
     */
    subscribe<T extends unknown>(channels: string | string[], callback: (payload: RealtimeResponseEvent<T>) => void): () => void {
        let channelArray = typeof channels === 'string' ? [channels] : channels;
        channelArray.forEach(channel => this.realtime.channels.add(channel));

        const counter = this.realtime.subscriptionsCounter++;
        this.realtime.subscriptions.set(counter, {
            channels: channelArray,
            callback
        });

        this.realtime.connect();

        return () => {
            this.realtime.subscriptions.delete(counter);
            this.realtime.cleanUp(channelArray);
            this.realtime.connect();
        }
    }

    /**
     * Call API endpoint with the specified method, URL, headers, and parameters.
     *
     * @param {string} method - HTTP method (e.g., 'GET', 'POST', 'PUT', 'DELETE').
     * @param {URL} url - The URL of the API endpoint.
     * @param {Headers} headers - Custom headers for the API request.
     * @param {Payload} params - Request parameters.
     * @returns {Promise<any>} - A promise that resolves with the response data.
     * 
     * @typedef {Object} Payload - Request payload data.
     * @property {string} key - The key.
     * @property {string} value - The value.
     */
    async call(method: string, url: URL, headers: Headers = {}, params: Payload = {}): Promise<any> {
        method = method.toUpperCase();


        headers = Object.assign({}, this.headers, headers);

        let options: RequestInit = {
            method,
            headers,
            credentials: 'include'
        };

        if (typeof window !== 'undefined' && window.localStorage) {
            const cookieFallback = window.localStorage.getItem('cookieFallback');
            if (cookieFallback) {
                headers['X-Fallback-Cookies'] = cookieFallback;
            }
        }

        if (method === 'GET') {
            for (const [key, value] of Object.entries(Service.flatten(params))) {
                url.searchParams.append(key, value);
            }
        } else {
            switch (headers['content-type']) {
                case 'application/json':
                    options.body = JSON.stringify(params);
                    break;

                case 'multipart/form-data':
                    let formData = new FormData();

                    for (const key in params) {
                        if (Array.isArray(params[key])) {
                            params[key].forEach((value: any) => {
                                formData.append(key + '[]', value);
                            })
                        } else {
                            formData.append(key, params[key]);
                        }
                    }

                    options.body = formData;
                    delete headers['content-type'];
                    break;
            }
        }

        try {
            let data = null;
            const response = await fetch(url.toString(), options);

            const warnings = response.headers.get('x-appwrite-warning');
            if (warnings) {
                warnings.split(';').forEach((warning: string) => console.warn('Warning: ' + warning));
            }

            if (response.headers.get('content-type')?.includes('application/json')) {
                data = await response.json();
            } else {
                data = {
                    message: await response.text()
                };
            }

            if (400 <= response.status) {
                throw new AppwriteException(data?.message, response.status, data?.type, data);
            }

            const cookieFallback = response.headers.get('X-Fallback-Cookies');

            if (typeof window !== 'undefined' && window.localStorage && cookieFallback) {
                window.console.warn('Appwrite is using localStorage for session management. Increase your security by adding a custom domain as your API endpoint.');
                window.localStorage.setItem('cookieFallback', cookieFallback);
            }

            return data;
        } catch (e) {
            if (e instanceof AppwriteException) {
                throw e;
            }
            throw new AppwriteException((<Error>e).message);
        }
    }
}

export { Client, AppwriteException };
export { Query } from './query';
export type { Models, Payload };
export type { QueryTypes, QueryTypesList } from './query';
