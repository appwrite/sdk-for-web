import 'isomorphic-form-data';
import { fetch } from 'cross-fetch';

namespace Models {
    /**
     * Documents List
     */
    export type DocumentList<Document extends Models.Document> = {
        /**
         * Total number of documents documents that matched your query.
         */
        total: number;
        /**
         * List of documents.
         */
        documents: Document[];
    }
    /**
     * Sessions List
     */
    export type SessionList<> = {
        /**
         * Total number of sessions documents that matched your query.
         */
        total: number;
        /**
         * List of sessions.
         */
        sessions: Session[];
    }
    /**
     * Logs List
     */
    export type LogList<> = {
        /**
         * Total number of logs documents that matched your query.
         */
        total: number;
        /**
         * List of logs.
         */
        logs: Log[];
    }
    /**
     * Files List
     */
    export type FileList<> = {
        /**
         * Total number of files documents that matched your query.
         */
        total: number;
        /**
         * List of files.
         */
        files: File[];
    }
    /**
     * Teams List
     */
    export type TeamList<> = {
        /**
         * Total number of teams documents that matched your query.
         */
        total: number;
        /**
         * List of teams.
         */
        teams: Team[];
    }
    /**
     * Memberships List
     */
    export type MembershipList<> = {
        /**
         * Total number of memberships documents that matched your query.
         */
        total: number;
        /**
         * List of memberships.
         */
        memberships: Membership[];
    }
    /**
     * Executions List
     */
    export type ExecutionList<> = {
        /**
         * Total number of executions documents that matched your query.
         */
        total: number;
        /**
         * List of executions.
         */
        executions: Execution[];
    }
    /**
     * Countries List
     */
    export type CountryList<> = {
        /**
         * Total number of countries documents that matched your query.
         */
        total: number;
        /**
         * List of countries.
         */
        countries: Country[];
    }
    /**
     * Continents List
     */
    export type ContinentList<> = {
        /**
         * Total number of continents documents that matched your query.
         */
        total: number;
        /**
         * List of continents.
         */
        continents: Continent[];
    }
    /**
     * Languages List
     */
    export type LanguageList<> = {
        /**
         * Total number of languages documents that matched your query.
         */
        total: number;
        /**
         * List of languages.
         */
        languages: Language[];
    }
    /**
     * Currencies List
     */
    export type CurrencyList<> = {
        /**
         * Total number of currencies documents that matched your query.
         */
        total: number;
        /**
         * List of currencies.
         */
        currencies: Currency[];
    }
    /**
     * Phones List
     */
    export type PhoneList<> = {
        /**
         * Total number of phones documents that matched your query.
         */
        total: number;
        /**
         * List of phones.
         */
        phones: Phone[];
    }
    /**
     * Document
     */
    export type Document<> = {
        /**
         * Document ID.
         */
        $id: string;
        /**
         * Collection ID.
         */
        $collection: string;
        /**
         * Document read permissions.
         */
        $read: string[];
        /**
         * Document write permissions.
         */
        $write: string[];
    }
    /**
     * Log
     */
    export type Log<> = {
        /**
         * Event name.
         */
        event: string;
        /**
         * User ID.
         */
        userId: string;
        /**
         * User Email.
         */
        userEmail: string;
        /**
         * User Name.
         */
        userName: string;
        /**
         * API mode when event triggered.
         */
        mode: string;
        /**
         * IP session in use when the session was created.
         */
        ip: string;
        /**
         * Log creation time in Unix timestamp.
         */
        time: number;
        /**
         * Operating system code name. View list of [available options](https://github.com/appwrite/appwrite/blob/master/docs/lists/os.json).
         */
        osCode: string;
        /**
         * Operating system name.
         */
        osName: string;
        /**
         * Operating system version.
         */
        osVersion: string;
        /**
         * Client type.
         */
        clientType: string;
        /**
         * Client code name. View list of [available options](https://github.com/appwrite/appwrite/blob/master/docs/lists/clients.json).
         */
        clientCode: string;
        /**
         * Client name.
         */
        clientName: string;
        /**
         * Client version.
         */
        clientVersion: string;
        /**
         * Client engine name.
         */
        clientEngine: string;
        /**
         * Client engine name.
         */
        clientEngineVersion: string;
        /**
         * Device name.
         */
        deviceName: string;
        /**
         * Device brand name.
         */
        deviceBrand: string;
        /**
         * Device model name.
         */
        deviceModel: string;
        /**
         * Country two-character ISO 3166-1 alpha code.
         */
        countryCode: string;
        /**
         * Country name.
         */
        countryName: string;
    }
    /**
     * User
     */
    export type User<Preferences extends Models.Preferences> = {
        /**
         * User ID.
         */
        $id: string;
        /**
         * User name.
         */
        name: string;
        /**
         * User registration date in Unix timestamp.
         */
        registration: number;
        /**
         * User status. Pass `true` for enabled and `false` for disabled.
         */
        status: boolean;
        /**
         * Unix timestamp of the most recent password update
         */
        passwordUpdate: number;
        /**
         * User email address.
         */
        email: string;
        /**
         * Email verification status.
         */
        emailVerification: boolean;
        /**
         * User preferences as a key-value object
         */
        prefs: Preferences;
    }
    /**
     * Preferences
     */
    export type Preferences<> = {
    }
    /**
     * Session
     */
    export type Session<> = {
        /**
         * Session ID.
         */
        $id: string;
        /**
         * User ID.
         */
        userId: string;
        /**
         * Session expiration date in Unix timestamp.
         */
        expire: number;
        /**
         * Session Provider.
         */
        provider: string;
        /**
         * Session Provider User ID.
         */
        providerUid: string;
        /**
         * Session Provider Access Token.
         */
        providerAccessToken: string;
        /**
         * Date, the Unix timestamp of when the access token expires.
         */
        providerAccessTokenExpiry: number;
        /**
         * Session Provider Refresh Token.
         */
        providerRefreshToken: string;
        /**
         * IP in use when the session was created.
         */
        ip: string;
        /**
         * Operating system code name. View list of [available options](https://github.com/appwrite/appwrite/blob/master/docs/lists/os.json).
         */
        osCode: string;
        /**
         * Operating system name.
         */
        osName: string;
        /**
         * Operating system version.
         */
        osVersion: string;
        /**
         * Client type.
         */
        clientType: string;
        /**
         * Client code name. View list of [available options](https://github.com/appwrite/appwrite/blob/master/docs/lists/clients.json).
         */
        clientCode: string;
        /**
         * Client name.
         */
        clientName: string;
        /**
         * Client version.
         */
        clientVersion: string;
        /**
         * Client engine name.
         */
        clientEngine: string;
        /**
         * Client engine name.
         */
        clientEngineVersion: string;
        /**
         * Device name.
         */
        deviceName: string;
        /**
         * Device brand name.
         */
        deviceBrand: string;
        /**
         * Device model name.
         */
        deviceModel: string;
        /**
         * Country two-character ISO 3166-1 alpha code.
         */
        countryCode: string;
        /**
         * Country name.
         */
        countryName: string;
        /**
         * Returns true if this the current user session.
         */
        current: boolean;
    }
    /**
     * Token
     */
    export type Token<> = {
        /**
         * Token ID.
         */
        $id: string;
        /**
         * User ID.
         */
        userId: string;
        /**
         * Token secret key. This will return an empty string unless the response is returned using an API key or as part of a webhook payload.
         */
        secret: string;
        /**
         * Token expiration date in Unix timestamp.
         */
        expire: number;
    }
    /**
     * JWT
     */
    export type Jwt<> = {
        /**
         * JWT encoded string.
         */
        jwt: string;
    }
    /**
     * Locale
     */
    export type Locale<> = {
        /**
         * User IP address.
         */
        ip: string;
        /**
         * Country code in [ISO 3166-1](http://en.wikipedia.org/wiki/ISO_3166-1) two-character format
         */
        countryCode: string;
        /**
         * Country name. This field support localization.
         */
        country: string;
        /**
         * Continent code. A two character continent code &quot;AF&quot; for Africa, &quot;AN&quot; for Antarctica, &quot;AS&quot; for Asia, &quot;EU&quot; for Europe, &quot;NA&quot; for North America, &quot;OC&quot; for Oceania, and &quot;SA&quot; for South America.
         */
        continentCode: string;
        /**
         * Continent name. This field support localization.
         */
        continent: string;
        /**
         * True if country is part of the Europian Union.
         */
        eu: boolean;
        /**
         * Currency code in [ISO 4217-1](http://en.wikipedia.org/wiki/ISO_4217) three-character format
         */
        currency: string;
    }
    /**
     * File
     */
    export type File<> = {
        /**
         * File ID.
         */
        $id: string;
        /**
         * Bucket ID.
         */
        bucketId: string;
        /**
         * File read permissions.
         */
        $read: string[];
        /**
         * File write permissions.
         */
        $write: string[];
        /**
         * File name.
         */
        name: string;
        /**
         * File creation date in Unix timestamp.
         */
        dateCreated: number;
        /**
         * File MD5 signature.
         */
        signature: string;
        /**
         * File mime type.
         */
        mimeType: string;
        /**
         * File original size in bytes.
         */
        sizeOriginal: number;
        /**
         * Total number of chunks available
         */
        chunksTotal: number;
        /**
         * Total number of chunks uploaded
         */
        chunksUploaded: number;
    }
    /**
     * Team
     */
    export type Team<> = {
        /**
         * Team ID.
         */
        $id: string;
        /**
         * Team name.
         */
        name: string;
        /**
         * Team creation date in Unix timestamp.
         */
        dateCreated: number;
        /**
         * Total number of team members.
         */
        total: number;
    }
    /**
     * Membership
     */
    export type Membership<> = {
        /**
         * Membership ID.
         */
        $id: string;
        /**
         * User ID.
         */
        userId: string;
        /**
         * Team ID.
         */
        teamId: string;
        /**
         * User name.
         */
        name: string;
        /**
         * User email address.
         */
        email: string;
        /**
         * Date, the user has been invited to join the team in Unix timestamp.
         */
        invited: number;
        /**
         * Date, the user has accepted the invitation to join the team in Unix timestamp.
         */
        joined: number;
        /**
         * User confirmation status, true if the user has joined the team or false otherwise.
         */
        confirm: boolean;
        /**
         * User list of roles
         */
        roles: string[];
    }
    /**
     * Execution
     */
    export type Execution<> = {
        /**
         * Execution ID.
         */
        $id: string;
        /**
         * Execution read permissions.
         */
        $read: string[];
        /**
         * Function ID.
         */
        functionId: string;
        /**
         * The execution creation date in Unix timestamp.
         */
        dateCreated: number;
        /**
         * The trigger that caused the function to execute. Possible values can be: `http`, `schedule`, or `event`.
         */
        trigger: string;
        /**
         * The status of the function execution. Possible values can be: `waiting`, `processing`, `completed`, or `failed`.
         */
        status: string;
        /**
         * The script status code.
         */
        statusCode: number;
        /**
         * The script stdout output string. Logs the last 4,000 characters of the execution stdout output.
         */
        stdout: string;
        /**
         * The script stderr output string. Logs the last 4,000 characters of the execution stderr output
         */
        stderr: string;
        /**
         * The script execution time in seconds.
         */
        time: number;
    }
    /**
     * Country
     */
    export type Country<> = {
        /**
         * Country name.
         */
        name: string;
        /**
         * Country two-character ISO 3166-1 alpha code.
         */
        code: string;
    }
    /**
     * Continent
     */
    export type Continent<> = {
        /**
         * Continent name.
         */
        name: string;
        /**
         * Continent two letter code.
         */
        code: string;
    }
    /**
     * Language
     */
    export type Language<> = {
        /**
         * Language name.
         */
        name: string;
        /**
         * Language two-character ISO 639-1 codes.
         */
        code: string;
        /**
         * Language native name.
         */
        nativeName: string;
    }
    /**
     * Currency
     */
    export type Currency<> = {
        /**
         * Currency symbol.
         */
        symbol: string;
        /**
         * Currency name.
         */
        name: string;
        /**
         * Currency native symbol.
         */
        symbolNative: string;
        /**
         * Number of decimal digits.
         */
        decimalDigits: number;
        /**
         * Currency digit rounding.
         */
        rounding: number;
        /**
         * Currency code in [ISO 4217-1](http://en.wikipedia.org/wiki/ISO_4217) three-character format.
         */
        code: string;
        /**
         * Currency plural name
         */
        namePlural: string;
    }
    /**
     * Phone
     */
    export type Phone<> = {
        /**
         * Phone code.
         */
        code: string;
        /**
         * Country two-character ISO 3166-1 alpha code.
         */
        countryCode: string;
        /**
         * Country name.
         */
        countryName: string;
    }
}

type Payload = {
    [key: string]: any;
}

type Headers = {
    [key: string]: string;
}

type RealtimeResponse = {
    type: 'error'|'event'|'connected'|'response';
    data: RealtimeResponseAuthenticated|RealtimeResponseConnected|RealtimeResponseError|RealtimeResponseEvent<unknown>;
}

type RealtimeRequest = {
    type: 'authentication';
    data: RealtimeRequestAuthenticate;
}

export type RealtimeResponseEvent<T extends unknown> = {
    event: string;
    channels: string[];
    timestamp: number;
    payload: T;
}

type RealtimeResponseError = {
    code: number;
    message: string;
}

type RealtimeResponseConnected = {
    channels: string[];
    user?: object;
}

type RealtimeResponseAuthenticated = {
    to: string;
    success: boolean;
    user: object;
}

type RealtimeRequestAuthenticate = {
    session: string;
}

type Realtime = {
    socket?: WebSocket;
    timeout?: number;
    url?: string;
    lastMessage?: RealtimeResponse;
    channels: Set<string>;
    subscriptions: Map<number, {
        channels: string[];
        callback: (payload: RealtimeResponseEvent<any>) => void
    }>;
    subscriptionsCounter: number;
    reconnect: boolean;
    reconnectAttempts: number;
    getTimeout: () => number;
    connect: () => void;
    createSocket: () => void;
    cleanUp: (channels: string[]) => void;
    onMessage: (event: MessageEvent) => void;
}

export type UploadProgress = {
    $id: string;
    progress: number;
    sizeUploaded: number;
    chunksTotal: number;
    chunksUploaded: number;
}

class AppwriteException extends Error {
    code: number;
    response: string;
    type: string;
    constructor(message: string, code: number = 0, type: string = '', response: string = '') {
        super(message);
        this.name = 'AppwriteException';
        this.message = message;
        this.code = code;
        this.type = type;
        this.response = response;
    }
}

class Appwrite {
    static CHUNK_SIZE = 5*1024*1024; // 5MB

    config = {
        endpoint: 'https://HOSTNAME/v1',
        endpointRealtime: '',
        project: '',
        jwt: '',
        locale: '',
    };
    headers: Headers = {
        'x-sdk-version': 'appwrite:web:7.0.0',
        'X-Appwrite-Response-Format': '0.13.0',
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
            if (this.realtime.channels.size < 1) return;

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

    private async call(method: string, url: URL, headers: Headers = {}, params: Payload = {}): Promise<any> {
        method = method.toUpperCase();


        headers = Object.assign({}, this.headers, headers);
        
        let options: RequestInit = {
            method,
            headers,
            credentials: 'include'
        };

        if (typeof window !== 'undefined' && window.localStorage) {
            headers['X-Fallback-Cookies'] = window.localStorage.getItem('cookieFallback') ?? '';
        }

        if (method === 'GET') {
            for (const [key, value] of Object.entries(this.flatten(params))) {
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

    private flatten(data: Payload, prefix = ''): Payload {
        let output: Payload = {};

        for (const key in data) {
            let value = data[key];
            let finalKey = prefix ? `${prefix}[${key}]` : key;

            if (Array.isArray(value)) {
                output = Object.assign(output, this.flatten(value, finalKey));
            }
            else {
                output[finalKey] = value;
            }
        }

        return output;
    }

    account = {

        /**
         * Get Account
         *
         * Get currently logged in user data as JSON object.
         *
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        get: async <Preferences extends Models.Preferences>(): Promise<Models.User<Preferences>> => {
            let path = '/account';
            let payload: Payload = {};

            const uri = new URL(this.config.endpoint + path);
            return await this.call('get', uri, {
                'content-type': 'application/json',
            }, payload);
        },

        /**
         * Create Account
         *
         * Use this endpoint to allow a new user to register a new account in your
         * project. After the user registration completes successfully, you can use
         * the [/account/verfication](/docs/client/account#accountCreateVerification)
         * route to start verifying the user email address. To allow the new user to
         * login to their new account, you need to create a new [account
         * session](/docs/client/account#accountCreateSession).
         *
         * @param {string} userId
         * @param {string} email
         * @param {string} password
         * @param {string} name
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        create: async <Preferences extends Models.Preferences>(userId: string, email: string, password: string, name?: string): Promise<Models.User<Preferences>> => {
            if (typeof userId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "userId"');
            }

            if (typeof email === 'undefined') {
                throw new AppwriteException('Missing required parameter: "email"');
            }

            if (typeof password === 'undefined') {
                throw new AppwriteException('Missing required parameter: "password"');
            }

            let path = '/account';
            let payload: Payload = {};

            if (typeof userId !== 'undefined') {
                payload['userId'] = userId;
            }

            if (typeof email !== 'undefined') {
                payload['email'] = email;
            }

            if (typeof password !== 'undefined') {
                payload['password'] = password;
            }

            if (typeof name !== 'undefined') {
                payload['name'] = name;
            }

            const uri = new URL(this.config.endpoint + path);
            return await this.call('post', uri, {
                'content-type': 'application/json',
            }, payload);
        },

        /**
         * Delete Account
         *
         * Delete a currently logged in user account. Behind the scene, the user
         * record is not deleted but permanently blocked from any access. This is done
         * to avoid deleted accounts being overtaken by new users with the same email
         * address. Any user-related resources like documents or storage files should
         * be deleted separately.
         *
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        delete: async (): Promise<{}> => {
            let path = '/account';
            let payload: Payload = {};

            const uri = new URL(this.config.endpoint + path);
            return await this.call('delete', uri, {
                'content-type': 'application/json',
            }, payload);
        },

        /**
         * Update Account Email
         *
         * Update currently logged in user account email address. After changing user
         * address, the user confirmation status will get reset. A new confirmation
         * email is not sent automatically however you can use the send confirmation
         * email endpoint again to send the confirmation email. For security measures,
         * user password is required to complete this request.
         * This endpoint can also be used to convert an anonymous account to a normal
         * one, by passing an email address and a new password.
         * 
         *
         * @param {string} email
         * @param {string} password
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        updateEmail: async <Preferences extends Models.Preferences>(email: string, password: string): Promise<Models.User<Preferences>> => {
            if (typeof email === 'undefined') {
                throw new AppwriteException('Missing required parameter: "email"');
            }

            if (typeof password === 'undefined') {
                throw new AppwriteException('Missing required parameter: "password"');
            }

            let path = '/account/email';
            let payload: Payload = {};

            if (typeof email !== 'undefined') {
                payload['email'] = email;
            }

            if (typeof password !== 'undefined') {
                payload['password'] = password;
            }

            const uri = new URL(this.config.endpoint + path);
            return await this.call('patch', uri, {
                'content-type': 'application/json',
            }, payload);
        },

        /**
         * Create Account JWT
         *
         * Use this endpoint to create a JSON Web Token. You can use the resulting JWT
         * to authenticate on behalf of the current user when working with the
         * Appwrite server-side API and SDKs. The JWT secret is valid for 15 minutes
         * from its creation and will be invalid if the user will logout in that time
         * frame.
         *
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        createJWT: async (): Promise<Models.Jwt> => {
            let path = '/account/jwt';
            let payload: Payload = {};

            const uri = new URL(this.config.endpoint + path);
            return await this.call('post', uri, {
                'content-type': 'application/json',
            }, payload);
        },

        /**
         * Get Account Logs
         *
         * Get currently logged in user list of latest security activity logs. Each
         * log returns user IP address, location and date and time of log.
         *
         * @param {number} limit
         * @param {number} offset
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        getLogs: async (limit?: number, offset?: number): Promise<Models.LogList> => {
            let path = '/account/logs';
            let payload: Payload = {};

            if (typeof limit !== 'undefined') {
                payload['limit'] = limit;
            }

            if (typeof offset !== 'undefined') {
                payload['offset'] = offset;
            }

            const uri = new URL(this.config.endpoint + path);
            return await this.call('get', uri, {
                'content-type': 'application/json',
            }, payload);
        },

        /**
         * Update Account Name
         *
         * Update currently logged in user account name.
         *
         * @param {string} name
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        updateName: async <Preferences extends Models.Preferences>(name: string): Promise<Models.User<Preferences>> => {
            if (typeof name === 'undefined') {
                throw new AppwriteException('Missing required parameter: "name"');
            }

            let path = '/account/name';
            let payload: Payload = {};

            if (typeof name !== 'undefined') {
                payload['name'] = name;
            }

            const uri = new URL(this.config.endpoint + path);
            return await this.call('patch', uri, {
                'content-type': 'application/json',
            }, payload);
        },

        /**
         * Update Account Password
         *
         * Update currently logged in user password. For validation, user is required
         * to pass in the new password, and the old password. For users created with
         * OAuth and Team Invites, oldPassword is optional.
         *
         * @param {string} password
         * @param {string} oldPassword
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        updatePassword: async <Preferences extends Models.Preferences>(password: string, oldPassword?: string): Promise<Models.User<Preferences>> => {
            if (typeof password === 'undefined') {
                throw new AppwriteException('Missing required parameter: "password"');
            }

            let path = '/account/password';
            let payload: Payload = {};

            if (typeof password !== 'undefined') {
                payload['password'] = password;
            }

            if (typeof oldPassword !== 'undefined') {
                payload['oldPassword'] = oldPassword;
            }

            const uri = new URL(this.config.endpoint + path);
            return await this.call('patch', uri, {
                'content-type': 'application/json',
            }, payload);
        },

        /**
         * Get Account Preferences
         *
         * Get currently logged in user preferences as a key-value object.
         *
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        getPrefs: async <Preferences extends Models.Preferences>(): Promise<Preferences> => {
            let path = '/account/prefs';
            let payload: Payload = {};

            const uri = new URL(this.config.endpoint + path);
            return await this.call('get', uri, {
                'content-type': 'application/json',
            }, payload);
        },

        /**
         * Update Account Preferences
         *
         * Update currently logged in user account preferences. The object you pass is
         * stored as is, and replaces any previous value. The maximum allowed prefs
         * size is 64kB and throws error if exceeded.
         *
         * @param {object} prefs
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        updatePrefs: async <Preferences extends Models.Preferences>(prefs: object): Promise<Models.User<Preferences>> => {
            if (typeof prefs === 'undefined') {
                throw new AppwriteException('Missing required parameter: "prefs"');
            }

            let path = '/account/prefs';
            let payload: Payload = {};

            if (typeof prefs !== 'undefined') {
                payload['prefs'] = prefs;
            }

            const uri = new URL(this.config.endpoint + path);
            return await this.call('patch', uri, {
                'content-type': 'application/json',
            }, payload);
        },

        /**
         * Create Password Recovery
         *
         * Sends the user an email with a temporary secret key for password reset.
         * When the user clicks the confirmation link he is redirected back to your
         * app password reset URL with the secret key and email address values
         * attached to the URL query string. Use the query string params to submit a
         * request to the [PUT
         * /account/recovery](/docs/client/account#accountUpdateRecovery) endpoint to
         * complete the process. The verification link sent to the user's email
         * address is valid for 1 hour.
         *
         * @param {string} email
         * @param {string} url
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        createRecovery: async (email: string, url: string): Promise<Models.Token> => {
            if (typeof email === 'undefined') {
                throw new AppwriteException('Missing required parameter: "email"');
            }

            if (typeof url === 'undefined') {
                throw new AppwriteException('Missing required parameter: "url"');
            }

            let path = '/account/recovery';
            let payload: Payload = {};

            if (typeof email !== 'undefined') {
                payload['email'] = email;
            }

            if (typeof url !== 'undefined') {
                payload['url'] = url;
            }

            const uri = new URL(this.config.endpoint + path);
            return await this.call('post', uri, {
                'content-type': 'application/json',
            }, payload);
        },

        /**
         * Create Password Recovery (confirmation)
         *
         * Use this endpoint to complete the user account password reset. Both the
         * **userId** and **secret** arguments will be passed as query parameters to
         * the redirect URL you have provided when sending your request to the [POST
         * /account/recovery](/docs/client/account#accountCreateRecovery) endpoint.
         * 
         * Please note that in order to avoid a [Redirect
         * Attack](https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets/Unvalidated_Redirects_and_Forwards_Cheat_Sheet.md)
         * the only valid redirect URLs are the ones from domains you have set when
         * adding your platforms in the console interface.
         *
         * @param {string} userId
         * @param {string} secret
         * @param {string} password
         * @param {string} passwordAgain
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        updateRecovery: async (userId: string, secret: string, password: string, passwordAgain: string): Promise<Models.Token> => {
            if (typeof userId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "userId"');
            }

            if (typeof secret === 'undefined') {
                throw new AppwriteException('Missing required parameter: "secret"');
            }

            if (typeof password === 'undefined') {
                throw new AppwriteException('Missing required parameter: "password"');
            }

            if (typeof passwordAgain === 'undefined') {
                throw new AppwriteException('Missing required parameter: "passwordAgain"');
            }

            let path = '/account/recovery';
            let payload: Payload = {};

            if (typeof userId !== 'undefined') {
                payload['userId'] = userId;
            }

            if (typeof secret !== 'undefined') {
                payload['secret'] = secret;
            }

            if (typeof password !== 'undefined') {
                payload['password'] = password;
            }

            if (typeof passwordAgain !== 'undefined') {
                payload['passwordAgain'] = passwordAgain;
            }

            const uri = new URL(this.config.endpoint + path);
            return await this.call('put', uri, {
                'content-type': 'application/json',
            }, payload);
        },

        /**
         * Get Account Sessions
         *
         * Get currently logged in user list of active sessions across different
         * devices.
         *
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        getSessions: async (): Promise<Models.SessionList> => {
            let path = '/account/sessions';
            let payload: Payload = {};

            const uri = new URL(this.config.endpoint + path);
            return await this.call('get', uri, {
                'content-type': 'application/json',
            }, payload);
        },

        /**
         * Create Account Session
         *
         * Allow the user to login into their account by providing a valid email and
         * password combination. This route will create a new session for the user.
         *
         * @param {string} email
         * @param {string} password
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        createSession: async (email: string, password: string): Promise<Models.Session> => {
            if (typeof email === 'undefined') {
                throw new AppwriteException('Missing required parameter: "email"');
            }

            if (typeof password === 'undefined') {
                throw new AppwriteException('Missing required parameter: "password"');
            }

            let path = '/account/sessions';
            let payload: Payload = {};

            if (typeof email !== 'undefined') {
                payload['email'] = email;
            }

            if (typeof password !== 'undefined') {
                payload['password'] = password;
            }

            const uri = new URL(this.config.endpoint + path);
            return await this.call('post', uri, {
                'content-type': 'application/json',
            }, payload);
        },

        /**
         * Delete All Account Sessions
         *
         * Delete all sessions from the user account and remove any sessions cookies
         * from the end client.
         *
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        deleteSessions: async (): Promise<{}> => {
            let path = '/account/sessions';
            let payload: Payload = {};

            const uri = new URL(this.config.endpoint + path);
            return await this.call('delete', uri, {
                'content-type': 'application/json',
            }, payload);
        },

        /**
         * Create Anonymous Session
         *
         * Use this endpoint to allow a new user to register an anonymous account in
         * your project. This route will also create a new session for the user. To
         * allow the new user to convert an anonymous account to a normal account, you
         * need to update its [email and
         * password](/docs/client/account#accountUpdateEmail) or create an [OAuth2
         * session](/docs/client/account#accountCreateOAuth2Session).
         *
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        createAnonymousSession: async (): Promise<Models.Session> => {
            let path = '/account/sessions/anonymous';
            let payload: Payload = {};

            const uri = new URL(this.config.endpoint + path);
            return await this.call('post', uri, {
                'content-type': 'application/json',
            }, payload);
        },

        /**
         * Create Magic URL session
         *
         * Sends the user an email with a secret key for creating a session. When the
         * user clicks the link in the email, the user is redirected back to the URL
         * you provided with the secret key and userId values attached to the URL
         * query string. Use the query string parameters to submit a request to the
         * [PUT
         * /account/sessions/magic-url](/docs/client/account#accountUpdateMagicURLSession)
         * endpoint to complete the login process. The link sent to the user's email
         * address is valid for 1 hour. If you are on a mobile device you can leave
         * the URL parameter empty, so that the login completion will be handled by
         * your Appwrite instance by default.
         *
         * @param {string} userId
         * @param {string} email
         * @param {string} url
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        createMagicURLSession: async (userId: string, email: string, url?: string): Promise<Models.Token> => {
            if (typeof userId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "userId"');
            }

            if (typeof email === 'undefined') {
                throw new AppwriteException('Missing required parameter: "email"');
            }

            let path = '/account/sessions/magic-url';
            let payload: Payload = {};

            if (typeof userId !== 'undefined') {
                payload['userId'] = userId;
            }

            if (typeof email !== 'undefined') {
                payload['email'] = email;
            }

            if (typeof url !== 'undefined') {
                payload['url'] = url;
            }

            const uri = new URL(this.config.endpoint + path);
            return await this.call('post', uri, {
                'content-type': 'application/json',
            }, payload);
        },

        /**
         * Create Magic URL session (confirmation)
         *
         * Use this endpoint to complete creating the session with the Magic URL. Both
         * the **userId** and **secret** arguments will be passed as query parameters
         * to the redirect URL you have provided when sending your request to the
         * [POST
         * /account/sessions/magic-url](/docs/client/account#accountCreateMagicURLSession)
         * endpoint.
         * 
         * Please note that in order to avoid a [Redirect
         * Attack](https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets/Unvalidated_Redirects_and_Forwards_Cheat_Sheet.md)
         * the only valid redirect URLs are the ones from domains you have set when
         * adding your platforms in the console interface.
         *
         * @param {string} userId
         * @param {string} secret
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        updateMagicURLSession: async (userId: string, secret: string): Promise<Models.Session> => {
            if (typeof userId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "userId"');
            }

            if (typeof secret === 'undefined') {
                throw new AppwriteException('Missing required parameter: "secret"');
            }

            let path = '/account/sessions/magic-url';
            let payload: Payload = {};

            if (typeof userId !== 'undefined') {
                payload['userId'] = userId;
            }

            if (typeof secret !== 'undefined') {
                payload['secret'] = secret;
            }

            const uri = new URL(this.config.endpoint + path);
            return await this.call('put', uri, {
                'content-type': 'application/json',
            }, payload);
        },

        /**
         * Create Account Session with OAuth2
         *
         * Allow the user to login to their account using the OAuth2 provider of their
         * choice. Each OAuth2 provider should be enabled from the Appwrite console
         * first. Use the success and failure arguments to provide a redirect URL's
         * back to your app when login is completed.
         * 
         * If there is already an active session, the new session will be attached to
         * the logged-in account. If there are no active sessions, the server will
         * attempt to look for a user with the same email address as the email
         * received from the OAuth2 provider and attach the new session to the
         * existing user. If no matching user is found - the server will create a new
         * user..
         * 
         *
         * @param {string} provider
         * @param {string} success
         * @param {string} failure
         * @param {string[]} scopes
         * @throws {AppwriteException}
         * @returns {void|string}
         */
        createOAuth2Session: (provider: string, success?: string, failure?: string, scopes?: string[]): void | URL => {
            if (typeof provider === 'undefined') {
                throw new AppwriteException('Missing required parameter: "provider"');
            }

            let path = '/account/sessions/oauth2/{provider}'.replace('{provider}', provider);
            let payload: Payload = {};

            if (typeof success !== 'undefined') {
                payload['success'] = success;
            }

            if (typeof failure !== 'undefined') {
                payload['failure'] = failure;
            }

            if (typeof scopes !== 'undefined') {
                payload['scopes'] = scopes;
            }

            const uri = new URL(this.config.endpoint + path);
            payload['project'] = this.config.project;


            for (const [key, value] of Object.entries(this.flatten(payload))) {
                uri.searchParams.append(key, value);
            }
            if (typeof window !== 'undefined' && window?.location) {
                window.location.href = uri.toString();
            } else {
                return uri;
            }
        },

        /**
         * Get Session By ID
         *
         * Use this endpoint to get a logged in user's session using a Session ID.
         * Inputting 'current' will return the current session being used.
         *
         * @param {string} sessionId
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        getSession: async (sessionId: string): Promise<Models.Session> => {
            if (typeof sessionId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "sessionId"');
            }

            let path = '/account/sessions/{sessionId}'.replace('{sessionId}', sessionId);
            let payload: Payload = {};

            const uri = new URL(this.config.endpoint + path);
            return await this.call('get', uri, {
                'content-type': 'application/json',
            }, payload);
        },

        /**
         * Update Session (Refresh Tokens)
         *
         *
         * @param {string} sessionId
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        updateSession: async (sessionId: string): Promise<Models.Session> => {
            if (typeof sessionId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "sessionId"');
            }

            let path = '/account/sessions/{sessionId}'.replace('{sessionId}', sessionId);
            let payload: Payload = {};

            const uri = new URL(this.config.endpoint + path);
            return await this.call('patch', uri, {
                'content-type': 'application/json',
            }, payload);
        },

        /**
         * Delete Account Session
         *
         * Use this endpoint to log out the currently logged in user from all their
         * account sessions across all of their different devices. When using the
         * Session ID argument, only the unique session ID provided is deleted.
         * 
         *
         * @param {string} sessionId
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        deleteSession: async (sessionId: string): Promise<{}> => {
            if (typeof sessionId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "sessionId"');
            }

            let path = '/account/sessions/{sessionId}'.replace('{sessionId}', sessionId);
            let payload: Payload = {};

            const uri = new URL(this.config.endpoint + path);
            return await this.call('delete', uri, {
                'content-type': 'application/json',
            }, payload);
        },

        /**
         * Create Email Verification
         *
         * Use this endpoint to send a verification message to your user email address
         * to confirm they are the valid owners of that address. Both the **userId**
         * and **secret** arguments will be passed as query parameters to the URL you
         * have provided to be attached to the verification email. The provided URL
         * should redirect the user back to your app and allow you to complete the
         * verification process by verifying both the **userId** and **secret**
         * parameters. Learn more about how to [complete the verification
         * process](/docs/client/account#accountUpdateVerification). The verification
         * link sent to the user's email address is valid for 7 days.
         * 
         * Please note that in order to avoid a [Redirect
         * Attack](https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets/Unvalidated_Redirects_and_Forwards_Cheat_Sheet.md),
         * the only valid redirect URLs are the ones from domains you have set when
         * adding your platforms in the console interface.
         * 
         *
         * @param {string} url
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        createVerification: async (url: string): Promise<Models.Token> => {
            if (typeof url === 'undefined') {
                throw new AppwriteException('Missing required parameter: "url"');
            }

            let path = '/account/verification';
            let payload: Payload = {};

            if (typeof url !== 'undefined') {
                payload['url'] = url;
            }

            const uri = new URL(this.config.endpoint + path);
            return await this.call('post', uri, {
                'content-type': 'application/json',
            }, payload);
        },

        /**
         * Create Email Verification (confirmation)
         *
         * Use this endpoint to complete the user email verification process. Use both
         * the **userId** and **secret** parameters that were attached to your app URL
         * to verify the user email ownership. If confirmed this route will return a
         * 200 status code.
         *
         * @param {string} userId
         * @param {string} secret
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        updateVerification: async (userId: string, secret: string): Promise<Models.Token> => {
            if (typeof userId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "userId"');
            }

            if (typeof secret === 'undefined') {
                throw new AppwriteException('Missing required parameter: "secret"');
            }

            let path = '/account/verification';
            let payload: Payload = {};

            if (typeof userId !== 'undefined') {
                payload['userId'] = userId;
            }

            if (typeof secret !== 'undefined') {
                payload['secret'] = secret;
            }

            const uri = new URL(this.config.endpoint + path);
            return await this.call('put', uri, {
                'content-type': 'application/json',
            }, payload);
        }
    };

    avatars = {

        /**
         * Get Browser Icon
         *
         * You can use this endpoint to show different browser icons to your users.
         * The code argument receives the browser code as it appears in your user
         * /account/sessions endpoint. Use width, height and quality arguments to
         * change the output settings.
         *
         * @param {string} code
         * @param {number} width
         * @param {number} height
         * @param {number} quality
         * @throws {AppwriteException}
         * @returns {URL}
         */
        getBrowser: (code: string, width?: number, height?: number, quality?: number): URL => {
            if (typeof code === 'undefined') {
                throw new AppwriteException('Missing required parameter: "code"');
            }

            let path = '/avatars/browsers/{code}'.replace('{code}', code);
            let payload: Payload = {};

            if (typeof width !== 'undefined') {
                payload['width'] = width;
            }

            if (typeof height !== 'undefined') {
                payload['height'] = height;
            }

            if (typeof quality !== 'undefined') {
                payload['quality'] = quality;
            }

            const uri = new URL(this.config.endpoint + path);
            payload['project'] = this.config.project;


            for (const [key, value] of Object.entries(this.flatten(payload))) {
                uri.searchParams.append(key, value);
            }
            return uri;
        },

        /**
         * Get Credit Card Icon
         *
         * The credit card endpoint will return you the icon of the credit card
         * provider you need. Use width, height and quality arguments to change the
         * output settings.
         *
         * @param {string} code
         * @param {number} width
         * @param {number} height
         * @param {number} quality
         * @throws {AppwriteException}
         * @returns {URL}
         */
        getCreditCard: (code: string, width?: number, height?: number, quality?: number): URL => {
            if (typeof code === 'undefined') {
                throw new AppwriteException('Missing required parameter: "code"');
            }

            let path = '/avatars/credit-cards/{code}'.replace('{code}', code);
            let payload: Payload = {};

            if (typeof width !== 'undefined') {
                payload['width'] = width;
            }

            if (typeof height !== 'undefined') {
                payload['height'] = height;
            }

            if (typeof quality !== 'undefined') {
                payload['quality'] = quality;
            }

            const uri = new URL(this.config.endpoint + path);
            payload['project'] = this.config.project;


            for (const [key, value] of Object.entries(this.flatten(payload))) {
                uri.searchParams.append(key, value);
            }
            return uri;
        },

        /**
         * Get Favicon
         *
         * Use this endpoint to fetch the favorite icon (AKA favicon) of any remote
         * website URL.
         * 
         *
         * @param {string} url
         * @throws {AppwriteException}
         * @returns {URL}
         */
        getFavicon: (url: string): URL => {
            if (typeof url === 'undefined') {
                throw new AppwriteException('Missing required parameter: "url"');
            }

            let path = '/avatars/favicon';
            let payload: Payload = {};

            if (typeof url !== 'undefined') {
                payload['url'] = url;
            }

            const uri = new URL(this.config.endpoint + path);
            payload['project'] = this.config.project;


            for (const [key, value] of Object.entries(this.flatten(payload))) {
                uri.searchParams.append(key, value);
            }
            return uri;
        },

        /**
         * Get Country Flag
         *
         * You can use this endpoint to show different country flags icons to your
         * users. The code argument receives the 2 letter country code. Use width,
         * height and quality arguments to change the output settings.
         *
         * @param {string} code
         * @param {number} width
         * @param {number} height
         * @param {number} quality
         * @throws {AppwriteException}
         * @returns {URL}
         */
        getFlag: (code: string, width?: number, height?: number, quality?: number): URL => {
            if (typeof code === 'undefined') {
                throw new AppwriteException('Missing required parameter: "code"');
            }

            let path = '/avatars/flags/{code}'.replace('{code}', code);
            let payload: Payload = {};

            if (typeof width !== 'undefined') {
                payload['width'] = width;
            }

            if (typeof height !== 'undefined') {
                payload['height'] = height;
            }

            if (typeof quality !== 'undefined') {
                payload['quality'] = quality;
            }

            const uri = new URL(this.config.endpoint + path);
            payload['project'] = this.config.project;


            for (const [key, value] of Object.entries(this.flatten(payload))) {
                uri.searchParams.append(key, value);
            }
            return uri;
        },

        /**
         * Get Image from URL
         *
         * Use this endpoint to fetch a remote image URL and crop it to any image size
         * you want. This endpoint is very useful if you need to crop and display
         * remote images in your app or in case you want to make sure a 3rd party
         * image is properly served using a TLS protocol.
         *
         * @param {string} url
         * @param {number} width
         * @param {number} height
         * @throws {AppwriteException}
         * @returns {URL}
         */
        getImage: (url: string, width?: number, height?: number): URL => {
            if (typeof url === 'undefined') {
                throw new AppwriteException('Missing required parameter: "url"');
            }

            let path = '/avatars/image';
            let payload: Payload = {};

            if (typeof url !== 'undefined') {
                payload['url'] = url;
            }

            if (typeof width !== 'undefined') {
                payload['width'] = width;
            }

            if (typeof height !== 'undefined') {
                payload['height'] = height;
            }

            const uri = new URL(this.config.endpoint + path);
            payload['project'] = this.config.project;


            for (const [key, value] of Object.entries(this.flatten(payload))) {
                uri.searchParams.append(key, value);
            }
            return uri;
        },

        /**
         * Get User Initials
         *
         * Use this endpoint to show your user initials avatar icon on your website or
         * app. By default, this route will try to print your logged-in user name or
         * email initials. You can also overwrite the user name if you pass the 'name'
         * parameter. If no name is given and no user is logged, an empty avatar will
         * be returned.
         * 
         * You can use the color and background params to change the avatar colors. By
         * default, a random theme will be selected. The random theme will persist for
         * the user's initials when reloading the same theme will always return for
         * the same initials.
         *
         * @param {string} name
         * @param {number} width
         * @param {number} height
         * @param {string} color
         * @param {string} background
         * @throws {AppwriteException}
         * @returns {URL}
         */
        getInitials: (name?: string, width?: number, height?: number, color?: string, background?: string): URL => {
            let path = '/avatars/initials';
            let payload: Payload = {};

            if (typeof name !== 'undefined') {
                payload['name'] = name;
            }

            if (typeof width !== 'undefined') {
                payload['width'] = width;
            }

            if (typeof height !== 'undefined') {
                payload['height'] = height;
            }

            if (typeof color !== 'undefined') {
                payload['color'] = color;
            }

            if (typeof background !== 'undefined') {
                payload['background'] = background;
            }

            const uri = new URL(this.config.endpoint + path);
            payload['project'] = this.config.project;


            for (const [key, value] of Object.entries(this.flatten(payload))) {
                uri.searchParams.append(key, value);
            }
            return uri;
        },

        /**
         * Get QR Code
         *
         * Converts a given plain text to a QR code image. You can use the query
         * parameters to change the size and style of the resulting image.
         *
         * @param {string} text
         * @param {number} size
         * @param {number} margin
         * @param {boolean} download
         * @throws {AppwriteException}
         * @returns {URL}
         */
        getQR: (text: string, size?: number, margin?: number, download?: boolean): URL => {
            if (typeof text === 'undefined') {
                throw new AppwriteException('Missing required parameter: "text"');
            }

            let path = '/avatars/qr';
            let payload: Payload = {};

            if (typeof text !== 'undefined') {
                payload['text'] = text;
            }

            if (typeof size !== 'undefined') {
                payload['size'] = size;
            }

            if (typeof margin !== 'undefined') {
                payload['margin'] = margin;
            }

            if (typeof download !== 'undefined') {
                payload['download'] = download;
            }

            const uri = new URL(this.config.endpoint + path);
            payload['project'] = this.config.project;


            for (const [key, value] of Object.entries(this.flatten(payload))) {
                uri.searchParams.append(key, value);
            }
            return uri;
        }
    };

    database = {

        /**
         * List Documents
         *
         * Get a list of all the user documents. You can use the query params to
         * filter your results. On admin mode, this endpoint will return a list of all
         * of the project's documents. [Learn more about different API
         * modes](/docs/admin).
         *
         * @param {string} collectionId
         * @param {string[]} queries
         * @param {number} limit
         * @param {number} offset
         * @param {string} cursor
         * @param {string} cursorDirection
         * @param {string[]} orderAttributes
         * @param {string[]} orderTypes
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        listDocuments: async <Document extends Models.Document>(collectionId: string, queries?: string[], limit?: number, offset?: number, cursor?: string, cursorDirection?: string, orderAttributes?: string[], orderTypes?: string[]): Promise<Models.DocumentList<Document>> => {
            if (typeof collectionId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "collectionId"');
            }

            let path = '/database/collections/{collectionId}/documents'.replace('{collectionId}', collectionId);
            let payload: Payload = {};

            if (typeof queries !== 'undefined') {
                payload['queries'] = queries;
            }

            if (typeof limit !== 'undefined') {
                payload['limit'] = limit;
            }

            if (typeof offset !== 'undefined') {
                payload['offset'] = offset;
            }

            if (typeof cursor !== 'undefined') {
                payload['cursor'] = cursor;
            }

            if (typeof cursorDirection !== 'undefined') {
                payload['cursorDirection'] = cursorDirection;
            }

            if (typeof orderAttributes !== 'undefined') {
                payload['orderAttributes'] = orderAttributes;
            }

            if (typeof orderTypes !== 'undefined') {
                payload['orderTypes'] = orderTypes;
            }

            const uri = new URL(this.config.endpoint + path);
            return await this.call('get', uri, {
                'content-type': 'application/json',
            }, payload);
        },

        /**
         * Create Document
         *
         * Create a new Document. Before using this route, you should create a new
         * collection resource using either a [server
         * integration](/docs/server/database#databaseCreateCollection) API or
         * directly from your database console.
         *
         * @param {string} collectionId
         * @param {string} documentId
         * @param {object} data
         * @param {string[]} read
         * @param {string[]} write
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        createDocument: async <Document extends Models.Document>(collectionId: string, documentId: string, data: object, read?: string[], write?: string[]): Promise<Document> => {
            if (typeof collectionId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "collectionId"');
            }

            if (typeof documentId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "documentId"');
            }

            if (typeof data === 'undefined') {
                throw new AppwriteException('Missing required parameter: "data"');
            }

            let path = '/database/collections/{collectionId}/documents'.replace('{collectionId}', collectionId);
            let payload: Payload = {};

            if (typeof documentId !== 'undefined') {
                payload['documentId'] = documentId;
            }

            if (typeof data !== 'undefined') {
                payload['data'] = data;
            }

            if (typeof read !== 'undefined') {
                payload['read'] = read;
            }

            if (typeof write !== 'undefined') {
                payload['write'] = write;
            }

            const uri = new URL(this.config.endpoint + path);
            return await this.call('post', uri, {
                'content-type': 'application/json',
            }, payload);
        },

        /**
         * Get Document
         *
         * Get a document by its unique ID. This endpoint response returns a JSON
         * object with the document data.
         *
         * @param {string} collectionId
         * @param {string} documentId
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        getDocument: async <Document extends Models.Document>(collectionId: string, documentId: string): Promise<Document> => {
            if (typeof collectionId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "collectionId"');
            }

            if (typeof documentId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "documentId"');
            }

            let path = '/database/collections/{collectionId}/documents/{documentId}'.replace('{collectionId}', collectionId).replace('{documentId}', documentId);
            let payload: Payload = {};

            const uri = new URL(this.config.endpoint + path);
            return await this.call('get', uri, {
                'content-type': 'application/json',
            }, payload);
        },

        /**
         * Update Document
         *
         * Update a document by its unique ID. Using the patch method you can pass
         * only specific fields that will get updated.
         *
         * @param {string} collectionId
         * @param {string} documentId
         * @param {object} data
         * @param {string[]} read
         * @param {string[]} write
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        updateDocument: async <Document extends Models.Document>(collectionId: string, documentId: string, data: object, read?: string[], write?: string[]): Promise<Document> => {
            if (typeof collectionId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "collectionId"');
            }

            if (typeof documentId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "documentId"');
            }

            if (typeof data === 'undefined') {
                throw new AppwriteException('Missing required parameter: "data"');
            }

            let path = '/database/collections/{collectionId}/documents/{documentId}'.replace('{collectionId}', collectionId).replace('{documentId}', documentId);
            let payload: Payload = {};

            if (typeof data !== 'undefined') {
                payload['data'] = data;
            }

            if (typeof read !== 'undefined') {
                payload['read'] = read;
            }

            if (typeof write !== 'undefined') {
                payload['write'] = write;
            }

            const uri = new URL(this.config.endpoint + path);
            return await this.call('patch', uri, {
                'content-type': 'application/json',
            }, payload);
        },

        /**
         * Delete Document
         *
         * Delete a document by its unique ID. This endpoint deletes only the parent
         * documents, its attributes and relations to other documents. Child documents
         * **will not** be deleted.
         *
         * @param {string} collectionId
         * @param {string} documentId
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        deleteDocument: async (collectionId: string, documentId: string): Promise<{}> => {
            if (typeof collectionId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "collectionId"');
            }

            if (typeof documentId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "documentId"');
            }

            let path = '/database/collections/{collectionId}/documents/{documentId}'.replace('{collectionId}', collectionId).replace('{documentId}', documentId);
            let payload: Payload = {};

            const uri = new URL(this.config.endpoint + path);
            return await this.call('delete', uri, {
                'content-type': 'application/json',
            }, payload);
        }
    };

    functions = {

        /**
         * Retry Build
         *
         *
         * @param {string} functionId
         * @param {string} deploymentId
         * @param {string} buildId
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        retryBuild: async (functionId: string, deploymentId: string, buildId: string): Promise<{}> => {
            if (typeof functionId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "functionId"');
            }

            if (typeof deploymentId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "deploymentId"');
            }

            if (typeof buildId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "buildId"');
            }

            let path = '/functions/{functionId}/deployments/{deploymentId}/builds/{buildId}'.replace('{functionId}', functionId).replace('{deploymentId}', deploymentId).replace('{buildId}', buildId);
            let payload: Payload = {};

            const uri = new URL(this.config.endpoint + path);
            return await this.call('post', uri, {
                'content-type': 'application/json',
            }, payload);
        },

        /**
         * List Executions
         *
         * Get a list of all the current user function execution logs. You can use the
         * query params to filter your results. On admin mode, this endpoint will
         * return a list of all of the project's executions. [Learn more about
         * different API modes](/docs/admin).
         *
         * @param {string} functionId
         * @param {number} limit
         * @param {number} offset
         * @param {string} search
         * @param {string} cursor
         * @param {string} cursorDirection
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        listExecutions: async (functionId: string, limit?: number, offset?: number, search?: string, cursor?: string, cursorDirection?: string): Promise<Models.ExecutionList> => {
            if (typeof functionId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "functionId"');
            }

            let path = '/functions/{functionId}/executions'.replace('{functionId}', functionId);
            let payload: Payload = {};

            if (typeof limit !== 'undefined') {
                payload['limit'] = limit;
            }

            if (typeof offset !== 'undefined') {
                payload['offset'] = offset;
            }

            if (typeof search !== 'undefined') {
                payload['search'] = search;
            }

            if (typeof cursor !== 'undefined') {
                payload['cursor'] = cursor;
            }

            if (typeof cursorDirection !== 'undefined') {
                payload['cursorDirection'] = cursorDirection;
            }

            const uri = new URL(this.config.endpoint + path);
            return await this.call('get', uri, {
                'content-type': 'application/json',
            }, payload);
        },

        /**
         * Create Execution
         *
         * Trigger a function execution. The returned object will return you the
         * current execution status. You can ping the `Get Execution` endpoint to get
         * updates on the current execution status. Once this endpoint is called, your
         * function execution process will start asynchronously.
         *
         * @param {string} functionId
         * @param {string} data
         * @param {boolean} async
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        createExecution: async (functionId: string, data?: string, async?: boolean): Promise<Models.Execution> => {
            if (typeof functionId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "functionId"');
            }

            let path = '/functions/{functionId}/executions'.replace('{functionId}', functionId);
            let payload: Payload = {};

            if (typeof data !== 'undefined') {
                payload['data'] = data;
            }

            if (typeof async !== 'undefined') {
                payload['async'] = async;
            }

            const uri = new URL(this.config.endpoint + path);
            return await this.call('post', uri, {
                'content-type': 'application/json',
            }, payload);
        },

        /**
         * Get Execution
         *
         * Get a function execution log by its unique ID.
         *
         * @param {string} functionId
         * @param {string} executionId
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        getExecution: async (functionId: string, executionId: string): Promise<Models.Execution> => {
            if (typeof functionId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "functionId"');
            }

            if (typeof executionId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "executionId"');
            }

            let path = '/functions/{functionId}/executions/{executionId}'.replace('{functionId}', functionId).replace('{executionId}', executionId);
            let payload: Payload = {};

            const uri = new URL(this.config.endpoint + path);
            return await this.call('get', uri, {
                'content-type': 'application/json',
            }, payload);
        }
    };

    locale = {

        /**
         * Get User Locale
         *
         * Get the current user location based on IP. Returns an object with user
         * country code, country name, continent name, continent code, ip address and
         * suggested currency. You can use the locale header to get the data in a
         * supported language.
         * 
         * ([IP Geolocation by DB-IP](https://db-ip.com))
         *
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        get: async (): Promise<Models.Locale> => {
            let path = '/locale';
            let payload: Payload = {};

            const uri = new URL(this.config.endpoint + path);
            return await this.call('get', uri, {
                'content-type': 'application/json',
            }, payload);
        },

        /**
         * List Continents
         *
         * List of all continents. You can use the locale header to get the data in a
         * supported language.
         *
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        getContinents: async (): Promise<Models.ContinentList> => {
            let path = '/locale/continents';
            let payload: Payload = {};

            const uri = new URL(this.config.endpoint + path);
            return await this.call('get', uri, {
                'content-type': 'application/json',
            }, payload);
        },

        /**
         * List Countries
         *
         * List of all countries. You can use the locale header to get the data in a
         * supported language.
         *
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        getCountries: async (): Promise<Models.CountryList> => {
            let path = '/locale/countries';
            let payload: Payload = {};

            const uri = new URL(this.config.endpoint + path);
            return await this.call('get', uri, {
                'content-type': 'application/json',
            }, payload);
        },

        /**
         * List EU Countries
         *
         * List of all countries that are currently members of the EU. You can use the
         * locale header to get the data in a supported language.
         *
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        getCountriesEU: async (): Promise<Models.CountryList> => {
            let path = '/locale/countries/eu';
            let payload: Payload = {};

            const uri = new URL(this.config.endpoint + path);
            return await this.call('get', uri, {
                'content-type': 'application/json',
            }, payload);
        },

        /**
         * List Countries Phone Codes
         *
         * List of all countries phone codes. You can use the locale header to get the
         * data in a supported language.
         *
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        getCountriesPhones: async (): Promise<Models.PhoneList> => {
            let path = '/locale/countries/phones';
            let payload: Payload = {};

            const uri = new URL(this.config.endpoint + path);
            return await this.call('get', uri, {
                'content-type': 'application/json',
            }, payload);
        },

        /**
         * List Currencies
         *
         * List of all currencies, including currency symbol, name, plural, and
         * decimal digits for all major and minor currencies. You can use the locale
         * header to get the data in a supported language.
         *
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        getCurrencies: async (): Promise<Models.CurrencyList> => {
            let path = '/locale/currencies';
            let payload: Payload = {};

            const uri = new URL(this.config.endpoint + path);
            return await this.call('get', uri, {
                'content-type': 'application/json',
            }, payload);
        },

        /**
         * List Languages
         *
         * List of all languages classified by ISO 639-1 including 2-letter code, name
         * in English, and name in the respective language.
         *
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        getLanguages: async (): Promise<Models.LanguageList> => {
            let path = '/locale/languages';
            let payload: Payload = {};

            const uri = new URL(this.config.endpoint + path);
            return await this.call('get', uri, {
                'content-type': 'application/json',
            }, payload);
        }
    };

    storage = {

        /**
         * List Files
         *
         * Get a list of all the user files. You can use the query params to filter
         * your results. On admin mode, this endpoint will return a list of all of the
         * project's files. [Learn more about different API modes](/docs/admin).
         *
         * @param {string} bucketId
         * @param {string} search
         * @param {number} limit
         * @param {number} offset
         * @param {string} cursor
         * @param {string} cursorDirection
         * @param {string} orderType
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        listFiles: async (bucketId: string, search?: string, limit?: number, offset?: number, cursor?: string, cursorDirection?: string, orderType?: string): Promise<Models.FileList> => {
            if (typeof bucketId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "bucketId"');
            }

            let path = '/storage/buckets/{bucketId}/files'.replace('{bucketId}', bucketId);
            let payload: Payload = {};

            if (typeof search !== 'undefined') {
                payload['search'] = search;
            }

            if (typeof limit !== 'undefined') {
                payload['limit'] = limit;
            }

            if (typeof offset !== 'undefined') {
                payload['offset'] = offset;
            }

            if (typeof cursor !== 'undefined') {
                payload['cursor'] = cursor;
            }

            if (typeof cursorDirection !== 'undefined') {
                payload['cursorDirection'] = cursorDirection;
            }

            if (typeof orderType !== 'undefined') {
                payload['orderType'] = orderType;
            }

            const uri = new URL(this.config.endpoint + path);
            return await this.call('get', uri, {
                'content-type': 'application/json',
            }, payload);
        },

        /**
         * Create File
         *
         * Create a new file. Before using this route, you should create a new bucket
         * resource using either a [server
         * integration](/docs/server/database#storageCreateBucket) API or directly
         * from your Appwrite console.
         * 
         * Larger files should be uploaded using multiple requests with the
         * [content-range](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Range)
         * header to send a partial request with a maximum supported chunk of `5MB`.
         * The `content-range` header values should always be in bytes.
         * 
         * When the first request is sent, the server will return the **File** object,
         * and the subsequent part request must include the file's **id** in
         * `x-appwrite-id` header to allow the server to know that the partial upload
         * is for the existing file and not for a new one.
         * 
         * If you're creating a new file using one of the Appwrite SDKs, all the
         * chunking logic will be managed by the SDK internally.
         * 
         *
         * @param {string} bucketId
         * @param {string} fileId
         * @param {File} file
         * @param {string[]} read
         * @param {string[]} write
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        createFile: async (bucketId: string, fileId: string, file: File, read?: string[], write?: string[], onProgress = (progress: UploadProgress) => {}): Promise<Models.File> => {
            if (typeof bucketId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "bucketId"');
            }

            if (typeof fileId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "fileId"');
            }

            if (typeof file === 'undefined') {
                throw new AppwriteException('Missing required parameter: "file"');
            }

            let path = '/storage/buckets/{bucketId}/files'.replace('{bucketId}', bucketId);
            let payload: Payload = {};

            if (typeof fileId !== 'undefined') {
                payload['fileId'] = fileId;
            }

            if (typeof file !== 'undefined') {
                payload['file'] = file;
            }

            if (typeof read !== 'undefined') {
                payload['read'] = read;
            }

            if (typeof write !== 'undefined') {
                payload['write'] = write;
            }

            const uri = new URL(this.config.endpoint + path);
            const size = file.size;

            if (size <= Appwrite.CHUNK_SIZE) {
                return await this.call('post', uri, {
            
                    'content-type': 'multipart/form-data',
                }, payload);
            }
            let id = undefined;
            let response = undefined;

            const headers: { [header: string]: string } = {
                'content-type': 'multipart/form-data',
            }

            let counter = 0;
            const totalCounters = Math.ceil(size / Appwrite.CHUNK_SIZE);
            if(fileId != 'unique()') {
                try {
                    response = await this.call('GET', new URL(this.config.endpoint + path + '/' + fileId), headers);
                    counter = response.chunksUploaded;
                } catch(e) {
                }
            }

            for (counter; counter < totalCounters; counter++) {
                const start = (counter * Appwrite.CHUNK_SIZE);
                const end = Math.min((((counter * Appwrite.CHUNK_SIZE) + Appwrite.CHUNK_SIZE) - 1), size);

                headers['content-range'] = 'bytes ' + start + '-' + end + '/' + size

                if (id) {
                    headers['x-appwrite-id'] = id;
                }

                const stream = file.slice(start, end + 1);
                payload['file'] = new File([stream], file.name);

                response = await this.call('post', uri, headers, payload);

                if (!id) {
                    id = response['$id'];
                }

                if (onProgress) {
                    onProgress({
                        $id: response.$id,
                        progress: Math.min((counter + 1) * Appwrite.CHUNK_SIZE, size) / size * 100,
                        sizeUploaded: end+1,
                        chunksTotal: response.chunksTotal,
                        chunksUploaded: response.chunksUploaded
                    });
                }
            }

            return response;
        },

        /**
         * Get File
         *
         * Get a file by its unique ID. This endpoint response returns a JSON object
         * with the file metadata.
         *
         * @param {string} bucketId
         * @param {string} fileId
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        getFile: async (bucketId: string, fileId: string): Promise<Models.File> => {
            if (typeof bucketId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "bucketId"');
            }

            if (typeof fileId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "fileId"');
            }

            let path = '/storage/buckets/{bucketId}/files/{fileId}'.replace('{bucketId}', bucketId).replace('{fileId}', fileId);
            let payload: Payload = {};

            const uri = new URL(this.config.endpoint + path);
            return await this.call('get', uri, {
                'content-type': 'application/json',
            }, payload);
        },

        /**
         * Update File
         *
         * Update a file by its unique ID. Only users with write permissions have
         * access to update this resource.
         *
         * @param {string} bucketId
         * @param {string} fileId
         * @param {string[]} read
         * @param {string[]} write
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        updateFile: async (bucketId: string, fileId: string, read?: string[], write?: string[]): Promise<Models.File> => {
            if (typeof bucketId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "bucketId"');
            }

            if (typeof fileId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "fileId"');
            }

            let path = '/storage/buckets/{bucketId}/files/{fileId}'.replace('{bucketId}', bucketId).replace('{fileId}', fileId);
            let payload: Payload = {};

            if (typeof read !== 'undefined') {
                payload['read'] = read;
            }

            if (typeof write !== 'undefined') {
                payload['write'] = write;
            }

            const uri = new URL(this.config.endpoint + path);
            return await this.call('put', uri, {
                'content-type': 'application/json',
            }, payload);
        },

        /**
         * Delete File
         *
         * Delete a file by its unique ID. Only users with write permissions have
         * access to delete this resource.
         *
         * @param {string} bucketId
         * @param {string} fileId
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        deleteFile: async (bucketId: string, fileId: string): Promise<{}> => {
            if (typeof bucketId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "bucketId"');
            }

            if (typeof fileId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "fileId"');
            }

            let path = '/storage/buckets/{bucketId}/files/{fileId}'.replace('{bucketId}', bucketId).replace('{fileId}', fileId);
            let payload: Payload = {};

            const uri = new URL(this.config.endpoint + path);
            return await this.call('delete', uri, {
                'content-type': 'application/json',
            }, payload);
        },

        /**
         * Get File for Download
         *
         * Get a file content by its unique ID. The endpoint response return with a
         * 'Content-Disposition: attachment' header that tells the browser to start
         * downloading the file to user downloads directory.
         *
         * @param {string} bucketId
         * @param {string} fileId
         * @throws {AppwriteException}
         * @returns {URL}
         */
        getFileDownload: (bucketId: string, fileId: string): URL => {
            if (typeof bucketId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "bucketId"');
            }

            if (typeof fileId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "fileId"');
            }

            let path = '/storage/buckets/{bucketId}/files/{fileId}/download'.replace('{bucketId}', bucketId).replace('{fileId}', fileId);
            let payload: Payload = {};

            const uri = new URL(this.config.endpoint + path);
            payload['project'] = this.config.project;


            for (const [key, value] of Object.entries(this.flatten(payload))) {
                uri.searchParams.append(key, value);
            }
            return uri;
        },

        /**
         * Get File Preview
         *
         * Get a file preview image. Currently, this method supports preview for image
         * files (jpg, png, and gif), other supported formats, like pdf, docs, slides,
         * and spreadsheets, will return the file icon image. You can also pass query
         * string arguments for cutting and resizing your preview image. Preview is
         * supported only for image files smaller than 10MB.
         *
         * @param {string} bucketId
         * @param {string} fileId
         * @param {number} width
         * @param {number} height
         * @param {string} gravity
         * @param {number} quality
         * @param {number} borderWidth
         * @param {string} borderColor
         * @param {number} borderRadius
         * @param {number} opacity
         * @param {number} rotation
         * @param {string} background
         * @param {string} output
         * @throws {AppwriteException}
         * @returns {URL}
         */
        getFilePreview: (bucketId: string, fileId: string, width?: number, height?: number, gravity?: string, quality?: number, borderWidth?: number, borderColor?: string, borderRadius?: number, opacity?: number, rotation?: number, background?: string, output?: string): URL => {
            if (typeof bucketId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "bucketId"');
            }

            if (typeof fileId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "fileId"');
            }

            let path = '/storage/buckets/{bucketId}/files/{fileId}/preview'.replace('{bucketId}', bucketId).replace('{fileId}', fileId);
            let payload: Payload = {};

            if (typeof width !== 'undefined') {
                payload['width'] = width;
            }

            if (typeof height !== 'undefined') {
                payload['height'] = height;
            }

            if (typeof gravity !== 'undefined') {
                payload['gravity'] = gravity;
            }

            if (typeof quality !== 'undefined') {
                payload['quality'] = quality;
            }

            if (typeof borderWidth !== 'undefined') {
                payload['borderWidth'] = borderWidth;
            }

            if (typeof borderColor !== 'undefined') {
                payload['borderColor'] = borderColor;
            }

            if (typeof borderRadius !== 'undefined') {
                payload['borderRadius'] = borderRadius;
            }

            if (typeof opacity !== 'undefined') {
                payload['opacity'] = opacity;
            }

            if (typeof rotation !== 'undefined') {
                payload['rotation'] = rotation;
            }

            if (typeof background !== 'undefined') {
                payload['background'] = background;
            }

            if (typeof output !== 'undefined') {
                payload['output'] = output;
            }

            const uri = new URL(this.config.endpoint + path);
            payload['project'] = this.config.project;


            for (const [key, value] of Object.entries(this.flatten(payload))) {
                uri.searchParams.append(key, value);
            }
            return uri;
        },

        /**
         * Get File for View
         *
         * Get a file content by its unique ID. This endpoint is similar to the
         * download method but returns with no  'Content-Disposition: attachment'
         * header.
         *
         * @param {string} bucketId
         * @param {string} fileId
         * @throws {AppwriteException}
         * @returns {URL}
         */
        getFileView: (bucketId: string, fileId: string): URL => {
            if (typeof bucketId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "bucketId"');
            }

            if (typeof fileId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "fileId"');
            }

            let path = '/storage/buckets/{bucketId}/files/{fileId}/view'.replace('{bucketId}', bucketId).replace('{fileId}', fileId);
            let payload: Payload = {};

            const uri = new URL(this.config.endpoint + path);
            payload['project'] = this.config.project;


            for (const [key, value] of Object.entries(this.flatten(payload))) {
                uri.searchParams.append(key, value);
            }
            return uri;
        }
    };

    teams = {

        /**
         * List Teams
         *
         * Get a list of all the teams in which the current user is a member. You can
         * use the parameters to filter your results.
         * 
         * In admin mode, this endpoint returns a list of all the teams in the current
         * project. [Learn more about different API modes](/docs/admin).
         *
         * @param {string} search
         * @param {number} limit
         * @param {number} offset
         * @param {string} cursor
         * @param {string} cursorDirection
         * @param {string} orderType
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        list: async (search?: string, limit?: number, offset?: number, cursor?: string, cursorDirection?: string, orderType?: string): Promise<Models.TeamList> => {
            let path = '/teams';
            let payload: Payload = {};

            if (typeof search !== 'undefined') {
                payload['search'] = search;
            }

            if (typeof limit !== 'undefined') {
                payload['limit'] = limit;
            }

            if (typeof offset !== 'undefined') {
                payload['offset'] = offset;
            }

            if (typeof cursor !== 'undefined') {
                payload['cursor'] = cursor;
            }

            if (typeof cursorDirection !== 'undefined') {
                payload['cursorDirection'] = cursorDirection;
            }

            if (typeof orderType !== 'undefined') {
                payload['orderType'] = orderType;
            }

            const uri = new URL(this.config.endpoint + path);
            return await this.call('get', uri, {
                'content-type': 'application/json',
            }, payload);
        },

        /**
         * Create Team
         *
         * Create a new team. The user who creates the team will automatically be
         * assigned as the owner of the team. Only the users with the owner role can
         * invite new members, add new owners and delete or update the team.
         *
         * @param {string} teamId
         * @param {string} name
         * @param {string[]} roles
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        create: async (teamId: string, name: string, roles?: string[]): Promise<Models.Team> => {
            if (typeof teamId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "teamId"');
            }

            if (typeof name === 'undefined') {
                throw new AppwriteException('Missing required parameter: "name"');
            }

            let path = '/teams';
            let payload: Payload = {};

            if (typeof teamId !== 'undefined') {
                payload['teamId'] = teamId;
            }

            if (typeof name !== 'undefined') {
                payload['name'] = name;
            }

            if (typeof roles !== 'undefined') {
                payload['roles'] = roles;
            }

            const uri = new URL(this.config.endpoint + path);
            return await this.call('post', uri, {
                'content-type': 'application/json',
            }, payload);
        },

        /**
         * Get Team
         *
         * Get a team by its ID. All team members have read access for this resource.
         *
         * @param {string} teamId
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        get: async (teamId: string): Promise<Models.Team> => {
            if (typeof teamId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "teamId"');
            }

            let path = '/teams/{teamId}'.replace('{teamId}', teamId);
            let payload: Payload = {};

            const uri = new URL(this.config.endpoint + path);
            return await this.call('get', uri, {
                'content-type': 'application/json',
            }, payload);
        },

        /**
         * Update Team
         *
         * Update a team using its ID. Only members with the owner role can update the
         * team.
         *
         * @param {string} teamId
         * @param {string} name
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        update: async (teamId: string, name: string): Promise<Models.Team> => {
            if (typeof teamId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "teamId"');
            }

            if (typeof name === 'undefined') {
                throw new AppwriteException('Missing required parameter: "name"');
            }

            let path = '/teams/{teamId}'.replace('{teamId}', teamId);
            let payload: Payload = {};

            if (typeof name !== 'undefined') {
                payload['name'] = name;
            }

            const uri = new URL(this.config.endpoint + path);
            return await this.call('put', uri, {
                'content-type': 'application/json',
            }, payload);
        },

        /**
         * Delete Team
         *
         * Delete a team using its ID. Only team members with the owner role can
         * delete the team.
         *
         * @param {string} teamId
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        delete: async (teamId: string): Promise<{}> => {
            if (typeof teamId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "teamId"');
            }

            let path = '/teams/{teamId}'.replace('{teamId}', teamId);
            let payload: Payload = {};

            const uri = new URL(this.config.endpoint + path);
            return await this.call('delete', uri, {
                'content-type': 'application/json',
            }, payload);
        },

        /**
         * Get Team Memberships
         *
         * Use this endpoint to list a team's members using the team's ID. All team
         * members have read access to this endpoint.
         *
         * @param {string} teamId
         * @param {string} search
         * @param {number} limit
         * @param {number} offset
         * @param {string} cursor
         * @param {string} cursorDirection
         * @param {string} orderType
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        getMemberships: async (teamId: string, search?: string, limit?: number, offset?: number, cursor?: string, cursorDirection?: string, orderType?: string): Promise<Models.MembershipList> => {
            if (typeof teamId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "teamId"');
            }

            let path = '/teams/{teamId}/memberships'.replace('{teamId}', teamId);
            let payload: Payload = {};

            if (typeof search !== 'undefined') {
                payload['search'] = search;
            }

            if (typeof limit !== 'undefined') {
                payload['limit'] = limit;
            }

            if (typeof offset !== 'undefined') {
                payload['offset'] = offset;
            }

            if (typeof cursor !== 'undefined') {
                payload['cursor'] = cursor;
            }

            if (typeof cursorDirection !== 'undefined') {
                payload['cursorDirection'] = cursorDirection;
            }

            if (typeof orderType !== 'undefined') {
                payload['orderType'] = orderType;
            }

            const uri = new URL(this.config.endpoint + path);
            return await this.call('get', uri, {
                'content-type': 'application/json',
            }, payload);
        },

        /**
         * Create Team Membership
         *
         * Invite a new member to join your team. If initiated from the client SDK, an
         * email with a link to join the team will be sent to the member's email
         * address and an account will be created for them should they not be signed
         * up already. If initiated from server-side SDKs, the new member will
         * automatically be added to the team.
         * 
         * Use the 'url' parameter to redirect the user from the invitation email back
         * to your app. When the user is redirected, use the [Update Team Membership
         * Status](/docs/client/teams#teamsUpdateMembershipStatus) endpoint to allow
         * the user to accept the invitation to the team. 
         * 
         * Please note that to avoid a [Redirect
         * Attack](https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets/Unvalidated_Redirects_and_Forwards_Cheat_Sheet.md)
         * the only valid redirect URL's are the once from domains you have set when
         * adding your platforms in the console interface.
         *
         * @param {string} teamId
         * @param {string} email
         * @param {string[]} roles
         * @param {string} url
         * @param {string} name
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        createMembership: async (teamId: string, email: string, roles: string[], url: string, name?: string): Promise<Models.Membership> => {
            if (typeof teamId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "teamId"');
            }

            if (typeof email === 'undefined') {
                throw new AppwriteException('Missing required parameter: "email"');
            }

            if (typeof roles === 'undefined') {
                throw new AppwriteException('Missing required parameter: "roles"');
            }

            if (typeof url === 'undefined') {
                throw new AppwriteException('Missing required parameter: "url"');
            }

            let path = '/teams/{teamId}/memberships'.replace('{teamId}', teamId);
            let payload: Payload = {};

            if (typeof email !== 'undefined') {
                payload['email'] = email;
            }

            if (typeof roles !== 'undefined') {
                payload['roles'] = roles;
            }

            if (typeof url !== 'undefined') {
                payload['url'] = url;
            }

            if (typeof name !== 'undefined') {
                payload['name'] = name;
            }

            const uri = new URL(this.config.endpoint + path);
            return await this.call('post', uri, {
                'content-type': 'application/json',
            }, payload);
        },

        /**
         * Get Team Membership
         *
         * Get a team member by the membership unique id. All team members have read
         * access for this resource.
         *
         * @param {string} teamId
         * @param {string} membershipId
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        getMembership: async (teamId: string, membershipId: string): Promise<Models.MembershipList> => {
            if (typeof teamId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "teamId"');
            }

            if (typeof membershipId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "membershipId"');
            }

            let path = '/teams/{teamId}/memberships/{membershipId}'.replace('{teamId}', teamId).replace('{membershipId}', membershipId);
            let payload: Payload = {};

            const uri = new URL(this.config.endpoint + path);
            return await this.call('get', uri, {
                'content-type': 'application/json',
            }, payload);
        },

        /**
         * Update Membership Roles
         *
         * Modify the roles of a team member. Only team members with the owner role
         * have access to this endpoint. Learn more about [roles and
         * permissions](/docs/permissions).
         *
         * @param {string} teamId
         * @param {string} membershipId
         * @param {string[]} roles
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        updateMembershipRoles: async (teamId: string, membershipId: string, roles: string[]): Promise<Models.Membership> => {
            if (typeof teamId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "teamId"');
            }

            if (typeof membershipId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "membershipId"');
            }

            if (typeof roles === 'undefined') {
                throw new AppwriteException('Missing required parameter: "roles"');
            }

            let path = '/teams/{teamId}/memberships/{membershipId}'.replace('{teamId}', teamId).replace('{membershipId}', membershipId);
            let payload: Payload = {};

            if (typeof roles !== 'undefined') {
                payload['roles'] = roles;
            }

            const uri = new URL(this.config.endpoint + path);
            return await this.call('patch', uri, {
                'content-type': 'application/json',
            }, payload);
        },

        /**
         * Delete Team Membership
         *
         * This endpoint allows a user to leave a team or for a team owner to delete
         * the membership of any other team member. You can also use this endpoint to
         * delete a user membership even if it is not accepted.
         *
         * @param {string} teamId
         * @param {string} membershipId
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        deleteMembership: async (teamId: string, membershipId: string): Promise<{}> => {
            if (typeof teamId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "teamId"');
            }

            if (typeof membershipId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "membershipId"');
            }

            let path = '/teams/{teamId}/memberships/{membershipId}'.replace('{teamId}', teamId).replace('{membershipId}', membershipId);
            let payload: Payload = {};

            const uri = new URL(this.config.endpoint + path);
            return await this.call('delete', uri, {
                'content-type': 'application/json',
            }, payload);
        },

        /**
         * Update Team Membership Status
         *
         * Use this endpoint to allow a user to accept an invitation to join a team
         * after being redirected back to your app from the invitation email received
         * by the user.
         * 
         * If the request is successful, a session for the user is automatically
         * created.
         * 
         *
         * @param {string} teamId
         * @param {string} membershipId
         * @param {string} userId
         * @param {string} secret
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        updateMembershipStatus: async (teamId: string, membershipId: string, userId: string, secret: string): Promise<Models.Membership> => {
            if (typeof teamId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "teamId"');
            }

            if (typeof membershipId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "membershipId"');
            }

            if (typeof userId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "userId"');
            }

            if (typeof secret === 'undefined') {
                throw new AppwriteException('Missing required parameter: "secret"');
            }

            let path = '/teams/{teamId}/memberships/{membershipId}/status'.replace('{teamId}', teamId).replace('{membershipId}', membershipId);
            let payload: Payload = {};

            if (typeof userId !== 'undefined') {
                payload['userId'] = userId;
            }

            if (typeof secret !== 'undefined') {
                payload['secret'] = secret;
            }

            const uri = new URL(this.config.endpoint + path);
            return await this.call('patch', uri, {
                'content-type': 'application/json',
            }, payload);
        }
    };

};

type QueryTypesSingle = string | number | boolean;
type QueryTypesList = string[] | number[] | boolean[];
type QueryTypes = QueryTypesSingle | QueryTypesList;

class Query {
  static equal = (attribute: string, value: QueryTypes): string =>
    Query.addQuery(attribute, "equal", value);

  static notEqual = (attribute: string, value: QueryTypes): string =>
    Query.addQuery(attribute, "notEqual", value);

  static lesser = (attribute: string, value: QueryTypes): string =>
    Query.addQuery(attribute, "lesser", value);

  static lesserEqual = (attribute: string, value: QueryTypes): string =>
    Query.addQuery(attribute, "lesserEqual", value);

  static greater = (attribute: string, value: QueryTypes): string =>
    Query.addQuery(attribute, "greater", value);

  static greaterEqual = (attribute: string, value: QueryTypes): string =>
    Query.addQuery(attribute, "greaterEqual", value);

  static search = (attribute: string, value: string): string =>
    Query.addQuery(attribute, "search", value);

  private static addQuery = (attribute: string, oper: string, value: QueryTypes): string =>
    value instanceof Array
      ? `${attribute}.${oper}(${value
          .map((v: QueryTypesSingle) => Query.parseValues(v))
          .join(",")})`
      : `${attribute}.${oper}(${Query.parseValues(value)})`;

  private static parseValues = (value: QueryTypes): string =>
    typeof value === "string" || value instanceof String
      ? `"${value}"`
      : `${value}`;
}

export { Appwrite, Query }
export type { AppwriteException, Models, QueryTypes, QueryTypesList }
