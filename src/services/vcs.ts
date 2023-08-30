import { Service } from '../service';
import { AppwriteException, Client } from '../client';
import type { Models } from '../models';
import type { UploadProgress, Payload } from '../client';

export class Vcs extends Service {

     constructor(client: Client)
     {
        super(client);
     }

    /**
     * List Repositories
     *
     *
     * @param {string} installationId
     * @param {string} search
     * @throws {AppwriteException}
     * @returns {Promise}
    */
    async listRepositories(installationId: string, search?: string): Promise<Models.ProviderRepositoryList> {
        if (typeof installationId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "installationId"');
        }

        const apiPath = '/vcs/github/installations/{installationId}/providerRepositories'.replace('{installationId}', installationId);
        const payload: Payload = {};

        if (typeof search !== 'undefined') {
            payload['search'] = search;
        }

        const uri = new URL(this.client.config.endpoint + apiPath);
        return await this.client.call('get', uri, {
            'content-type': 'application/json',
        }, payload);
    }

    /**
     * Create repository
     *
     *
     * @param {string} installationId
     * @param {string} name
     * @param {boolean} xprivate
     * @throws {AppwriteException}
     * @returns {Promise}
    */
    async createRepository(installationId: string, name: string, xprivate: boolean): Promise<Models.ProviderRepository> {
        if (typeof installationId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "installationId"');
        }

        if (typeof name === 'undefined') {
            throw new AppwriteException('Missing required parameter: "name"');
        }

        if (typeof xprivate === 'undefined') {
            throw new AppwriteException('Missing required parameter: "xprivate"');
        }

        const apiPath = '/vcs/github/installations/{installationId}/providerRepositories'.replace('{installationId}', installationId);
        const payload: Payload = {};

        if (typeof name !== 'undefined') {
            payload['name'] = name;
        }

        if (typeof xprivate !== 'undefined') {
            payload['private'] = xprivate;
        }

        const uri = new URL(this.client.config.endpoint + apiPath);
        return await this.client.call('post', uri, {
            'content-type': 'application/json',
        }, payload);
    }

    /**
     * Get repository
     *
     *
     * @param {string} installationId
     * @param {string} providerRepositoryId
     * @throws {AppwriteException}
     * @returns {Promise}
    */
    async getRepository(installationId: string, providerRepositoryId: string): Promise<Models.ProviderRepository> {
        if (typeof installationId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "installationId"');
        }

        if (typeof providerRepositoryId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "providerRepositoryId"');
        }

        const apiPath = '/vcs/github/installations/{installationId}/providerRepositories/{providerRepositoryId}'.replace('{installationId}', installationId).replace('{providerRepositoryId}', providerRepositoryId);
        const payload: Payload = {};

        const uri = new URL(this.client.config.endpoint + apiPath);
        return await this.client.call('get', uri, {
            'content-type': 'application/json',
        }, payload);
    }

    /**
     * List Repository Branches
     *
     *
     * @param {string} installationId
     * @param {string} providerRepositoryId
     * @throws {AppwriteException}
     * @returns {Promise}
    */
    async listRepositoryBranches(installationId: string, providerRepositoryId: string): Promise<Models.BranchList> {
        if (typeof installationId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "installationId"');
        }

        if (typeof providerRepositoryId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "providerRepositoryId"');
        }

        const apiPath = '/vcs/github/installations/{installationId}/providerRepositories/{providerRepositoryId}/branches'.replace('{installationId}', installationId).replace('{providerRepositoryId}', providerRepositoryId);
        const payload: Payload = {};

        const uri = new URL(this.client.config.endpoint + apiPath);
        return await this.client.call('get', uri, {
            'content-type': 'application/json',
        }, payload);
    }

    /**
     * Detect runtime settings from source code
     *
     *
     * @param {string} installationId
     * @param {string} providerRepositoryId
     * @param {string} providerRootDirectory
     * @throws {AppwriteException}
     * @returns {Promise}
    */
    async createRepositoryDetection(installationId: string, providerRepositoryId: string, providerRootDirectory?: string): Promise<Models.Detection> {
        if (typeof installationId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "installationId"');
        }

        if (typeof providerRepositoryId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "providerRepositoryId"');
        }

        const apiPath = '/vcs/github/installations/{installationId}/providerRepositories/{providerRepositoryId}/detection'.replace('{installationId}', installationId).replace('{providerRepositoryId}', providerRepositoryId);
        const payload: Payload = {};

        if (typeof providerRootDirectory !== 'undefined') {
            payload['providerRootDirectory'] = providerRootDirectory;
        }

        const uri = new URL(this.client.config.endpoint + apiPath);
        return await this.client.call('post', uri, {
            'content-type': 'application/json',
        }, payload);
    }

    /**
     * Authorize external deployment
     *
     *
     * @param {string} installationId
     * @param {string} repositoryId
     * @param {string} providerPullRequestId
     * @throws {AppwriteException}
     * @returns {Promise}
    */
    async updateExternalDeployments(installationId: string, repositoryId: string, providerPullRequestId: string): Promise<{}> {
        if (typeof installationId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "installationId"');
        }

        if (typeof repositoryId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "repositoryId"');
        }

        if (typeof providerPullRequestId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "providerPullRequestId"');
        }

        const apiPath = '/vcs/github/installations/{installationId}/repositories/{repositoryId}'.replace('{installationId}', installationId).replace('{repositoryId}', repositoryId);
        const payload: Payload = {};

        if (typeof providerPullRequestId !== 'undefined') {
            payload['providerPullRequestId'] = providerPullRequestId;
        }

        const uri = new URL(this.client.config.endpoint + apiPath);
        return await this.client.call('patch', uri, {
            'content-type': 'application/json',
        }, payload);
    }
};
