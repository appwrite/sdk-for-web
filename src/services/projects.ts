import { Service } from '../service';
import { AppwriteException, Client } from '../client';
import type { Models } from '../models';
import type { UploadProgress, Payload } from '../client';

export class Projects extends Service {

     constructor(client: Client)
     {
        super(client);
     }

        /**
         * List Projects
         *
         *
         * @param {string[]} queries
         * @param {string} search
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async list(queries?: string[], search?: string): Promise<Models.ProjectList> {
            let path = '/projects';
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
         * Create Project
         *
         *
         * @param {string} projectId
         * @param {string} name
         * @param {string} teamId
         * @param {string} description
         * @param {string} logo
         * @param {string} url
         * @param {string} legalName
         * @param {string} legalCountry
         * @param {string} legalState
         * @param {string} legalCity
         * @param {string} legalAddress
         * @param {string} legalTaxId
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async create(projectId: string, name: string, teamId: string, description?: string, logo?: string, url?: string, legalName?: string, legalCountry?: string, legalState?: string, legalCity?: string, legalAddress?: string, legalTaxId?: string): Promise<Models.Project> {
            if (typeof projectId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "projectId"');
            }

            if (typeof name === 'undefined') {
                throw new AppwriteException('Missing required parameter: "name"');
            }

            if (typeof teamId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "teamId"');
            }

            let path = '/projects';
            let payload: Payload = {};

            if (typeof projectId !== 'undefined') {
                payload['projectId'] = projectId;
            }

            if (typeof name !== 'undefined') {
                payload['name'] = name;
            }

            if (typeof teamId !== 'undefined') {
                payload['teamId'] = teamId;
            }

            if (typeof description !== 'undefined') {
                payload['description'] = description;
            }

            if (typeof logo !== 'undefined') {
                payload['logo'] = logo;
            }

            if (typeof url !== 'undefined') {
                payload['url'] = url;
            }

            if (typeof legalName !== 'undefined') {
                payload['legalName'] = legalName;
            }

            if (typeof legalCountry !== 'undefined') {
                payload['legalCountry'] = legalCountry;
            }

            if (typeof legalState !== 'undefined') {
                payload['legalState'] = legalState;
            }

            if (typeof legalCity !== 'undefined') {
                payload['legalCity'] = legalCity;
            }

            if (typeof legalAddress !== 'undefined') {
                payload['legalAddress'] = legalAddress;
            }

            if (typeof legalTaxId !== 'undefined') {
                payload['legalTaxId'] = legalTaxId;
            }

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('post', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Get Project
         *
         *
         * @param {string} projectId
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async get(projectId: string): Promise<Models.Project> {
            if (typeof projectId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "projectId"');
            }

            let path = '/projects/{projectId}'.replace('{projectId}', projectId);
            let payload: Payload = {};

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('get', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Update Project
         *
         *
         * @param {string} projectId
         * @param {string} name
         * @param {string} description
         * @param {string} logo
         * @param {string} url
         * @param {string} legalName
         * @param {string} legalCountry
         * @param {string} legalState
         * @param {string} legalCity
         * @param {string} legalAddress
         * @param {string} legalTaxId
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async update(projectId: string, name: string, description?: string, logo?: string, url?: string, legalName?: string, legalCountry?: string, legalState?: string, legalCity?: string, legalAddress?: string, legalTaxId?: string): Promise<Models.Project> {
            if (typeof projectId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "projectId"');
            }

            if (typeof name === 'undefined') {
                throw new AppwriteException('Missing required parameter: "name"');
            }

            let path = '/projects/{projectId}'.replace('{projectId}', projectId);
            let payload: Payload = {};

            if (typeof name !== 'undefined') {
                payload['name'] = name;
            }

            if (typeof description !== 'undefined') {
                payload['description'] = description;
            }

            if (typeof logo !== 'undefined') {
                payload['logo'] = logo;
            }

            if (typeof url !== 'undefined') {
                payload['url'] = url;
            }

            if (typeof legalName !== 'undefined') {
                payload['legalName'] = legalName;
            }

            if (typeof legalCountry !== 'undefined') {
                payload['legalCountry'] = legalCountry;
            }

            if (typeof legalState !== 'undefined') {
                payload['legalState'] = legalState;
            }

            if (typeof legalCity !== 'undefined') {
                payload['legalCity'] = legalCity;
            }

            if (typeof legalAddress !== 'undefined') {
                payload['legalAddress'] = legalAddress;
            }

            if (typeof legalTaxId !== 'undefined') {
                payload['legalTaxId'] = legalTaxId;
            }

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('patch', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Delete Project
         *
         *
         * @param {string} projectId
         * @param {string} password
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async delete(projectId: string, password: string): Promise<{}> {
            if (typeof projectId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "projectId"');
            }

            if (typeof password === 'undefined') {
                throw new AppwriteException('Missing required parameter: "password"');
            }

            let path = '/projects/{projectId}'.replace('{projectId}', projectId);
            let payload: Payload = {};

            if (typeof password !== 'undefined') {
                payload['password'] = password;
            }

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('delete', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Update Project users limit
         *
         *
         * @param {string} projectId
         * @param {number} limit
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async updateAuthLimit(projectId: string, limit: number): Promise<Models.Project> {
            if (typeof projectId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "projectId"');
            }

            if (typeof limit === 'undefined') {
                throw new AppwriteException('Missing required parameter: "limit"');
            }

            let path = '/projects/{projectId}/auth/limit'.replace('{projectId}', projectId);
            let payload: Payload = {};

            if (typeof limit !== 'undefined') {
                payload['limit'] = limit;
            }

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('patch', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Update Project auth method status. Use this endpoint to enable or disable a given auth method for this project.
         *
         *
         * @param {string} projectId
         * @param {string} method
         * @param {boolean} status
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async updateAuthStatus(projectId: string, method: string, status: boolean): Promise<Models.Project> {
            if (typeof projectId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "projectId"');
            }

            if (typeof method === 'undefined') {
                throw new AppwriteException('Missing required parameter: "method"');
            }

            if (typeof status === 'undefined') {
                throw new AppwriteException('Missing required parameter: "status"');
            }

            let path = '/projects/{projectId}/auth/{method}'.replace('{projectId}', projectId).replace('{method}', method);
            let payload: Payload = {};

            if (typeof status !== 'undefined') {
                payload['status'] = status;
            }

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('patch', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * List Domains
         *
         *
         * @param {string} projectId
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async listDomains(projectId: string): Promise<Models.DomainList> {
            if (typeof projectId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "projectId"');
            }

            let path = '/projects/{projectId}/domains'.replace('{projectId}', projectId);
            let payload: Payload = {};

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('get', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Create Domain
         *
         *
         * @param {string} projectId
         * @param {string} domain
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async createDomain(projectId: string, domain: string): Promise<Models.Domain> {
            if (typeof projectId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "projectId"');
            }

            if (typeof domain === 'undefined') {
                throw new AppwriteException('Missing required parameter: "domain"');
            }

            let path = '/projects/{projectId}/domains'.replace('{projectId}', projectId);
            let payload: Payload = {};

            if (typeof domain !== 'undefined') {
                payload['domain'] = domain;
            }

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('post', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Get Domain
         *
         *
         * @param {string} projectId
         * @param {string} domainId
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async getDomain(projectId: string, domainId: string): Promise<Models.Domain> {
            if (typeof projectId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "projectId"');
            }

            if (typeof domainId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "domainId"');
            }

            let path = '/projects/{projectId}/domains/{domainId}'.replace('{projectId}', projectId).replace('{domainId}', domainId);
            let payload: Payload = {};

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('get', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Delete Domain
         *
         *
         * @param {string} projectId
         * @param {string} domainId
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async deleteDomain(projectId: string, domainId: string): Promise<{}> {
            if (typeof projectId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "projectId"');
            }

            if (typeof domainId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "domainId"');
            }

            let path = '/projects/{projectId}/domains/{domainId}'.replace('{projectId}', projectId).replace('{domainId}', domainId);
            let payload: Payload = {};

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('delete', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Update Domain Verification Status
         *
         *
         * @param {string} projectId
         * @param {string} domainId
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async updateDomainVerification(projectId: string, domainId: string): Promise<Models.Domain> {
            if (typeof projectId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "projectId"');
            }

            if (typeof domainId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "domainId"');
            }

            let path = '/projects/{projectId}/domains/{domainId}/verification'.replace('{projectId}', projectId).replace('{domainId}', domainId);
            let payload: Payload = {};

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('patch', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * List Keys
         *
         *
         * @param {string} projectId
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async listKeys(projectId: string): Promise<Models.KeyList> {
            if (typeof projectId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "projectId"');
            }

            let path = '/projects/{projectId}/keys'.replace('{projectId}', projectId);
            let payload: Payload = {};

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('get', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Create Key
         *
         *
         * @param {string} projectId
         * @param {string} name
         * @param {string[]} scopes
         * @param {string} expire
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async createKey(projectId: string, name: string, scopes: string[], expire?: string): Promise<Models.Key> {
            if (typeof projectId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "projectId"');
            }

            if (typeof name === 'undefined') {
                throw new AppwriteException('Missing required parameter: "name"');
            }

            if (typeof scopes === 'undefined') {
                throw new AppwriteException('Missing required parameter: "scopes"');
            }

            let path = '/projects/{projectId}/keys'.replace('{projectId}', projectId);
            let payload: Payload = {};

            if (typeof name !== 'undefined') {
                payload['name'] = name;
            }

            if (typeof scopes !== 'undefined') {
                payload['scopes'] = scopes;
            }

            if (typeof expire !== 'undefined') {
                payload['expire'] = expire;
            }

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('post', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Get Key
         *
         *
         * @param {string} projectId
         * @param {string} keyId
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async getKey(projectId: string, keyId: string): Promise<Models.Key> {
            if (typeof projectId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "projectId"');
            }

            if (typeof keyId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "keyId"');
            }

            let path = '/projects/{projectId}/keys/{keyId}'.replace('{projectId}', projectId).replace('{keyId}', keyId);
            let payload: Payload = {};

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('get', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Update Key
         *
         *
         * @param {string} projectId
         * @param {string} keyId
         * @param {string} name
         * @param {string[]} scopes
         * @param {string} expire
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async updateKey(projectId: string, keyId: string, name: string, scopes: string[], expire?: string): Promise<Models.Key> {
            if (typeof projectId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "projectId"');
            }

            if (typeof keyId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "keyId"');
            }

            if (typeof name === 'undefined') {
                throw new AppwriteException('Missing required parameter: "name"');
            }

            if (typeof scopes === 'undefined') {
                throw new AppwriteException('Missing required parameter: "scopes"');
            }

            let path = '/projects/{projectId}/keys/{keyId}'.replace('{projectId}', projectId).replace('{keyId}', keyId);
            let payload: Payload = {};

            if (typeof name !== 'undefined') {
                payload['name'] = name;
            }

            if (typeof scopes !== 'undefined') {
                payload['scopes'] = scopes;
            }

            if (typeof expire !== 'undefined') {
                payload['expire'] = expire;
            }

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('put', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Delete Key
         *
         *
         * @param {string} projectId
         * @param {string} keyId
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async deleteKey(projectId: string, keyId: string): Promise<{}> {
            if (typeof projectId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "projectId"');
            }

            if (typeof keyId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "keyId"');
            }

            let path = '/projects/{projectId}/keys/{keyId}'.replace('{projectId}', projectId).replace('{keyId}', keyId);
            let payload: Payload = {};

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('delete', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Update Project OAuth2
         *
         *
         * @param {string} projectId
         * @param {string} provider
         * @param {string} appId
         * @param {string} secret
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async updateOAuth2(projectId: string, provider: string, appId?: string, secret?: string): Promise<Models.Project> {
            if (typeof projectId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "projectId"');
            }

            if (typeof provider === 'undefined') {
                throw new AppwriteException('Missing required parameter: "provider"');
            }

            let path = '/projects/{projectId}/oauth2'.replace('{projectId}', projectId);
            let payload: Payload = {};

            if (typeof provider !== 'undefined') {
                payload['provider'] = provider;
            }

            if (typeof appId !== 'undefined') {
                payload['appId'] = appId;
            }

            if (typeof secret !== 'undefined') {
                payload['secret'] = secret;
            }

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('patch', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * List Platforms
         *
         *
         * @param {string} projectId
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async listPlatforms(projectId: string): Promise<Models.PlatformList> {
            if (typeof projectId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "projectId"');
            }

            let path = '/projects/{projectId}/platforms'.replace('{projectId}', projectId);
            let payload: Payload = {};

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('get', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Create Platform
         *
         *
         * @param {string} projectId
         * @param {string} type
         * @param {string} name
         * @param {string} key
         * @param {string} store
         * @param {string} hostname
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async createPlatform(projectId: string, type: string, name: string, key?: string, store?: string, hostname?: string): Promise<Models.Platform> {
            if (typeof projectId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "projectId"');
            }

            if (typeof type === 'undefined') {
                throw new AppwriteException('Missing required parameter: "type"');
            }

            if (typeof name === 'undefined') {
                throw new AppwriteException('Missing required parameter: "name"');
            }

            let path = '/projects/{projectId}/platforms'.replace('{projectId}', projectId);
            let payload: Payload = {};

            if (typeof type !== 'undefined') {
                payload['type'] = type;
            }

            if (typeof name !== 'undefined') {
                payload['name'] = name;
            }

            if (typeof key !== 'undefined') {
                payload['key'] = key;
            }

            if (typeof store !== 'undefined') {
                payload['store'] = store;
            }

            if (typeof hostname !== 'undefined') {
                payload['hostname'] = hostname;
            }

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('post', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Get Platform
         *
         *
         * @param {string} projectId
         * @param {string} platformId
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async getPlatform(projectId: string, platformId: string): Promise<Models.Platform> {
            if (typeof projectId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "projectId"');
            }

            if (typeof platformId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "platformId"');
            }

            let path = '/projects/{projectId}/platforms/{platformId}'.replace('{projectId}', projectId).replace('{platformId}', platformId);
            let payload: Payload = {};

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('get', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Update Platform
         *
         *
         * @param {string} projectId
         * @param {string} platformId
         * @param {string} name
         * @param {string} key
         * @param {string} store
         * @param {string} hostname
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async updatePlatform(projectId: string, platformId: string, name: string, key?: string, store?: string, hostname?: string): Promise<Models.Platform> {
            if (typeof projectId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "projectId"');
            }

            if (typeof platformId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "platformId"');
            }

            if (typeof name === 'undefined') {
                throw new AppwriteException('Missing required parameter: "name"');
            }

            let path = '/projects/{projectId}/platforms/{platformId}'.replace('{projectId}', projectId).replace('{platformId}', platformId);
            let payload: Payload = {};

            if (typeof name !== 'undefined') {
                payload['name'] = name;
            }

            if (typeof key !== 'undefined') {
                payload['key'] = key;
            }

            if (typeof store !== 'undefined') {
                payload['store'] = store;
            }

            if (typeof hostname !== 'undefined') {
                payload['hostname'] = hostname;
            }

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('put', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Delete Platform
         *
         *
         * @param {string} projectId
         * @param {string} platformId
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async deletePlatform(projectId: string, platformId: string): Promise<{}> {
            if (typeof projectId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "projectId"');
            }

            if (typeof platformId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "platformId"');
            }

            let path = '/projects/{projectId}/platforms/{platformId}'.replace('{projectId}', projectId).replace('{platformId}', platformId);
            let payload: Payload = {};

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('delete', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Update service status
         *
         *
         * @param {string} projectId
         * @param {string} service
         * @param {boolean} status
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async updateServiceStatus(projectId: string, service: string, status: boolean): Promise<Models.Project> {
            if (typeof projectId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "projectId"');
            }

            if (typeof service === 'undefined') {
                throw new AppwriteException('Missing required parameter: "service"');
            }

            if (typeof status === 'undefined') {
                throw new AppwriteException('Missing required parameter: "status"');
            }

            let path = '/projects/{projectId}/service'.replace('{projectId}', projectId);
            let payload: Payload = {};

            if (typeof service !== 'undefined') {
                payload['service'] = service;
            }

            if (typeof status !== 'undefined') {
                payload['status'] = status;
            }

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('patch', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Get usage stats for a project
         *
         *
         * @param {string} projectId
         * @param {string} range
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async getUsage(projectId: string, range?: string): Promise<Models.UsageProject> {
            if (typeof projectId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "projectId"');
            }

            let path = '/projects/{projectId}/usage'.replace('{projectId}', projectId);
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
         * List Webhooks
         *
         *
         * @param {string} projectId
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async listWebhooks(projectId: string): Promise<Models.WebhookList> {
            if (typeof projectId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "projectId"');
            }

            let path = '/projects/{projectId}/webhooks'.replace('{projectId}', projectId);
            let payload: Payload = {};

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('get', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Create Webhook
         *
         *
         * @param {string} projectId
         * @param {string} name
         * @param {string[]} events
         * @param {string} url
         * @param {boolean} security
         * @param {string} httpUser
         * @param {string} httpPass
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async createWebhook(projectId: string, name: string, events: string[], url: string, security: boolean, httpUser?: string, httpPass?: string): Promise<Models.Webhook> {
            if (typeof projectId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "projectId"');
            }

            if (typeof name === 'undefined') {
                throw new AppwriteException('Missing required parameter: "name"');
            }

            if (typeof events === 'undefined') {
                throw new AppwriteException('Missing required parameter: "events"');
            }

            if (typeof url === 'undefined') {
                throw new AppwriteException('Missing required parameter: "url"');
            }

            if (typeof security === 'undefined') {
                throw new AppwriteException('Missing required parameter: "security"');
            }

            let path = '/projects/{projectId}/webhooks'.replace('{projectId}', projectId);
            let payload: Payload = {};

            if (typeof name !== 'undefined') {
                payload['name'] = name;
            }

            if (typeof events !== 'undefined') {
                payload['events'] = events;
            }

            if (typeof url !== 'undefined') {
                payload['url'] = url;
            }

            if (typeof security !== 'undefined') {
                payload['security'] = security;
            }

            if (typeof httpUser !== 'undefined') {
                payload['httpUser'] = httpUser;
            }

            if (typeof httpPass !== 'undefined') {
                payload['httpPass'] = httpPass;
            }

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('post', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Get Webhook
         *
         *
         * @param {string} projectId
         * @param {string} webhookId
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async getWebhook(projectId: string, webhookId: string): Promise<Models.Webhook> {
            if (typeof projectId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "projectId"');
            }

            if (typeof webhookId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "webhookId"');
            }

            let path = '/projects/{projectId}/webhooks/{webhookId}'.replace('{projectId}', projectId).replace('{webhookId}', webhookId);
            let payload: Payload = {};

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('get', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Update Webhook
         *
         *
         * @param {string} projectId
         * @param {string} webhookId
         * @param {string} name
         * @param {string[]} events
         * @param {string} url
         * @param {boolean} security
         * @param {string} httpUser
         * @param {string} httpPass
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async updateWebhook(projectId: string, webhookId: string, name: string, events: string[], url: string, security: boolean, httpUser?: string, httpPass?: string): Promise<Models.Webhook> {
            if (typeof projectId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "projectId"');
            }

            if (typeof webhookId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "webhookId"');
            }

            if (typeof name === 'undefined') {
                throw new AppwriteException('Missing required parameter: "name"');
            }

            if (typeof events === 'undefined') {
                throw new AppwriteException('Missing required parameter: "events"');
            }

            if (typeof url === 'undefined') {
                throw new AppwriteException('Missing required parameter: "url"');
            }

            if (typeof security === 'undefined') {
                throw new AppwriteException('Missing required parameter: "security"');
            }

            let path = '/projects/{projectId}/webhooks/{webhookId}'.replace('{projectId}', projectId).replace('{webhookId}', webhookId);
            let payload: Payload = {};

            if (typeof name !== 'undefined') {
                payload['name'] = name;
            }

            if (typeof events !== 'undefined') {
                payload['events'] = events;
            }

            if (typeof url !== 'undefined') {
                payload['url'] = url;
            }

            if (typeof security !== 'undefined') {
                payload['security'] = security;
            }

            if (typeof httpUser !== 'undefined') {
                payload['httpUser'] = httpUser;
            }

            if (typeof httpPass !== 'undefined') {
                payload['httpPass'] = httpPass;
            }

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('put', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Delete Webhook
         *
         *
         * @param {string} projectId
         * @param {string} webhookId
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async deleteWebhook(projectId: string, webhookId: string): Promise<{}> {
            if (typeof projectId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "projectId"');
            }

            if (typeof webhookId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "webhookId"');
            }

            let path = '/projects/{projectId}/webhooks/{webhookId}'.replace('{projectId}', projectId).replace('{webhookId}', webhookId);
            let payload: Payload = {};

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('delete', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Update Webhook Signature Key
         *
         *
         * @param {string} projectId
         * @param {string} webhookId
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async updateWebhookSignature(projectId: string, webhookId: string): Promise<Models.Webhook> {
            if (typeof projectId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "projectId"');
            }

            if (typeof webhookId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "webhookId"');
            }

            let path = '/projects/{projectId}/webhooks/{webhookId}/signature'.replace('{projectId}', projectId).replace('{webhookId}', webhookId);
            let payload: Payload = {};

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('patch', uri, {
                'content-type': 'application/json',
            }, payload);
        }
};
