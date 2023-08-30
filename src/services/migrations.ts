import { Service } from '../service';
import { AppwriteException, Client } from '../client';
import type { Models } from '../models';
import type { UploadProgress, Payload } from '../client';

export class Migrations extends Service {

     constructor(client: Client)
     {
        super(client);
     }

    /**
     * Revoke Appwrite&#039;s authorization to access Firebase Projects
     *
     *
     * @throws {AppwriteException}
     * @returns {Promise}
    */
    async deleteFirebaseAuth(): Promise<{}> {
        const apiPath = '/migrations/firebase/deauthorize';
        const payload: Payload = {};

        const uri = new URL(this.client.config.endpoint + apiPath);
        return await this.client.call('get', uri, {
            'content-type': 'application/json',
        }, payload);
    }

    /**
     * List Firebase Projects
     *
     *
     * @throws {AppwriteException}
     * @returns {Promise}
    */
    async listFirebaseProjects(): Promise<Models.FirebaseProjectList> {
        const apiPath = '/migrations/firebase/projects';
        const payload: Payload = {};

        const uri = new URL(this.client.config.endpoint + apiPath);
        return await this.client.call('get', uri, {
            'content-type': 'application/json',
        }, payload);
    }
};
