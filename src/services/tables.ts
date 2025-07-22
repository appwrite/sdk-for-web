import { Service } from '../service';
import { AppwriteException, Client, type Payload, UploadProgress } from '../client';
import type { Models } from '../models';

export class Tables {
    client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    /**
     * Get a list of all the user&#039;s rows in a given table. You can use the query params to filter your results.
     *
     * @param {string} databaseId
     * @param {string} tableId
     * @param {string[]} queries
     * @throws {AppwriteException}
     * @returns {Promise<Models.RowList<Row>>}
     */
    listRows<Row extends Models.Row = Models.DefaultRow>(databaseId: string, tableId: string, queries?: string[]): Promise<Models.RowList<Row>> {
        if (typeof databaseId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "databaseId"');
        }
        if (typeof tableId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "tableId"');
        }
        const apiPath = '/databases/{databaseId}/tables/{tableId}/rows'.replace('{databaseId}', databaseId).replace('{tableId}', tableId);
        const payload: Payload = {};
        if (typeof queries !== 'undefined') {
            payload['queries'] = queries;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);

        const apiHeaders: { [header: string]: string } = {
        }

        return this.client.call(
            'get',
            uri,
            apiHeaders,
            payload
        );
    }

    /**
     * Create a new Row. Before using this route, you should create a new table resource using either a [server integration](https://appwrite.io/docs/server/databases#databasesCreateTable) API or directly from your database console.
     *
     * @param {string} databaseId
     * @param {string} tableId
     * @param {string} rowId
     * @param {object} data
     * @param {string[]} permissions
     * @throws {AppwriteException}
     * @returns {Promise<Row>}
     */
    createRow<Row extends Models.Row = Models.DefaultRow>(databaseId: string, tableId: string, rowId: string, data: object, permissions?: string[]): Promise<Row> {
        if (typeof databaseId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "databaseId"');
        }
        if (typeof tableId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "tableId"');
        }
        if (typeof rowId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "rowId"');
        }
        if (typeof data === 'undefined') {
            throw new AppwriteException('Missing required parameter: "data"');
        }
        const apiPath = '/databases/{databaseId}/tables/{tableId}/rows'.replace('{databaseId}', databaseId).replace('{tableId}', tableId);
        const payload: Payload = {};
        if (typeof rowId !== 'undefined') {
            payload['rowId'] = rowId;
        }
        if (typeof data !== 'undefined') {
            payload['data'] = data;
        }
        if (typeof permissions !== 'undefined') {
            payload['permissions'] = permissions;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);

        const apiHeaders: { [header: string]: string } = {
            'content-type': 'application/json',
        }

        return this.client.call(
            'post',
            uri,
            apiHeaders,
            payload
        );
    }

    /**
     * Create new Rows. Before using this route, you should create a new table resource using either a [server integration](https://appwrite.io/docs/server/databases#databasesCreateTable) API or directly from your database console.
     *
     * @param {string} databaseId
     * @param {string} tableId
     * @param {object[]} rows
     * @throws {AppwriteException}
     * @returns {Promise<Models.RowList<Row>>}
     */
    createRows<Row extends Models.Row = Models.DefaultRow>(databaseId: string, tableId: string, rows: object[]): Promise<Models.RowList<Row>> {
        if (typeof databaseId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "databaseId"');
        }
        if (typeof tableId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "tableId"');
        }
        if (typeof rows === 'undefined') {
            throw new AppwriteException('Missing required parameter: "rows"');
        }
        const apiPath = '/databases/{databaseId}/tables/{tableId}/rows'.replace('{databaseId}', databaseId).replace('{tableId}', tableId);
        const payload: Payload = {};
        if (typeof rows !== 'undefined') {
            payload['rows'] = rows;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);

        const apiHeaders: { [header: string]: string } = {
            'content-type': 'application/json',
        }

        return this.client.call(
            'post',
            uri,
            apiHeaders,
            payload
        );
    }

    /**
     * Get a row by its unique ID. This endpoint response returns a JSON object with the row data.
     *
     * @param {string} databaseId
     * @param {string} tableId
     * @param {string} rowId
     * @param {string[]} queries
     * @throws {AppwriteException}
     * @returns {Promise<Row>}
     */
    getRow<Row extends Models.Row = Models.DefaultRow>(databaseId: string, tableId: string, rowId: string, queries?: string[]): Promise<Row> {
        if (typeof databaseId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "databaseId"');
        }
        if (typeof tableId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "tableId"');
        }
        if (typeof rowId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "rowId"');
        }
        const apiPath = '/databases/{databaseId}/tables/{tableId}/rows/{rowId}'.replace('{databaseId}', databaseId).replace('{tableId}', tableId).replace('{rowId}', rowId);
        const payload: Payload = {};
        if (typeof queries !== 'undefined') {
            payload['queries'] = queries;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);

        const apiHeaders: { [header: string]: string } = {
        }

        return this.client.call(
            'get',
            uri,
            apiHeaders,
            payload
        );
    }

    /**
     * Create or update a Row. Before using this route, you should create a new table resource using either a [server integration](https://appwrite.io/docs/server/databases#databasesCreateTable) API or directly from your database console.
     *
     * @param {string} databaseId
     * @param {string} tableId
     * @param {string} rowId
     * @throws {AppwriteException}
     * @returns {Promise<Row>}
     */
    upsertRow<Row extends Models.Row = Models.DefaultRow>(databaseId: string, tableId: string, rowId: string): Promise<Row> {
        if (typeof databaseId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "databaseId"');
        }
        if (typeof tableId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "tableId"');
        }
        if (typeof rowId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "rowId"');
        }
        const apiPath = '/databases/{databaseId}/tables/{tableId}/rows/{rowId}'.replace('{databaseId}', databaseId).replace('{tableId}', tableId).replace('{rowId}', rowId);
        const payload: Payload = {};
        const uri = new URL(this.client.config.endpoint + apiPath);

        const apiHeaders: { [header: string]: string } = {
            'content-type': 'application/json',
        }

        return this.client.call(
            'put',
            uri,
            apiHeaders,
            payload
        );
    }

    /**
     * Update a row by its unique ID. Using the patch method you can pass only specific fields that will get updated.
     *
     * @param {string} databaseId
     * @param {string} tableId
     * @param {string} rowId
     * @param {object} data
     * @param {string[]} permissions
     * @throws {AppwriteException}
     * @returns {Promise<Row>}
     */
    updateRow<Row extends Models.Row = Models.DefaultRow>(databaseId: string, tableId: string, rowId: string, data?: object, permissions?: string[]): Promise<Row> {
        if (typeof databaseId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "databaseId"');
        }
        if (typeof tableId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "tableId"');
        }
        if (typeof rowId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "rowId"');
        }
        const apiPath = '/databases/{databaseId}/tables/{tableId}/rows/{rowId}'.replace('{databaseId}', databaseId).replace('{tableId}', tableId).replace('{rowId}', rowId);
        const payload: Payload = {};
        if (typeof data !== 'undefined') {
            payload['data'] = data;
        }
        if (typeof permissions !== 'undefined') {
            payload['permissions'] = permissions;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);

        const apiHeaders: { [header: string]: string } = {
            'content-type': 'application/json',
        }

        return this.client.call(
            'patch',
            uri,
            apiHeaders,
            payload
        );
    }

    /**
     * Delete a row by its unique ID.
     *
     * @param {string} databaseId
     * @param {string} tableId
     * @param {string} rowId
     * @throws {AppwriteException}
     * @returns {Promise<{}>}
     */
    deleteRow(databaseId: string, tableId: string, rowId: string): Promise<{}> {
        if (typeof databaseId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "databaseId"');
        }
        if (typeof tableId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "tableId"');
        }
        if (typeof rowId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "rowId"');
        }
        const apiPath = '/databases/{databaseId}/tables/{tableId}/rows/{rowId}'.replace('{databaseId}', databaseId).replace('{tableId}', tableId).replace('{rowId}', rowId);
        const payload: Payload = {};
        const uri = new URL(this.client.config.endpoint + apiPath);

        const apiHeaders: { [header: string]: string } = {
            'content-type': 'application/json',
        }

        return this.client.call(
            'delete',
            uri,
            apiHeaders,
            payload
        );
    }
}
