import { Service } from '../service';
import { AppwriteException, Client } from '../client';
import type { Models } from '../models';
import type { UploadProgress, Payload } from '../client';

export class Graphql extends Service {

     constructor(client: Client)
     {
        super(client);
     }

        /**
         * GraphQL Endpoint
         *
         * Execute a GraphQL mutation.
         *
         * @param {object} query
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async query(query: object): Promise<{}> {
            if (typeof query === 'undefined') {
                throw new AppwriteException('Missing required parameter: "query"');
            }

            let path = '/graphql';
            let payload: Payload = {};

            if (typeof query !== 'undefined') {
                payload['query'] = query;
            }

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('post', uri, {
                'x-sdk-graphql': 'true',
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * GraphQL Endpoint
         *
         * Execute a GraphQL mutation.
         *
         * @param {object} query
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async mutation(query: object): Promise<{}> {
            if (typeof query === 'undefined') {
                throw new AppwriteException('Missing required parameter: "query"');
            }

            let path = '/graphql/mutation';
            let payload: Payload = {};

            if (typeof query !== 'undefined') {
                payload['query'] = query;
            }

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('post', uri, {
                'x-sdk-graphql': 'true',
                'content-type': 'application/json',
            }, payload);
        }
};
