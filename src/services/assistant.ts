import { Service } from '../service';
import { AppwriteException, Client } from '../client';
import type { Models } from '../models';
import type { UploadProgress, Payload } from '../client';

export class Assistant extends Service {

     constructor(client: Client)
     {
        super(client);
     }

    /**
     * Ask Query
     *
     *
     * @param {string} prompt
     * @throws {AppwriteException}
     * @returns {Promise}
    */
    async chat(prompt: string): Promise<{}> {
        if (typeof prompt === 'undefined') {
            throw new AppwriteException('Missing required parameter: "prompt"');
        }

        const apiPath = '/console/assistant';
        const payload: Payload = {};

        if (typeof prompt !== 'undefined') {
            payload['prompt'] = prompt;
        }

        const uri = new URL(this.client.config.endpoint + apiPath);
        return await this.client.call('post', uri, {
            'content-type': 'application/json',
        }, payload);
    }
};
