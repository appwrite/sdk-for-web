import { Payload } from '../payload';
import { AppwriteException, Client, type Params, UploadProgress } from '../client';
import type { Models } from '../models';

export class Graphql {
    client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    /**
     * GraphQL endpoint
     *
     * Execute a GraphQL mutation.
     *
     * @param {object} query
     * @throws {AppwriteException}
     * @returns {Promise<{}>}
     */
    async query(query: object): Promise<{}> {
        if (typeof query === 'undefined') {
            throw new AppwriteException('Missing required parameter: "query"');
        }
        const apiPath = '/graphql';
        const params: Params = {};
        if (typeof query !== 'undefined') {
            params['query'] = query;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);

        const apiHeaders: { [header: string]: string } = {
            'x-sdk-graphql': 'true',
            'content-type': 'application/json',
        }

        return await this.client.call(
            'post',
            uri,
            apiHeaders,
            params
        );
    }
    /**
     * GraphQL endpoint
     *
     * Execute a GraphQL mutation.
     *
     * @param {object} query
     * @throws {AppwriteException}
     * @returns {Promise<{}>}
     */
    async mutation(query: object): Promise<{}> {
        if (typeof query === 'undefined') {
            throw new AppwriteException('Missing required parameter: "query"');
        }
        const apiPath = '/graphql/mutation';
        const params: Params = {};
        if (typeof query !== 'undefined') {
            params['query'] = query;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);

        const apiHeaders: { [header: string]: string } = {
            'x-sdk-graphql': 'true',
            'content-type': 'application/json',
        }

        return await this.client.call(
            'post',
            uri,
            apiHeaders,
            params
        );
    }
}
