import { Service } from '../service';
import { AppwriteException, Client, type Payload, UploadProgress } from '../client';
import type { Models } from '../models';


export class Notifications {
    client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    /**
     * Get the list of notifications for the currently logged in console user. Use queries to filter the results by attributes such as read status, view timestamps, or creation date.
     * 
     *
     * @param {string[]} params.queries - Array of query strings generated using the Query class provided by the SDK. [Learn more about queries](https://appwrite.io/docs/queries). Maximum of 100 queries are allowed, each 4096 characters long. You may filter on the following attributes: read, type, channel, messageId, projectId, resourceType, resourceId, parentResourceType, parentResourceId, firstSeen, lastSeen
     * @throws {AppwriteException}
     * @returns {Promise<Models.NotificationList>}
     */
    list(params?: { queries?: string[] }): Promise<Models.NotificationList>;
    /**
     * Get the list of notifications for the currently logged in console user. Use queries to filter the results by attributes such as read status, view timestamps, or creation date.
     * 
     *
     * @param {string[]} queries - Array of query strings generated using the Query class provided by the SDK. [Learn more about queries](https://appwrite.io/docs/queries). Maximum of 100 queries are allowed, each 4096 characters long. You may filter on the following attributes: read, type, channel, messageId, projectId, resourceType, resourceId, parentResourceType, parentResourceId, firstSeen, lastSeen
     * @throws {AppwriteException}
     * @returns {Promise<Models.NotificationList>}
     * @deprecated Use the object parameter style method for a better developer experience.
     */
    list(queries?: string[]): Promise<Models.NotificationList>;
    list(
        paramsOrFirst?: { queries?: string[] } | string[]    
    ): Promise<Models.NotificationList> {
        let params: { queries?: string[] };
        
        if (!paramsOrFirst || (paramsOrFirst && typeof paramsOrFirst === 'object' && !Array.isArray(paramsOrFirst))) {
            params = (paramsOrFirst || {}) as { queries?: string[] };
        } else {
            params = {
                queries: paramsOrFirst as string[]            
            };
        }
        
        const queries = params.queries;


        const apiPath = '/notifications';
        const payload: Payload = {};
        if (typeof queries !== 'undefined') {
            payload['queries'] = queries;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);

        const apiHeaders: { [header: string]: string } = {
            'X-Appwrite-Project': this.client.config.project,
            'accept': 'application/json',
        }

        return this.client.call(
            'get',
            uri,
            apiHeaders,
            payload
        );
    }

    /**
     * Update a notification by its unique ID. Use the `read` parameter to mark the notification as read or unread.
     * 
     *
     * @param {string} params.notificationId - Notification ID.
     * @param {boolean} params.read - Notification read status.
     * @throws {AppwriteException}
     * @returns {Promise<Models.Notification>}
     */
    update(params: { notificationId: string, read: boolean }): Promise<Models.Notification>;
    /**
     * Update a notification by its unique ID. Use the `read` parameter to mark the notification as read or unread.
     * 
     *
     * @param {string} notificationId - Notification ID.
     * @param {boolean} read - Notification read status.
     * @throws {AppwriteException}
     * @returns {Promise<Models.Notification>}
     * @deprecated Use the object parameter style method for a better developer experience.
     */
    update(notificationId: string, read: boolean): Promise<Models.Notification>;
    update(
        paramsOrFirst: { notificationId: string, read: boolean } | string,
        ...rest: [(boolean)?]    
    ): Promise<Models.Notification> {
        let params: { notificationId: string, read: boolean };
        
        if ((paramsOrFirst && typeof paramsOrFirst === 'object' && !Array.isArray(paramsOrFirst))) {
            params = (paramsOrFirst || {}) as { notificationId: string, read: boolean };
        } else {
            params = {
                notificationId: paramsOrFirst as string,
                read: rest[0] as boolean            
            };
        }
        
        const notificationId = params.notificationId;
        const read = params.read;

        if (typeof notificationId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "notificationId"');
        }
        if (typeof read === 'undefined') {
            throw new AppwriteException('Missing required parameter: "read"');
        }

        const apiPath = '/notifications/{notificationId}'.replace('{notificationId}', encodeURIComponent(String(notificationId)));
        const payload: Payload = {};
        if (typeof read !== 'undefined') {
            payload['read'] = read;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);

        const apiHeaders: { [header: string]: string } = {
            'X-Appwrite-Project': this.client.config.project,
            'content-type': 'application/json',
            'accept': 'application/json',
        }

        return this.client.call(
            'patch',
            uri,
            apiHeaders,
            payload
        );
    }
}
