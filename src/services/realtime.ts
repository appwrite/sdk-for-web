import { AppwriteException, Client } from '../client';

export type RealtimeSubscription = {
    close: () => Promise<void>;
}

export type RealtimeCallback<T = any> = {
    channels: Set<string>;
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
}

export type RealtimeResponseConnected = {
    channels: string[];
    user?: object;
}

export type RealtimeRequest = {
    type: 'authentication';
    data: {
        session: string;
    };
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
    private readonly DEBOUNCE_MS = 1;
    private readonly HEARTBEAT_INTERVAL = 20000; // 20 seconds in milliseconds

    private client: Client;
    private socket?: WebSocket;
    private activeChannels = new Set<string>();
    private activeSubscriptions = new Map<number, RealtimeCallback<any>>();
    private heartbeatTimer?: number;

    private subCallDepth = 0;
    private reconnectAttempts = 0;
    private subscriptionsCounter = 0;
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
        if (this.activeChannels.size === 0) {
            this.reconnect = false;
            await this.closeSocket();
            return;
        }

        const projectId = this.client.config.project;
        if (!projectId) {
            throw new AppwriteException('Missing project ID');
        }

        let queryParams = `project=${projectId}`;
        for (const channel of this.activeChannels) {
            queryParams += `&channels[]=${encodeURIComponent(channel)}`;
        }

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
            await this.closeSocket();
        }

        return new Promise((resolve, reject) => {
            try {
                this.socket = new WebSocket(url);

                this.socket.addEventListener('open', () => {
                    this.reconnectAttempts = 0;
                    this.onOpenCallbacks.forEach(callback => callback());
                    this.startHeartbeat();
                    resolve();
                });

                this.socket.addEventListener('message', (event: MessageEvent) => {
                    try {
                        const message = JSON.parse(event.data) as RealtimeResponse;
                        this.handleMessage(message);
                    } catch (error) {
                        console.error('Failed to parse message:', error);
                    }
                });

                this.socket.addEventListener('close', async (event: CloseEvent) => {
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

                this.socket.addEventListener('error', (event: Event) => {
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

    /**
     * Subscribe to a single channel
     *
     * @param {string} channel - Channel name to subscribe to
     * @param {Function} callback - Callback function to handle events
     * @returns {Promise<RealtimeSubscription>} Subscription object with close method
     */
    public async subscribe(
        channel: string,
        callback: (event: RealtimeResponseEvent<any>) => void
    ): Promise<RealtimeSubscription>;

    /**
     * Subscribe to multiple channels
     *
     * @param {string[]} channels - Array of channel names to subscribe to
     * @param {Function} callback - Callback function to handle events
     * @returns {Promise<RealtimeSubscription>} Subscription object with close method
     */
    public async subscribe(
        channels: string[],
        callback: (event: RealtimeResponseEvent<any>) => void
    ): Promise<RealtimeSubscription>;

    /**
     * Subscribe to a single channel with typed payload
     *
     * @param {string} channel - Channel name to subscribe to
     * @param {Function} callback - Callback function to handle events with typed payload
     * @returns {Promise<RealtimeSubscription>} Subscription object with close method
     */
    public async subscribe<T>(
        channel: string,
        callback: (event: RealtimeResponseEvent<T>) => void
    ): Promise<RealtimeSubscription>;

    /**
     * Subscribe to multiple channels with typed payload
     *
     * @param {string[]} channels - Array of channel names to subscribe to
     * @param {Function} callback - Callback function to handle events with typed payload
     * @returns {Promise<RealtimeSubscription>} Subscription object with close method
     */
    public async subscribe<T>(
        channels: string[],
        callback: (event: RealtimeResponseEvent<T>) => void
    ): Promise<RealtimeSubscription>;

    public async subscribe<T = any>(
        channelsOrChannel: string | string[],
        callback: (event: RealtimeResponseEvent<T>) => void
    ): Promise<RealtimeSubscription> {
        const channels = Array.isArray(channelsOrChannel)
            ? new Set(channelsOrChannel)
            : new Set([channelsOrChannel]);

        this.subscriptionsCounter++;
        const count = this.subscriptionsCounter;

        for (const channel of channels) {
            this.activeChannels.add(channel);
        }

        this.activeSubscriptions.set(count, {
            channels,
            callback
        });

        this.subCallDepth++;

        await this.sleep(this.DEBOUNCE_MS);

        if (this.subCallDepth === 1) {
            await this.createSocket();
        }

        this.subCallDepth--;

        return {
            close: async () => {
                this.activeSubscriptions.delete(count);
                this.cleanUp(channels);
                await this.createSocket();
            }
        };
    }

    private cleanUp(channels: Set<string>): void {
        this.activeChannels = new Set(
            Array.from(this.activeChannels).filter(channel => {
                if (!channels.has(channel)) {
                    return true;
                }

                const subsWithChannel = Array.from(this.activeSubscriptions.values())
                    .filter(sub => sub.channels.has(channel));

                return subsWithChannel.length > 0;
            })
        );
    }

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
        }
    }

    private handleResponseConnected(message: RealtimeResponse): void {
        if (!message.data) {
            return;
        }

        const messageData = message.data as RealtimeResponseConnected;

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

        if (!channels || !events || !payload) {
            return;
        }

        const hasActiveChannel = channels.some(channel =>
            this.activeChannels.has(channel)
        );

        if (!hasActiveChannel) {
            return;
        }

        for (const [_, subscription] of this.activeSubscriptions) {
            const hasSubscribedChannel = channels.some(channel =>
                subscription.channels.has(channel)
            );

            if (hasSubscribedChannel) {
                const response: RealtimeResponseEvent<any> = {
                    events,
                    channels,
                    timestamp,
                    payload
                };
                subscription.callback(response);
            }
        }
    }
}
