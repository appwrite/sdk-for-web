import { Service } from '../service';
import { AppwriteException, Client } from '../client';
import type { Models } from '../models';
import type { UploadProgress, Payload } from '../client';
import { Query } from '../query';
import { AuthenticatorProvider } from '../enums/authenticator-provider';

export class Users extends Service {

     constructor(client: Client)
     {
        super(client);
     }

    /**
     * Delete Authenticator
     *
     *
     * @param {string} userId
     * @param {AuthenticatorProvider} provider
     * @param {string} otp
     * @throws {AppwriteException}
     * @returns {Promise}
    */
    async deleteAuthenticator<Preferences extends Models.Preferences>(userId: string, provider: AuthenticatorProvider, otp: string): Promise<Models.User<Preferences>> {
        if (typeof userId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "userId"');
        }

        if (typeof provider === 'undefined') {
            throw new AppwriteException('Missing required parameter: "provider"');
        }

        if (typeof otp === 'undefined') {
            throw new AppwriteException('Missing required parameter: "otp"');
        }

        const apiPath = '/users/{userId}/mfa/{provider}'.replace('{userId}', userId).replace('{provider}', provider);
        const payload: Payload = {};

        if (typeof otp !== 'undefined') {
            payload['otp'] = otp;
        }

        const uri = new URL(this.client.config.endpoint + apiPath);
        return await this.client.call('delete', uri, {
            'content-type': 'application/json',
        }, payload);
    }

    /**
     * List Providers
     *
     *
     * @param {string} userId
     * @throws {AppwriteException}
     * @returns {Promise}
    */
    async listProviders(userId: string): Promise<Models.MfaProviders> {
        if (typeof userId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "userId"');
        }

        const apiPath = '/users/{userId}/providers'.replace('{userId}', userId);
        const payload: Payload = {};

        const uri = new URL(this.client.config.endpoint + apiPath);
        return await this.client.call('get', uri, {
            'content-type': 'application/json',
        }, payload);
    }
};
