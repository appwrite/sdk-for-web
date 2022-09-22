import { Service } from '../service';
import { AppwriteException, Client } from '../client';
import type { Models } from '../models';
import type { UploadProgress, Payload } from '../client';

export class Databases extends Service {

     constructor(client: Client)
     {
        super(client);
     }

        /**
         * List Databases
         *
         * Get a list of all databases from the current Appwrite project. You can use
         * the search parameter to filter your results.
         *
         * @param {string[]} queries
         * @param {string} search
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async list(queries?: string[], search?: string): Promise<Models.DatabaseList> {
            let path = '/databases';
            let payload: Payload = {};

            if (typeof queries !== 'undefined') {
                payload['queries'] = queries;
            }

            if (typeof search !== 'undefined') {
                payload['search'] = search;
            }

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('get', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Create Database
         *
         * Create a new Database.
         * 
         *
         * @param {string} databaseId
         * @param {string} name
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async create(databaseId: string, name: string): Promise<Models.Database> {
            if (typeof databaseId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "databaseId"');
            }

            if (typeof name === 'undefined') {
                throw new AppwriteException('Missing required parameter: "name"');
            }

            let path = '/databases';
            let payload: Payload = {};

            if (typeof databaseId !== 'undefined') {
                payload['databaseId'] = databaseId;
            }

            if (typeof name !== 'undefined') {
                payload['name'] = name;
            }

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('post', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Get usage stats for the database
         *
         *
         * @param {string} range
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async getUsage(range?: string): Promise<Models.UsageDatabases> {
            let path = '/databases/usage';
            let payload: Payload = {};

            if (typeof range !== 'undefined') {
                payload['range'] = range;
            }

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('get', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Get Database
         *
         * Get a database by its unique ID. This endpoint response returns a JSON
         * object with the database metadata.
         *
         * @param {string} databaseId
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async get(databaseId: string): Promise<Models.Database> {
            if (typeof databaseId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "databaseId"');
            }

            let path = '/databases/{databaseId}'.replace('{databaseId}', databaseId);
            let payload: Payload = {};

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('get', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Update Database
         *
         * Update a database by its unique ID.
         *
         * @param {string} databaseId
         * @param {string} name
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async update(databaseId: string, name: string): Promise<Models.Database> {
            if (typeof databaseId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "databaseId"');
            }

            if (typeof name === 'undefined') {
                throw new AppwriteException('Missing required parameter: "name"');
            }

            let path = '/databases/{databaseId}'.replace('{databaseId}', databaseId);
            let payload: Payload = {};

            if (typeof name !== 'undefined') {
                payload['name'] = name;
            }

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('put', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Delete Database
         *
         * Delete a database by its unique ID. Only API keys with with databases.write
         * scope can delete a database.
         *
         * @param {string} databaseId
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async delete(databaseId: string): Promise<{}> {
            if (typeof databaseId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "databaseId"');
            }

            let path = '/databases/{databaseId}'.replace('{databaseId}', databaseId);
            let payload: Payload = {};

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('delete', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * List Collections
         *
         * Get a list of all collections that belong to the provided databaseId. You
         * can use the search parameter to filter your results.
         *
         * @param {string} databaseId
         * @param {string[]} queries
         * @param {string} search
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async listCollections(databaseId: string, queries?: string[], search?: string): Promise<Models.CollectionList> {
            if (typeof databaseId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "databaseId"');
            }

            let path = '/databases/{databaseId}/collections'.replace('{databaseId}', databaseId);
            let payload: Payload = {};

            if (typeof queries !== 'undefined') {
                payload['queries'] = queries;
            }

            if (typeof search !== 'undefined') {
                payload['search'] = search;
            }

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('get', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Create Collection
         *
         * Create a new Collection. Before using this route, you should create a new
         * database resource using either a [server
         * integration](/docs/server/databases#databasesCreateCollection) API or
         * directly from your database console.
         *
         * @param {string} databaseId
         * @param {string} collectionId
         * @param {string} name
         * @param {string[]} permissions
         * @param {boolean} documentSecurity
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async createCollection(databaseId: string, collectionId: string, name: string, permissions?: string[], documentSecurity?: boolean): Promise<Models.Collection> {
            if (typeof databaseId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "databaseId"');
            }

            if (typeof collectionId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "collectionId"');
            }

            if (typeof name === 'undefined') {
                throw new AppwriteException('Missing required parameter: "name"');
            }

            let path = '/databases/{databaseId}/collections'.replace('{databaseId}', databaseId);
            let payload: Payload = {};

            if (typeof collectionId !== 'undefined') {
                payload['collectionId'] = collectionId;
            }

            if (typeof name !== 'undefined') {
                payload['name'] = name;
            }

            if (typeof permissions !== 'undefined') {
                payload['permissions'] = permissions;
            }

            if (typeof documentSecurity !== 'undefined') {
                payload['documentSecurity'] = documentSecurity;
            }

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('post', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Get Collection
         *
         * Get a collection by its unique ID. This endpoint response returns a JSON
         * object with the collection metadata.
         *
         * @param {string} databaseId
         * @param {string} collectionId
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async getCollection(databaseId: string, collectionId: string): Promise<Models.Collection> {
            if (typeof databaseId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "databaseId"');
            }

            if (typeof collectionId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "collectionId"');
            }

            let path = '/databases/{databaseId}/collections/{collectionId}'.replace('{databaseId}', databaseId).replace('{collectionId}', collectionId);
            let payload: Payload = {};

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('get', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Update Collection
         *
         * Update a collection by its unique ID.
         *
         * @param {string} databaseId
         * @param {string} collectionId
         * @param {string} name
         * @param {string[]} permissions
         * @param {boolean} documentSecurity
         * @param {boolean} enabled
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async updateCollection(databaseId: string, collectionId: string, name: string, permissions?: string[], documentSecurity?: boolean, enabled?: boolean): Promise<Models.Collection> {
            if (typeof databaseId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "databaseId"');
            }

            if (typeof collectionId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "collectionId"');
            }

            if (typeof name === 'undefined') {
                throw new AppwriteException('Missing required parameter: "name"');
            }

            let path = '/databases/{databaseId}/collections/{collectionId}'.replace('{databaseId}', databaseId).replace('{collectionId}', collectionId);
            let payload: Payload = {};

            if (typeof name !== 'undefined') {
                payload['name'] = name;
            }

            if (typeof permissions !== 'undefined') {
                payload['permissions'] = permissions;
            }

            if (typeof documentSecurity !== 'undefined') {
                payload['documentSecurity'] = documentSecurity;
            }

            if (typeof enabled !== 'undefined') {
                payload['enabled'] = enabled;
            }

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('put', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Delete Collection
         *
         * Delete a collection by its unique ID. Only users with write permissions
         * have access to delete this resource.
         *
         * @param {string} databaseId
         * @param {string} collectionId
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async deleteCollection(databaseId: string, collectionId: string): Promise<{}> {
            if (typeof databaseId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "databaseId"');
            }

            if (typeof collectionId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "collectionId"');
            }

            let path = '/databases/{databaseId}/collections/{collectionId}'.replace('{databaseId}', databaseId).replace('{collectionId}', collectionId);
            let payload: Payload = {};

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('delete', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * List Attributes
         *
         *
         * @param {string} databaseId
         * @param {string} collectionId
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async listAttributes(databaseId: string, collectionId: string): Promise<Models.AttributeList> {
            if (typeof databaseId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "databaseId"');
            }

            if (typeof collectionId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "collectionId"');
            }

            let path = '/databases/{databaseId}/collections/{collectionId}/attributes'.replace('{databaseId}', databaseId).replace('{collectionId}', collectionId);
            let payload: Payload = {};

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('get', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Create Boolean Attribute
         *
         * Create a boolean attribute.
         * 
         *
         * @param {string} databaseId
         * @param {string} collectionId
         * @param {string} key
         * @param {boolean} required
         * @param {boolean} xdefault
         * @param {boolean} array
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async createBooleanAttribute(databaseId: string, collectionId: string, key: string, required: boolean, xdefault?: boolean, array?: boolean): Promise<Models.AttributeBoolean> {
            if (typeof databaseId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "databaseId"');
            }

            if (typeof collectionId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "collectionId"');
            }

            if (typeof key === 'undefined') {
                throw new AppwriteException('Missing required parameter: "key"');
            }

            if (typeof required === 'undefined') {
                throw new AppwriteException('Missing required parameter: "required"');
            }

            let path = '/databases/{databaseId}/collections/{collectionId}/attributes/boolean'.replace('{databaseId}', databaseId).replace('{collectionId}', collectionId);
            let payload: Payload = {};

            if (typeof key !== 'undefined') {
                payload['key'] = key;
            }

            if (typeof required !== 'undefined') {
                payload['required'] = required;
            }

            if (typeof xdefault !== 'undefined') {
                payload['default'] = xdefault;
            }

            if (typeof array !== 'undefined') {
                payload['array'] = array;
            }

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('post', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Create DateTime Attribute
         *
         *
         * @param {string} databaseId
         * @param {string} collectionId
         * @param {string} key
         * @param {boolean} required
         * @param {string} xdefault
         * @param {boolean} array
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async createDatetimeAttribute(databaseId: string, collectionId: string, key: string, required: boolean, xdefault?: string, array?: boolean): Promise<Models.AttributeDatetime> {
            if (typeof databaseId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "databaseId"');
            }

            if (typeof collectionId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "collectionId"');
            }

            if (typeof key === 'undefined') {
                throw new AppwriteException('Missing required parameter: "key"');
            }

            if (typeof required === 'undefined') {
                throw new AppwriteException('Missing required parameter: "required"');
            }

            let path = '/databases/{databaseId}/collections/{collectionId}/attributes/datetime'.replace('{databaseId}', databaseId).replace('{collectionId}', collectionId);
            let payload: Payload = {};

            if (typeof key !== 'undefined') {
                payload['key'] = key;
            }

            if (typeof required !== 'undefined') {
                payload['required'] = required;
            }

            if (typeof xdefault !== 'undefined') {
                payload['default'] = xdefault;
            }

            if (typeof array !== 'undefined') {
                payload['array'] = array;
            }

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('post', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Create Email Attribute
         *
         * Create an email attribute.
         * 
         *
         * @param {string} databaseId
         * @param {string} collectionId
         * @param {string} key
         * @param {boolean} required
         * @param {string} xdefault
         * @param {boolean} array
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async createEmailAttribute(databaseId: string, collectionId: string, key: string, required: boolean, xdefault?: string, array?: boolean): Promise<Models.AttributeEmail> {
            if (typeof databaseId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "databaseId"');
            }

            if (typeof collectionId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "collectionId"');
            }

            if (typeof key === 'undefined') {
                throw new AppwriteException('Missing required parameter: "key"');
            }

            if (typeof required === 'undefined') {
                throw new AppwriteException('Missing required parameter: "required"');
            }

            let path = '/databases/{databaseId}/collections/{collectionId}/attributes/email'.replace('{databaseId}', databaseId).replace('{collectionId}', collectionId);
            let payload: Payload = {};

            if (typeof key !== 'undefined') {
                payload['key'] = key;
            }

            if (typeof required !== 'undefined') {
                payload['required'] = required;
            }

            if (typeof xdefault !== 'undefined') {
                payload['default'] = xdefault;
            }

            if (typeof array !== 'undefined') {
                payload['array'] = array;
            }

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('post', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Create Enum Attribute
         *
         *
         * @param {string} databaseId
         * @param {string} collectionId
         * @param {string} key
         * @param {string[]} elements
         * @param {boolean} required
         * @param {string} xdefault
         * @param {boolean} array
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async createEnumAttribute(databaseId: string, collectionId: string, key: string, elements: string[], required: boolean, xdefault?: string, array?: boolean): Promise<Models.AttributeEnum> {
            if (typeof databaseId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "databaseId"');
            }

            if (typeof collectionId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "collectionId"');
            }

            if (typeof key === 'undefined') {
                throw new AppwriteException('Missing required parameter: "key"');
            }

            if (typeof elements === 'undefined') {
                throw new AppwriteException('Missing required parameter: "elements"');
            }

            if (typeof required === 'undefined') {
                throw new AppwriteException('Missing required parameter: "required"');
            }

            let path = '/databases/{databaseId}/collections/{collectionId}/attributes/enum'.replace('{databaseId}', databaseId).replace('{collectionId}', collectionId);
            let payload: Payload = {};

            if (typeof key !== 'undefined') {
                payload['key'] = key;
            }

            if (typeof elements !== 'undefined') {
                payload['elements'] = elements;
            }

            if (typeof required !== 'undefined') {
                payload['required'] = required;
            }

            if (typeof xdefault !== 'undefined') {
                payload['default'] = xdefault;
            }

            if (typeof array !== 'undefined') {
                payload['array'] = array;
            }

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('post', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Create Float Attribute
         *
         * Create a float attribute. Optionally, minimum and maximum values can be
         * provided.
         * 
         *
         * @param {string} databaseId
         * @param {string} collectionId
         * @param {string} key
         * @param {boolean} required
         * @param {number} min
         * @param {number} max
         * @param {number} xdefault
         * @param {boolean} array
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async createFloatAttribute(databaseId: string, collectionId: string, key: string, required: boolean, min?: number, max?: number, xdefault?: number, array?: boolean): Promise<Models.AttributeFloat> {
            if (typeof databaseId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "databaseId"');
            }

            if (typeof collectionId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "collectionId"');
            }

            if (typeof key === 'undefined') {
                throw new AppwriteException('Missing required parameter: "key"');
            }

            if (typeof required === 'undefined') {
                throw new AppwriteException('Missing required parameter: "required"');
            }

            let path = '/databases/{databaseId}/collections/{collectionId}/attributes/float'.replace('{databaseId}', databaseId).replace('{collectionId}', collectionId);
            let payload: Payload = {};

            if (typeof key !== 'undefined') {
                payload['key'] = key;
            }

            if (typeof required !== 'undefined') {
                payload['required'] = required;
            }

            if (typeof min !== 'undefined') {
                payload['min'] = min;
            }

            if (typeof max !== 'undefined') {
                payload['max'] = max;
            }

            if (typeof xdefault !== 'undefined') {
                payload['default'] = xdefault;
            }

            if (typeof array !== 'undefined') {
                payload['array'] = array;
            }

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('post', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Create Integer Attribute
         *
         * Create an integer attribute. Optionally, minimum and maximum values can be
         * provided.
         * 
         *
         * @param {string} databaseId
         * @param {string} collectionId
         * @param {string} key
         * @param {boolean} required
         * @param {number} min
         * @param {number} max
         * @param {number} xdefault
         * @param {boolean} array
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async createIntegerAttribute(databaseId: string, collectionId: string, key: string, required: boolean, min?: number, max?: number, xdefault?: number, array?: boolean): Promise<Models.AttributeInteger> {
            if (typeof databaseId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "databaseId"');
            }

            if (typeof collectionId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "collectionId"');
            }

            if (typeof key === 'undefined') {
                throw new AppwriteException('Missing required parameter: "key"');
            }

            if (typeof required === 'undefined') {
                throw new AppwriteException('Missing required parameter: "required"');
            }

            let path = '/databases/{databaseId}/collections/{collectionId}/attributes/integer'.replace('{databaseId}', databaseId).replace('{collectionId}', collectionId);
            let payload: Payload = {};

            if (typeof key !== 'undefined') {
                payload['key'] = key;
            }

            if (typeof required !== 'undefined') {
                payload['required'] = required;
            }

            if (typeof min !== 'undefined') {
                payload['min'] = min;
            }

            if (typeof max !== 'undefined') {
                payload['max'] = max;
            }

            if (typeof xdefault !== 'undefined') {
                payload['default'] = xdefault;
            }

            if (typeof array !== 'undefined') {
                payload['array'] = array;
            }

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('post', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Create IP Address Attribute
         *
         * Create IP address attribute.
         * 
         *
         * @param {string} databaseId
         * @param {string} collectionId
         * @param {string} key
         * @param {boolean} required
         * @param {string} xdefault
         * @param {boolean} array
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async createIpAttribute(databaseId: string, collectionId: string, key: string, required: boolean, xdefault?: string, array?: boolean): Promise<Models.AttributeIp> {
            if (typeof databaseId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "databaseId"');
            }

            if (typeof collectionId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "collectionId"');
            }

            if (typeof key === 'undefined') {
                throw new AppwriteException('Missing required parameter: "key"');
            }

            if (typeof required === 'undefined') {
                throw new AppwriteException('Missing required parameter: "required"');
            }

            let path = '/databases/{databaseId}/collections/{collectionId}/attributes/ip'.replace('{databaseId}', databaseId).replace('{collectionId}', collectionId);
            let payload: Payload = {};

            if (typeof key !== 'undefined') {
                payload['key'] = key;
            }

            if (typeof required !== 'undefined') {
                payload['required'] = required;
            }

            if (typeof xdefault !== 'undefined') {
                payload['default'] = xdefault;
            }

            if (typeof array !== 'undefined') {
                payload['array'] = array;
            }

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('post', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Create String Attribute
         *
         * Create a string attribute.
         * 
         *
         * @param {string} databaseId
         * @param {string} collectionId
         * @param {string} key
         * @param {number} size
         * @param {boolean} required
         * @param {string} xdefault
         * @param {boolean} array
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async createStringAttribute(databaseId: string, collectionId: string, key: string, size: number, required: boolean, xdefault?: string, array?: boolean): Promise<Models.AttributeString> {
            if (typeof databaseId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "databaseId"');
            }

            if (typeof collectionId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "collectionId"');
            }

            if (typeof key === 'undefined') {
                throw new AppwriteException('Missing required parameter: "key"');
            }

            if (typeof size === 'undefined') {
                throw new AppwriteException('Missing required parameter: "size"');
            }

            if (typeof required === 'undefined') {
                throw new AppwriteException('Missing required parameter: "required"');
            }

            let path = '/databases/{databaseId}/collections/{collectionId}/attributes/string'.replace('{databaseId}', databaseId).replace('{collectionId}', collectionId);
            let payload: Payload = {};

            if (typeof key !== 'undefined') {
                payload['key'] = key;
            }

            if (typeof size !== 'undefined') {
                payload['size'] = size;
            }

            if (typeof required !== 'undefined') {
                payload['required'] = required;
            }

            if (typeof xdefault !== 'undefined') {
                payload['default'] = xdefault;
            }

            if (typeof array !== 'undefined') {
                payload['array'] = array;
            }

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('post', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Create URL Attribute
         *
         * Create a URL attribute.
         * 
         *
         * @param {string} databaseId
         * @param {string} collectionId
         * @param {string} key
         * @param {boolean} required
         * @param {string} xdefault
         * @param {boolean} array
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async createUrlAttribute(databaseId: string, collectionId: string, key: string, required: boolean, xdefault?: string, array?: boolean): Promise<Models.AttributeUrl> {
            if (typeof databaseId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "databaseId"');
            }

            if (typeof collectionId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "collectionId"');
            }

            if (typeof key === 'undefined') {
                throw new AppwriteException('Missing required parameter: "key"');
            }

            if (typeof required === 'undefined') {
                throw new AppwriteException('Missing required parameter: "required"');
            }

            let path = '/databases/{databaseId}/collections/{collectionId}/attributes/url'.replace('{databaseId}', databaseId).replace('{collectionId}', collectionId);
            let payload: Payload = {};

            if (typeof key !== 'undefined') {
                payload['key'] = key;
            }

            if (typeof required !== 'undefined') {
                payload['required'] = required;
            }

            if (typeof xdefault !== 'undefined') {
                payload['default'] = xdefault;
            }

            if (typeof array !== 'undefined') {
                payload['array'] = array;
            }

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('post', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Get Attribute
         *
         *
         * @param {string} databaseId
         * @param {string} collectionId
         * @param {string} key
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async getAttribute(databaseId: string, collectionId: string, key: string): Promise<{}> {
            if (typeof databaseId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "databaseId"');
            }

            if (typeof collectionId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "collectionId"');
            }

            if (typeof key === 'undefined') {
                throw new AppwriteException('Missing required parameter: "key"');
            }

            let path = '/databases/{databaseId}/collections/{collectionId}/attributes/{key}'.replace('{databaseId}', databaseId).replace('{collectionId}', collectionId).replace('{key}', key);
            let payload: Payload = {};

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('get', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Delete Attribute
         *
         *
         * @param {string} databaseId
         * @param {string} collectionId
         * @param {string} key
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async deleteAttribute(databaseId: string, collectionId: string, key: string): Promise<{}> {
            if (typeof databaseId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "databaseId"');
            }

            if (typeof collectionId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "collectionId"');
            }

            if (typeof key === 'undefined') {
                throw new AppwriteException('Missing required parameter: "key"');
            }

            let path = '/databases/{databaseId}/collections/{collectionId}/attributes/{key}'.replace('{databaseId}', databaseId).replace('{collectionId}', collectionId).replace('{key}', key);
            let payload: Payload = {};

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('delete', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * List Documents
         *
         * Get a list of all the user's documents in a given collection. You can use
         * the query params to filter your results. On admin mode, this endpoint will
         * return a list of all of documents belonging to the provided collectionId.
         * [Learn more about different API modes](/docs/admin).
         *
         * @param {string} databaseId
         * @param {string} collectionId
         * @param {string[]} queries
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async listDocuments<Document extends Models.Document>(databaseId: string, collectionId: string, queries?: string[]): Promise<Models.DocumentList<Document>> {
            if (typeof databaseId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "databaseId"');
            }

            if (typeof collectionId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "collectionId"');
            }

            let path = '/databases/{databaseId}/collections/{collectionId}/documents'.replace('{databaseId}', databaseId).replace('{collectionId}', collectionId);
            let payload: Payload = {};

            if (typeof queries !== 'undefined') {
                payload['queries'] = queries;
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
         * integration](/docs/server/databases#databasesCreateCollection) API or
         * directly from your database console.
         *
         * @param {string} databaseId
         * @param {string} collectionId
         * @param {string} documentId
         * @param {Omit<Document, keyof Models.Document>} data
         * @param {string[]} permissions
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async createDocument<Document extends Models.Document>(databaseId: string, collectionId: string, documentId: string, data: Omit<Document, keyof Models.Document>, permissions?: string[]): Promise<Document> {
            if (typeof databaseId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "databaseId"');
            }

            if (typeof collectionId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "collectionId"');
            }

            if (typeof documentId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "documentId"');
            }

            if (typeof data === 'undefined') {
                throw new AppwriteException('Missing required parameter: "data"');
            }

            let path = '/databases/{databaseId}/collections/{collectionId}/documents'.replace('{databaseId}', databaseId).replace('{collectionId}', collectionId);
            let payload: Payload = {};

            if (typeof documentId !== 'undefined') {
                payload['documentId'] = documentId;
            }

            if (typeof data !== 'undefined') {
                payload['data'] = data;
            }

            if (typeof permissions !== 'undefined') {
                payload['permissions'] = permissions;
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
         * @param {string} databaseId
         * @param {string} collectionId
         * @param {string} documentId
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async getDocument<Document extends Models.Document>(databaseId: string, collectionId: string, documentId: string): Promise<Document> {
            if (typeof databaseId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "databaseId"');
            }

            if (typeof collectionId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "collectionId"');
            }

            if (typeof documentId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "documentId"');
            }

            let path = '/databases/{databaseId}/collections/{collectionId}/documents/{documentId}'.replace('{databaseId}', databaseId).replace('{collectionId}', collectionId).replace('{documentId}', documentId);
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
         * @param {string} databaseId
         * @param {string} collectionId
         * @param {string} documentId
         * @param {Partial<Omit<Document, keyof Models.Document>>} data
         * @param {string[]} permissions
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async updateDocument<Document extends Models.Document>(databaseId: string, collectionId: string, documentId: string, data?: Partial<Omit<Document, keyof Models.Document>>, permissions?: string[]): Promise<Document> {
            if (typeof databaseId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "databaseId"');
            }

            if (typeof collectionId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "collectionId"');
            }

            if (typeof documentId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "documentId"');
            }

            let path = '/databases/{databaseId}/collections/{collectionId}/documents/{documentId}'.replace('{databaseId}', databaseId).replace('{collectionId}', collectionId).replace('{documentId}', documentId);
            let payload: Payload = {};

            if (typeof data !== 'undefined') {
                payload['data'] = data;
            }

            if (typeof permissions !== 'undefined') {
                payload['permissions'] = permissions;
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
         * @param {string} databaseId
         * @param {string} collectionId
         * @param {string} documentId
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async deleteDocument(databaseId: string, collectionId: string, documentId: string): Promise<{}> {
            if (typeof databaseId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "databaseId"');
            }

            if (typeof collectionId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "collectionId"');
            }

            if (typeof documentId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "documentId"');
            }

            let path = '/databases/{databaseId}/collections/{collectionId}/documents/{documentId}'.replace('{databaseId}', databaseId).replace('{collectionId}', collectionId).replace('{documentId}', documentId);
            let payload: Payload = {};

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('delete', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * List Document Logs
         *
         * Get the document activity logs list by its unique ID.
         *
         * @param {string} databaseId
         * @param {string} collectionId
         * @param {string} documentId
         * @param {string[]} queries
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async listDocumentLogs(databaseId: string, collectionId: string, documentId: string, queries?: string[]): Promise<Models.LogList> {
            if (typeof databaseId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "databaseId"');
            }

            if (typeof collectionId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "collectionId"');
            }

            if (typeof documentId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "documentId"');
            }

            let path = '/databases/{databaseId}/collections/{collectionId}/documents/{documentId}/logs'.replace('{databaseId}', databaseId).replace('{collectionId}', collectionId).replace('{documentId}', documentId);
            let payload: Payload = {};

            if (typeof queries !== 'undefined') {
                payload['queries'] = queries;
            }

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('get', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * List Indexes
         *
         *
         * @param {string} databaseId
         * @param {string} collectionId
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async listIndexes(databaseId: string, collectionId: string): Promise<Models.IndexList> {
            if (typeof databaseId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "databaseId"');
            }

            if (typeof collectionId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "collectionId"');
            }

            let path = '/databases/{databaseId}/collections/{collectionId}/indexes'.replace('{databaseId}', databaseId).replace('{collectionId}', collectionId);
            let payload: Payload = {};

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('get', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Create Index
         *
         *
         * @param {string} databaseId
         * @param {string} collectionId
         * @param {string} key
         * @param {string} type
         * @param {string[]} attributes
         * @param {string[]} orders
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async createIndex(databaseId: string, collectionId: string, key: string, type: string, attributes: string[], orders?: string[]): Promise<Models.Index> {
            if (typeof databaseId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "databaseId"');
            }

            if (typeof collectionId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "collectionId"');
            }

            if (typeof key === 'undefined') {
                throw new AppwriteException('Missing required parameter: "key"');
            }

            if (typeof type === 'undefined') {
                throw new AppwriteException('Missing required parameter: "type"');
            }

            if (typeof attributes === 'undefined') {
                throw new AppwriteException('Missing required parameter: "attributes"');
            }

            let path = '/databases/{databaseId}/collections/{collectionId}/indexes'.replace('{databaseId}', databaseId).replace('{collectionId}', collectionId);
            let payload: Payload = {};

            if (typeof key !== 'undefined') {
                payload['key'] = key;
            }

            if (typeof type !== 'undefined') {
                payload['type'] = type;
            }

            if (typeof attributes !== 'undefined') {
                payload['attributes'] = attributes;
            }

            if (typeof orders !== 'undefined') {
                payload['orders'] = orders;
            }

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('post', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Get Index
         *
         *
         * @param {string} databaseId
         * @param {string} collectionId
         * @param {string} key
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async getIndex(databaseId: string, collectionId: string, key: string): Promise<Models.Index> {
            if (typeof databaseId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "databaseId"');
            }

            if (typeof collectionId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "collectionId"');
            }

            if (typeof key === 'undefined') {
                throw new AppwriteException('Missing required parameter: "key"');
            }

            let path = '/databases/{databaseId}/collections/{collectionId}/indexes/{key}'.replace('{databaseId}', databaseId).replace('{collectionId}', collectionId).replace('{key}', key);
            let payload: Payload = {};

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('get', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Delete Index
         *
         *
         * @param {string} databaseId
         * @param {string} collectionId
         * @param {string} key
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async deleteIndex(databaseId: string, collectionId: string, key: string): Promise<{}> {
            if (typeof databaseId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "databaseId"');
            }

            if (typeof collectionId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "collectionId"');
            }

            if (typeof key === 'undefined') {
                throw new AppwriteException('Missing required parameter: "key"');
            }

            let path = '/databases/{databaseId}/collections/{collectionId}/indexes/{key}'.replace('{databaseId}', databaseId).replace('{collectionId}', collectionId).replace('{key}', key);
            let payload: Payload = {};

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('delete', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * List Collection Logs
         *
         * Get the collection activity logs list by its unique ID.
         *
         * @param {string} databaseId
         * @param {string} collectionId
         * @param {string[]} queries
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async listCollectionLogs(databaseId: string, collectionId: string, queries?: string[]): Promise<Models.LogList> {
            if (typeof databaseId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "databaseId"');
            }

            if (typeof collectionId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "collectionId"');
            }

            let path = '/databases/{databaseId}/collections/{collectionId}/logs'.replace('{databaseId}', databaseId).replace('{collectionId}', collectionId);
            let payload: Payload = {};

            if (typeof queries !== 'undefined') {
                payload['queries'] = queries;
            }

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('get', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Get usage stats for a collection
         *
         *
         * @param {string} databaseId
         * @param {string} collectionId
         * @param {string} range
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async getCollectionUsage(databaseId: string, collectionId: string, range?: string): Promise<Models.UsageCollection> {
            if (typeof databaseId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "databaseId"');
            }

            if (typeof collectionId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "collectionId"');
            }

            let path = '/databases/{databaseId}/collections/{collectionId}/usage'.replace('{databaseId}', databaseId).replace('{collectionId}', collectionId);
            let payload: Payload = {};

            if (typeof range !== 'undefined') {
                payload['range'] = range;
            }

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('get', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * List Database Logs
         *
         * Get the database activity logs list by its unique ID.
         *
         * @param {string} databaseId
         * @param {string[]} queries
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async listLogs(databaseId: string, queries?: string[]): Promise<Models.LogList> {
            if (typeof databaseId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "databaseId"');
            }

            let path = '/databases/{databaseId}/logs'.replace('{databaseId}', databaseId);
            let payload: Payload = {};

            if (typeof queries !== 'undefined') {
                payload['queries'] = queries;
            }

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('get', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Get usage stats for the database
         *
         *
         * @param {string} databaseId
         * @param {string} range
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async getDatabaseUsage(databaseId: string, range?: string): Promise<Models.UsageDatabase> {
            if (typeof databaseId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "databaseId"');
            }

            let path = '/databases/{databaseId}/usage'.replace('{databaseId}', databaseId);
            let payload: Payload = {};

            if (typeof range !== 'undefined') {
                payload['range'] = range;
            }

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('get', uri, {
                'content-type': 'application/json',
            }, payload);
        }
};
