import { Service } from '../service';
import { Client } from '../client';
import type { Models } from '../models';
export declare class Projects extends Service {
    constructor(client: Client);
    /**
     * List Projects
     *
     *
     * @param {string[]} queries
     * @param {string} search
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    list(queries?: string[], search?: string): Promise<Models.ProjectList>;
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
    create(projectId: string, name: string, teamId: string, description?: string, logo?: string, url?: string, legalName?: string, legalCountry?: string, legalState?: string, legalCity?: string, legalAddress?: string, legalTaxId?: string): Promise<Models.Project>;
    /**
     * Get Project
     *
     *
     * @param {string} projectId
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    get(projectId: string): Promise<Models.Project>;
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
    update(projectId: string, name: string, description?: string, logo?: string, url?: string, legalName?: string, legalCountry?: string, legalState?: string, legalCity?: string, legalAddress?: string, legalTaxId?: string): Promise<Models.Project>;
    /**
     * Delete Project
     *
     *
     * @param {string} projectId
     * @param {string} password
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    delete(projectId: string, password: string): Promise<{}>;
    /**
     * Update Project users limit
     *
     *
     * @param {string} projectId
     * @param {number} limit
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    updateAuthLimit(projectId: string, limit: number): Promise<Models.Project>;
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
    updateAuthStatus(projectId: string, method: string, status: boolean): Promise<Models.Project>;
    /**
     * List Domains
     *
     *
     * @param {string} projectId
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    listDomains(projectId: string): Promise<Models.DomainList>;
    /**
     * Create Domain
     *
     *
     * @param {string} projectId
     * @param {string} domain
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    createDomain(projectId: string, domain: string): Promise<Models.Domain>;
    /**
     * Get Domain
     *
     *
     * @param {string} projectId
     * @param {string} domainId
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    getDomain(projectId: string, domainId: string): Promise<Models.Domain>;
    /**
     * Delete Domain
     *
     *
     * @param {string} projectId
     * @param {string} domainId
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    deleteDomain(projectId: string, domainId: string): Promise<{}>;
    /**
     * Update Domain Verification Status
     *
     *
     * @param {string} projectId
     * @param {string} domainId
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    updateDomainVerification(projectId: string, domainId: string): Promise<Models.Domain>;
    /**
     * List Keys
     *
     *
     * @param {string} projectId
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    listKeys(projectId: string): Promise<Models.KeyList>;
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
    createKey(projectId: string, name: string, scopes: string[], expire?: string): Promise<Models.Key>;
    /**
     * Get Key
     *
     *
     * @param {string} projectId
     * @param {string} keyId
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    getKey(projectId: string, keyId: string): Promise<Models.Key>;
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
    updateKey(projectId: string, keyId: string, name: string, scopes: string[], expire?: string): Promise<Models.Key>;
    /**
     * Delete Key
     *
     *
     * @param {string} projectId
     * @param {string} keyId
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    deleteKey(projectId: string, keyId: string): Promise<{}>;
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
    updateOAuth2(projectId: string, provider: string, appId?: string, secret?: string): Promise<Models.Project>;
    /**
     * List Platforms
     *
     *
     * @param {string} projectId
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    listPlatforms(projectId: string): Promise<Models.PlatformList>;
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
    createPlatform(projectId: string, type: string, name: string, key?: string, store?: string, hostname?: string): Promise<Models.Platform>;
    /**
     * Get Platform
     *
     *
     * @param {string} projectId
     * @param {string} platformId
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    getPlatform(projectId: string, platformId: string): Promise<Models.Platform>;
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
    updatePlatform(projectId: string, platformId: string, name: string, key?: string, store?: string, hostname?: string): Promise<Models.Platform>;
    /**
     * Delete Platform
     *
     *
     * @param {string} projectId
     * @param {string} platformId
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    deletePlatform(projectId: string, platformId: string): Promise<{}>;
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
    updateServiceStatus(projectId: string, service: string, status: boolean): Promise<Models.Project>;
    /**
     * Get usage stats for a project
     *
     *
     * @param {string} projectId
     * @param {string} range
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    getUsage(projectId: string, range?: string): Promise<Models.UsageProject>;
    /**
     * List Webhooks
     *
     *
     * @param {string} projectId
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    listWebhooks(projectId: string): Promise<Models.WebhookList>;
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
    createWebhook(projectId: string, name: string, events: string[], url: string, security: boolean, httpUser?: string, httpPass?: string): Promise<Models.Webhook>;
    /**
     * Get Webhook
     *
     *
     * @param {string} projectId
     * @param {string} webhookId
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    getWebhook(projectId: string, webhookId: string): Promise<Models.Webhook>;
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
    updateWebhook(projectId: string, webhookId: string, name: string, events: string[], url: string, security: boolean, httpUser?: string, httpPass?: string): Promise<Models.Webhook>;
    /**
     * Delete Webhook
     *
     *
     * @param {string} projectId
     * @param {string} webhookId
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    deleteWebhook(projectId: string, webhookId: string): Promise<{}>;
    /**
     * Update Webhook Signature Key
     *
     *
     * @param {string} projectId
     * @param {string} webhookId
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    updateWebhookSignature(projectId: string, webhookId: string): Promise<Models.Webhook>;
}
