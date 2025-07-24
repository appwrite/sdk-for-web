import { Service } from '../service';
import { AppwriteException, Client, type Payload, UploadProgress } from '../client';
import type { Models } from '../models';

export class Graphql {
    client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    /**
     * Execute a GraphQL mutation.
     *
     * @param {object} query
     * @throws {AppwriteException}
     * @returns {Promise<{}>}
     */
    query(query: object): Promise<{}> {
        if (typeof query === 'undefined') {
            throw new AppwriteException('Missing required parameter: "query"');
        }
        const apiPath = '/graphql';
        const payload: Payload = {};
        if (typeof query !== 'undefined') {
            payload['query'] = query;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);

        const apiHeaders: { [header: string]: string } = {
            'x-sdk-graphql': 'true',
            'content-type': 'application/json',
        }

        return this.client.call(
            'post',
            uri,
            apiHeaders,
            payload
        );
    }

    /**
     * Execute a GraphQL mutation.
     *
     * @param {object} query
     * @throws {AppwriteException}
     * @returns {Promise<{}>}
     */
    mutation(query: object): Promise<{}> {
        if (typeof query === 'undefined') {
            throw new AppwriteException('Missing required parameter: "query"');
        }
        const apiPath = '/graphql/mutation';
        const payload: Payload = {};
        if (typeof query !== 'undefined') {
            payload['query'] = query;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);

        const apiHeaders: { [header: string]: string } = {
            'x-sdk-graphql': 'true',
            'content-type': 'application/json',
        }

        return this.client.call(
            'post',
            uri,
            apiHeaders,
            payload
        );
    }
}
