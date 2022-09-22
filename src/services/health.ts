import { Service } from '../service';
import { AppwriteException, Client } from '../client';
import type { Models } from '../models';
import type { UploadProgress, Payload } from '../client';

export class Health extends Service {

     constructor(client: Client)
     {
        super(client);
     }

        /**
         * Get HTTP
         *
         * Check the Appwrite HTTP server is up and responsive.
         *
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async get(): Promise<Models.HealthStatus> {
            let path = '/health';
            let payload: Payload = {};

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('get', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Get Antivirus
         *
         * Check the Appwrite Antivirus server is up and connection is successful.
         *
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async getAntivirus(): Promise<Models.HealthAntivirus> {
            let path = '/health/anti-virus';
            let payload: Payload = {};

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('get', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Get Cache
         *
         * Check the Appwrite in-memory cache server is up and connection is
         * successful.
         *
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async getCache(): Promise<Models.HealthStatus> {
            let path = '/health/cache';
            let payload: Payload = {};

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('get', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Get DB
         *
         * Check the Appwrite database server is up and connection is successful.
         *
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async getDB(): Promise<Models.HealthStatus> {
            let path = '/health/db';
            let payload: Payload = {};

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('get', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Get Certificates Queue
         *
         * Get the number of certificates that are waiting to be issued against
         * [Letsencrypt](https://letsencrypt.org/) in the Appwrite internal queue
         * server.
         *
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async getQueueCertificates(): Promise<Models.HealthQueue> {
            let path = '/health/queue/certificates';
            let payload: Payload = {};

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('get', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Get Functions Queue
         *
         *
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async getQueueFunctions(): Promise<Models.HealthQueue> {
            let path = '/health/queue/functions';
            let payload: Payload = {};

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('get', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Get Logs Queue
         *
         * Get the number of logs that are waiting to be processed in the Appwrite
         * internal queue server.
         *
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async getQueueLogs(): Promise<Models.HealthQueue> {
            let path = '/health/queue/logs';
            let payload: Payload = {};

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('get', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Get Webhooks Queue
         *
         * Get the number of webhooks that are waiting to be processed in the Appwrite
         * internal queue server.
         *
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async getQueueWebhooks(): Promise<Models.HealthQueue> {
            let path = '/health/queue/webhooks';
            let payload: Payload = {};

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('get', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Get Local Storage
         *
         * Check the Appwrite local storage device is up and connection is successful.
         *
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async getStorageLocal(): Promise<Models.HealthStatus> {
            let path = '/health/storage/local';
            let payload: Payload = {};

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('get', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Get Time
         *
         * Check the Appwrite server time is synced with Google remote NTP server. We
         * use this technology to smoothly handle leap seconds with no disruptive
         * events. The [Network Time
         * Protocol](https://en.wikipedia.org/wiki/Network_Time_Protocol) (NTP) is
         * used by hundreds of millions of computers and devices to synchronize their
         * clocks over the Internet. If your computer sets its own clock, it likely
         * uses NTP.
         *
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async getTime(): Promise<Models.HealthTime> {
            let path = '/health/time';
            let payload: Payload = {};

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('get', uri, {
                'content-type': 'application/json',
            }, payload);
        }
};
