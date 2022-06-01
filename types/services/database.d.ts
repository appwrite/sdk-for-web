import { Service } from '../service';
import type { Models } from '../models';
export declare class Database extends Service {
    /**
     * List Documents
     *
     * Get a list of all the user documents. You can use the query params to
     * filter your results. On admin mode, this endpoint will return a list of all
     * of the project's documents. [Learn more about different API
     * modes](/docs/admin).
     *
     * @param {string} collectionId
     * @param {string[]} queries
     * @param {number} limit
     * @param {number} offset
     * @param {string} cursor
     * @param {string} cursorDirection
     * @param {string[]} orderAttributes
     * @param {string[]} orderTypes
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    listDocuments<Document extends Models.Document>(collectionId: string, queries?: string[], limit?: number, offset?: number, cursor?: string, cursorDirection?: string, orderAttributes?: string[], orderTypes?: string[]): Promise<Models.DocumentList<Document>>;
    /**
     * Create Document
     *
     * Create a new Document. Before using this route, you should create a new
     * collection resource using either a [server
     * integration](/docs/server/database#databaseCreateCollection) API or
     * directly from your database console.
     *
     * @param {string} collectionId
     * @param {string} documentId
     * @param {Omit<Document, keyof Models.Document>} data
     * @param {string[]} read
     * @param {string[]} write
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    createDocument<Document extends Models.Document>(collectionId: string, documentId: string, data: Omit<Document, keyof Models.Document>, read?: string[], write?: string[]): Promise<Document>;
    /**
     * Get Document
     *
     * Get a document by its unique ID. This endpoint response returns a JSON
     * object with the document data.
     *
     * @param {string} collectionId
     * @param {string} documentId
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    getDocument<Document extends Models.Document>(collectionId: string, documentId: string): Promise<Document>;
    /**
     * Update Document
     *
     * Update a document by its unique ID. Using the patch method you can pass
     * only specific fields that will get updated.
     *
     * @param {string} collectionId
     * @param {string} documentId
     * @param {Partial<Omit<Document, keyof Models.Document>>} data
     * @param {string[]} read
     * @param {string[]} write
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    updateDocument<Document extends Models.Document>(collectionId: string, documentId: string, data: Partial<Omit<Document, keyof Models.Document>>, read?: string[], write?: string[]): Promise<Document>;
    /**
     * Delete Document
     *
     * Delete a document by its unique ID.
     *
     * @param {string} collectionId
     * @param {string} documentId
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    deleteDocument(collectionId: string, documentId: string): Promise<{}>;
}
