import { Service } from '../service';
import { AppwriteException } from '../client';
import type { Models } from '../models';
import type { UploadProgress } from '../client';

type Payload = {
    [key: string]: any;
}

export class Database extends Service {

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
        async listDocuments<Document extends Models.Document>(collectionId: string, queries?: string[], limit?: number, offset?: number, cursor?: string, cursorDirection?: string, orderAttributes?: string[], orderTypes?: string[]): Promise<Models.DocumentList<Document>> {
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

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('get', uri, {
                'content-type': 'application/json',
            }, payload);
        }

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
         * @param {Omit<Document, keyof Models.Document>} data
         * @param {string[]} read
         * @param {string[]} write
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async createDocument<Document extends Models.Document>(collectionId: string, documentId: string, data: Omit<Document, keyof Models.Document>, read?: string[], write?: string[]): Promise<Document> {
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

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('post', uri, {
                'content-type': 'application/json',
            }, payload);
        }

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
        async getDocument<Document extends Models.Document>(collectionId: string, documentId: string): Promise<Document> {
            if (typeof collectionId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "collectionId"');
            }

            if (typeof documentId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "documentId"');
            }

            let path = '/database/collections/{collectionId}/documents/{documentId}'.replace('{collectionId}', collectionId).replace('{documentId}', documentId);
            let payload: Payload = {};

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('get', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Update Document
         *
         * Update a document by its unique ID. Using the patch method you can pass
         * only specific fields that will get updated.
         *
         * @param {string} collectionId
         * @param {string} documentId
         * @param {Partial<Omit<Document, keyof Models.Document>>} data
         * @param {string[]} read
         * @param {string[]} write
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async updateDocument<Document extends Models.Document>(collectionId: string, documentId: string, data: Partial<Omit<Document, keyof Models.Document>>, read?: string[], write?: string[]): Promise<Document> {
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

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('patch', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Delete Document
         *
         * Delete a document by its unique ID.
         *
         * @param {string} collectionId
         * @param {string} documentId
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async deleteDocument(collectionId: string, documentId: string): Promise<{}> {
            if (typeof collectionId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "collectionId"');
            }

            if (typeof documentId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "documentId"');
            }

            let path = '/database/collections/{collectionId}/documents/{documentId}'.replace('{collectionId}', collectionId).replace('{documentId}', documentId);
            let payload: Payload = {};

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('delete', uri, {
                'content-type': 'application/json',
            }, payload);
        }
};
