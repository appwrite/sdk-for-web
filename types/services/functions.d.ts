import { Service } from '../service';
import type { Models } from '../models';
export declare class Functions extends Service {
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
    retryBuild(functionId: string, deploymentId: string, buildId: string): Promise<{}>;
    /**
     * List Executions
     *
     * Get a list of all the current user function execution logs. You can use the
     * query params to filter your results. On admin mode, this endpoint will
     * return a list of all of the project's executions. [Learn more about
     * different API modes](/docs/admin).
     *
     * @param {string} functionId
     * @param {number} limit
     * @param {number} offset
     * @param {string} search
     * @param {string} cursor
     * @param {string} cursorDirection
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    listExecutions(functionId: string, limit?: number, offset?: number, search?: string, cursor?: string, cursorDirection?: string): Promise<Models.ExecutionList>;
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
    createExecution(functionId: string, data?: string, async?: boolean): Promise<Models.Execution>;
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
    getExecution(functionId: string, executionId: string): Promise<Models.Execution>;
}
