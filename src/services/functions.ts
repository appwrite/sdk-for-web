import { Service } from '../service';
import { AppwriteException, Client } from '../client';
import type { Models } from '../models';
import type { UploadProgress, Payload } from '../client';

export class Functions extends Service {

     constructor(client: Client)
     {
        super(client);
     }

        /**
         * List Functions
         *
         * Get a list of all the project's functions. You can use the query params to
         * filter your results.
         *
         * @param {string[]} queries
         * @param {string} search
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async list(queries?: string[], search?: string): Promise<Models.FunctionList> {
            let path = '/functions';
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
         * Create Function
         *
         * Create a new function. You can pass a list of
         * [permissions](/docs/permissions) to allow different project users or team
         * with access to execute the function using the client API.
         *
         * @param {string} functionId
         * @param {string} name
         * @param {string[]} execute
         * @param {string} runtime
         * @param {string[]} events
         * @param {string} schedule
         * @param {number} timeout
         * @param {boolean} enabled
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async create(functionId: string, name: string, execute: string[], runtime: string, events?: string[], schedule?: string, timeout?: number, enabled?: boolean): Promise<Models.Function> {
            if (typeof functionId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "functionId"');
            }

            if (typeof name === 'undefined') {
                throw new AppwriteException('Missing required parameter: "name"');
            }

            if (typeof execute === 'undefined') {
                throw new AppwriteException('Missing required parameter: "execute"');
            }

            if (typeof runtime === 'undefined') {
                throw new AppwriteException('Missing required parameter: "runtime"');
            }

            let path = '/functions';
            let payload: Payload = {};

            if (typeof functionId !== 'undefined') {
                payload['functionId'] = functionId;
            }

            if (typeof name !== 'undefined') {
                payload['name'] = name;
            }

            if (typeof execute !== 'undefined') {
                payload['execute'] = execute;
            }

            if (typeof runtime !== 'undefined') {
                payload['runtime'] = runtime;
            }

            if (typeof events !== 'undefined') {
                payload['events'] = events;
            }

            if (typeof schedule !== 'undefined') {
                payload['schedule'] = schedule;
            }

            if (typeof timeout !== 'undefined') {
                payload['timeout'] = timeout;
            }

            if (typeof enabled !== 'undefined') {
                payload['enabled'] = enabled;
            }

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('post', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * List runtimes
         *
         * Get a list of all runtimes that are currently active on your instance.
         *
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async listRuntimes(): Promise<Models.RuntimeList> {
            let path = '/functions/runtimes';
            let payload: Payload = {};

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('get', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Get Functions Usage
         *
         *
         * @param {string} range
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async getUsage(range?: string): Promise<Models.UsageFunctions> {
            let path = '/functions/usage';
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
         * Get Function
         *
         * Get a function by its unique ID.
         *
         * @param {string} functionId
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async get(functionId: string): Promise<Models.Function> {
            if (typeof functionId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "functionId"');
            }

            let path = '/functions/{functionId}'.replace('{functionId}', functionId);
            let payload: Payload = {};

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('get', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Update Function
         *
         * Update function by its unique ID.
         *
         * @param {string} functionId
         * @param {string} name
         * @param {string[]} execute
         * @param {string[]} events
         * @param {string} schedule
         * @param {number} timeout
         * @param {boolean} enabled
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async update(functionId: string, name: string, execute: string[], events?: string[], schedule?: string, timeout?: number, enabled?: boolean): Promise<Models.Function> {
            if (typeof functionId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "functionId"');
            }

            if (typeof name === 'undefined') {
                throw new AppwriteException('Missing required parameter: "name"');
            }

            if (typeof execute === 'undefined') {
                throw new AppwriteException('Missing required parameter: "execute"');
            }

            let path = '/functions/{functionId}'.replace('{functionId}', functionId);
            let payload: Payload = {};

            if (typeof name !== 'undefined') {
                payload['name'] = name;
            }

            if (typeof execute !== 'undefined') {
                payload['execute'] = execute;
            }

            if (typeof events !== 'undefined') {
                payload['events'] = events;
            }

            if (typeof schedule !== 'undefined') {
                payload['schedule'] = schedule;
            }

            if (typeof timeout !== 'undefined') {
                payload['timeout'] = timeout;
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
         * Delete Function
         *
         * Delete a function by its unique ID.
         *
         * @param {string} functionId
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async delete(functionId: string): Promise<{}> {
            if (typeof functionId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "functionId"');
            }

            let path = '/functions/{functionId}'.replace('{functionId}', functionId);
            let payload: Payload = {};

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('delete', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * List Deployments
         *
         * Get a list of all the project's code deployments. You can use the query
         * params to filter your results.
         *
         * @param {string} functionId
         * @param {string[]} queries
         * @param {string} search
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async listDeployments(functionId: string, queries?: string[], search?: string): Promise<Models.DeploymentList> {
            if (typeof functionId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "functionId"');
            }

            let path = '/functions/{functionId}/deployments'.replace('{functionId}', functionId);
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
         * Create Deployment
         *
         * Create a new function code deployment. Use this endpoint to upload a new
         * version of your code function. To execute your newly uploaded code, you'll
         * need to update the function's deployment to use your new deployment UID.
         * 
         * This endpoint accepts a tar.gz file compressed with your code. Make sure to
         * include any dependencies your code has within the compressed file. You can
         * learn more about code packaging in the [Appwrite Cloud Functions
         * tutorial](/docs/functions).
         * 
         * Use the "command" param to set the entry point used to execute your code.
         *
         * @param {string} functionId
         * @param {string} entrypoint
         * @param {File} code
         * @param {boolean} activate
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async createDeployment(functionId: string, entrypoint: string, code: File, activate: boolean, onProgress = (progress: UploadProgress) => {}): Promise<Models.Deployment> {
            if (typeof functionId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "functionId"');
            }

            if (typeof entrypoint === 'undefined') {
                throw new AppwriteException('Missing required parameter: "entrypoint"');
            }

            if (typeof code === 'undefined') {
                throw new AppwriteException('Missing required parameter: "code"');
            }

            if (typeof activate === 'undefined') {
                throw new AppwriteException('Missing required parameter: "activate"');
            }

            let path = '/functions/{functionId}/deployments'.replace('{functionId}', functionId);
            let payload: Payload = {};

            if (typeof entrypoint !== 'undefined') {
                payload['entrypoint'] = entrypoint;
            }

            if (typeof code !== 'undefined') {
                payload['code'] = code;
            }

            if (typeof activate !== 'undefined') {
                payload['activate'] = activate;
            }

            const uri = new URL(this.client.config.endpoint + path);

            if(!(code instanceof File)) {
                throw new AppwriteException('Parameter "code" has to be a File.');
            }

            const size = code.size;

            if (size <= Service.CHUNK_SIZE) {
                return await this.client.call('post', uri, {

                    'content-type': 'multipart/form-data',
                }, payload);
            }
            let id = undefined;
            let response = undefined;

            const headers: { [header: string]: string } = {
                'content-type': 'multipart/form-data',
            }

            let counter = 0;
            const totalCounters = Math.ceil(size / Service.CHUNK_SIZE);

            for (counter; counter < totalCounters; counter++) {
                const start = (counter * Service.CHUNK_SIZE);
                const end = Math.min((((counter * Service.CHUNK_SIZE) + Service.CHUNK_SIZE) - 1), size);

                headers['content-range'] = 'bytes ' + start + '-' + end + '/' + size

                if (id) {
                    headers['x-appwrite-id'] = id;
                }

                const stream = code.slice(start, end + 1);
                payload['code'] = new File([stream], code.name);

                response = await this.client.call('post', uri, headers, payload);

                if (!id) {
                    id = response['$id'];
                }

                if (onProgress) {
                    onProgress({
                        $id: response.$id,
                        progress: Math.min((counter + 1) * Service.CHUNK_SIZE - 1, size) / size * 100,
                        sizeUploaded: end,
                        chunksTotal: response.chunksTotal,
                        chunksUploaded: response.chunksUploaded
                    });
                }
            }

            return response;
        }

        /**
         * Get Deployment
         *
         * Get a code deployment by its unique ID.
         *
         * @param {string} functionId
         * @param {string} deploymentId
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async getDeployment(functionId: string, deploymentId: string): Promise<Models.Deployment> {
            if (typeof functionId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "functionId"');
            }

            if (typeof deploymentId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "deploymentId"');
            }

            let path = '/functions/{functionId}/deployments/{deploymentId}'.replace('{functionId}', functionId).replace('{deploymentId}', deploymentId);
            let payload: Payload = {};

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('get', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Update Function Deployment
         *
         * Update the function code deployment ID using the unique function ID. Use
         * this endpoint to switch the code deployment that should be executed by the
         * execution endpoint.
         *
         * @param {string} functionId
         * @param {string} deploymentId
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async updateDeployment(functionId: string, deploymentId: string): Promise<Models.Function> {
            if (typeof functionId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "functionId"');
            }

            if (typeof deploymentId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "deploymentId"');
            }

            let path = '/functions/{functionId}/deployments/{deploymentId}'.replace('{functionId}', functionId).replace('{deploymentId}', deploymentId);
            let payload: Payload = {};

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('patch', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Delete Deployment
         *
         * Delete a code deployment by its unique ID.
         *
         * @param {string} functionId
         * @param {string} deploymentId
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async deleteDeployment(functionId: string, deploymentId: string): Promise<{}> {
            if (typeof functionId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "functionId"');
            }

            if (typeof deploymentId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "deploymentId"');
            }

            let path = '/functions/{functionId}/deployments/{deploymentId}'.replace('{functionId}', functionId).replace('{deploymentId}', deploymentId);
            let payload: Payload = {};

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('delete', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Retry Build
         *
         *
         * @param {string} functionId
         * @param {string} deploymentId
         * @param {string} buildId
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async retryBuild(functionId: string, deploymentId: string, buildId: string): Promise<{}> {
            if (typeof functionId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "functionId"');
            }

            if (typeof deploymentId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "deploymentId"');
            }

            if (typeof buildId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "buildId"');
            }

            let path = '/functions/{functionId}/deployments/{deploymentId}/builds/{buildId}'.replace('{functionId}', functionId).replace('{deploymentId}', deploymentId).replace('{buildId}', buildId);
            let payload: Payload = {};

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('post', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * List Executions
         *
         * Get a list of all the current user function execution logs. You can use the
         * query params to filter your results. On admin mode, this endpoint will
         * return a list of all of the project's executions. [Learn more about
         * different API modes](/docs/admin).
         *
         * @param {string} functionId
         * @param {string[]} queries
         * @param {string} search
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async listExecutions(functionId: string, queries?: string[], search?: string): Promise<Models.ExecutionList> {
            if (typeof functionId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "functionId"');
            }

            let path = '/functions/{functionId}/executions'.replace('{functionId}', functionId);
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
         * Create Execution
         *
         * Trigger a function execution. The returned object will return you the
         * current execution status. You can ping the `Get Execution` endpoint to get
         * updates on the current execution status. Once this endpoint is called, your
         * function execution process will start asynchronously.
         *
         * @param {string} functionId
         * @param {string} data
         * @param {boolean} async
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async createExecution(functionId: string, data?: string, async?: boolean): Promise<Models.Execution> {
            if (typeof functionId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "functionId"');
            }

            let path = '/functions/{functionId}/executions'.replace('{functionId}', functionId);
            let payload: Payload = {};

            if (typeof data !== 'undefined') {
                payload['data'] = data;
            }

            if (typeof async !== 'undefined') {
                payload['async'] = async;
            }

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('post', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Get Execution
         *
         * Get a function execution log by its unique ID.
         *
         * @param {string} functionId
         * @param {string} executionId
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async getExecution(functionId: string, executionId: string): Promise<Models.Execution> {
            if (typeof functionId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "functionId"');
            }

            if (typeof executionId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "executionId"');
            }

            let path = '/functions/{functionId}/executions/{executionId}'.replace('{functionId}', functionId).replace('{executionId}', executionId);
            let payload: Payload = {};

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('get', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Get Function Usage
         *
         *
         * @param {string} functionId
         * @param {string} range
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async getFunctionUsage(functionId: string, range?: string): Promise<Models.UsageFunctions> {
            if (typeof functionId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "functionId"');
            }

            let path = '/functions/{functionId}/usage'.replace('{functionId}', functionId);
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
         * List Variables
         *
         * Get a list of all variables of a specific function.
         *
         * @param {string} functionId
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async listVariables(functionId: string): Promise<Models.VariableList> {
            if (typeof functionId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "functionId"');
            }

            let path = '/functions/{functionId}/variables'.replace('{functionId}', functionId);
            let payload: Payload = {};

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('get', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Create Variable
         *
         * Create a new function variable. These variables can be accessed within
         * function in the `env` object under the request variable.
         *
         * @param {string} functionId
         * @param {string} key
         * @param {string} value
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async createVariable(functionId: string, key: string, value: string): Promise<Models.Variable> {
            if (typeof functionId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "functionId"');
            }

            if (typeof key === 'undefined') {
                throw new AppwriteException('Missing required parameter: "key"');
            }

            if (typeof value === 'undefined') {
                throw new AppwriteException('Missing required parameter: "value"');
            }

            let path = '/functions/{functionId}/variables'.replace('{functionId}', functionId);
            let payload: Payload = {};

            if (typeof key !== 'undefined') {
                payload['key'] = key;
            }

            if (typeof value !== 'undefined') {
                payload['value'] = value;
            }

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('post', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Get Variable
         *
         * Get a variable by its unique ID.
         *
         * @param {string} functionId
         * @param {string} variableId
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async getVariable(functionId: string, variableId: string): Promise<Models.Variable> {
            if (typeof functionId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "functionId"');
            }

            if (typeof variableId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "variableId"');
            }

            let path = '/functions/{functionId}/variables/{variableId}'.replace('{functionId}', functionId).replace('{variableId}', variableId);
            let payload: Payload = {};

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('get', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Update Variable
         *
         * Update variable by its unique ID.
         *
         * @param {string} functionId
         * @param {string} variableId
         * @param {string} key
         * @param {string} value
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async updateVariable(functionId: string, variableId: string, key: string, value?: string): Promise<Models.Variable> {
            if (typeof functionId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "functionId"');
            }

            if (typeof variableId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "variableId"');
            }

            if (typeof key === 'undefined') {
                throw new AppwriteException('Missing required parameter: "key"');
            }

            let path = '/functions/{functionId}/variables/{variableId}'.replace('{functionId}', functionId).replace('{variableId}', variableId);
            let payload: Payload = {};

            if (typeof key !== 'undefined') {
                payload['key'] = key;
            }

            if (typeof value !== 'undefined') {
                payload['value'] = value;
            }

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('put', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Delete Variable
         *
         * Delete a variable by its unique ID.
         *
         * @param {string} functionId
         * @param {string} variableId
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async deleteVariable(functionId: string, variableId: string): Promise<{}> {
            if (typeof functionId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "functionId"');
            }

            if (typeof variableId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "variableId"');
            }

            let path = '/functions/{functionId}/variables/{variableId}'.replace('{functionId}', functionId).replace('{variableId}', variableId);
            let payload: Payload = {};

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('delete', uri, {
                'content-type': 'application/json',
            }, payload);
        }
};
