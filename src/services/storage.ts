import { Service } from '../service';
import { AppwriteException, Client, type Payload, UploadProgress } from '../client';
import type { Models } from '../models';

import { ImageGravity } from '../enums/image-gravity';
import { ImageFormat } from '../enums/image-format';

export class Storage {
    client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    /**
     * Get a list of all the user files. You can use the query params to filter your results.
     *
     * @param {string} params.bucketId - Storage bucket unique ID. You can create a new storage bucket using the Storage service [server integration](https://appwrite.io/docs/server/storage#createBucket).
     * @param {string[]} params.queries - Array of query strings generated using the Query class provided by the SDK. [Learn more about queries](https://appwrite.io/docs/queries). Maximum of 100 queries are allowed, each 4096 characters long. You may filter on the following attributes: name, signature, mimeType, sizeOriginal, chunksTotal, chunksUploaded
     * @param {string} params.search - Search term to filter your list results. Max length: 256 chars.
     * @throws {AppwriteException}
     * @returns {Promise<Models.FileList>}
     */
    listFiles(params: { bucketId: string, queries?: string[], search?: string  }): Promise<Models.FileList>;
    /**
     * Get a list of all the user files. You can use the query params to filter your results.
     *
     * @param {string} bucketId - Storage bucket unique ID. You can create a new storage bucket using the Storage service [server integration](https://appwrite.io/docs/server/storage#createBucket).
     * @param {string[]} queries - Array of query strings generated using the Query class provided by the SDK. [Learn more about queries](https://appwrite.io/docs/queries). Maximum of 100 queries are allowed, each 4096 characters long. You may filter on the following attributes: name, signature, mimeType, sizeOriginal, chunksTotal, chunksUploaded
     * @param {string} search - Search term to filter your list results. Max length: 256 chars.
     * @throws {AppwriteException}
     * @returns {Promise<Models.FileList>}
     * @deprecated Use the object parameter style method for a better developer experience.
     */
    listFiles(bucketId: string, queries?: string[], search?: string): Promise<Models.FileList>;
    listFiles(
        paramsOrFirst: { bucketId: string, queries?: string[], search?: string } | string,
        ...rest: [(string[])?, (string)?]    
    ): Promise<Models.FileList> {
        let params: { bucketId: string, queries?: string[], search?: string };
        
        if ((paramsOrFirst && typeof paramsOrFirst === 'object' && !Array.isArray(paramsOrFirst))) {
            params = (paramsOrFirst || {}) as { bucketId: string, queries?: string[], search?: string };
        } else {
            params = {
                bucketId: paramsOrFirst as string,
                queries: rest[0] as string[],
                search: rest[1] as string            
            };
        }
        
        const bucketId = params.bucketId;
        const queries = params.queries;
        const search = params.search;

        if (typeof bucketId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "bucketId"');
        }

        const apiPath = '/storage/buckets/{bucketId}/files'.replace('{bucketId}', bucketId);
        const payload: Payload = {};
        if (typeof queries !== 'undefined') {
            payload['queries'] = queries;
        }
        if (typeof search !== 'undefined') {
            payload['search'] = search;
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
     * Create a new file. Before using this route, you should create a new bucket resource using either a [server integration](https://appwrite.io/docs/server/storage#storageCreateBucket) API or directly from your Appwrite console.
     * 
     * Larger files should be uploaded using multiple requests with the [content-range](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Range) header to send a partial request with a maximum supported chunk of `5MB`. The `content-range` header values should always be in bytes.
     * 
     * When the first request is sent, the server will return the **File** object, and the subsequent part request must include the file's **id** in `x-appwrite-id` header to allow the server to know that the partial upload is for the existing file and not for a new one.
     * 
     * If you're creating a new file using one of the Appwrite SDKs, all the chunking logic will be managed by the SDK internally.
     * 
     *
     * @param {string} params.bucketId - Storage bucket unique ID. You can create a new storage bucket using the Storage service [server integration](https://appwrite.io/docs/server/storage#createBucket).
     * @param {string} params.fileId - File ID. Choose a custom ID or generate a random ID with `ID.unique()`. Valid chars are a-z, A-Z, 0-9, period, hyphen, and underscore. Can't start with a special char. Max length is 36 chars.
     * @param {File} params.file - Binary file. Appwrite SDKs provide helpers to handle file input. [Learn about file input](https://appwrite.io/docs/products/storage/upload-download#input-file).
     * @param {string[]} params.permissions - An array of permission strings. By default, only the current user is granted all permissions. [Learn more about permissions](https://appwrite.io/docs/permissions).
     * @throws {AppwriteException}
     * @returns {Promise<Models.File>}
     */
    createFile(params: { bucketId: string, fileId: string, file: File, permissions?: string[] , onProgress?: (progress: UploadProgress) => void }): Promise<Models.File>;
    /**
     * Create a new file. Before using this route, you should create a new bucket resource using either a [server integration](https://appwrite.io/docs/server/storage#storageCreateBucket) API or directly from your Appwrite console.
     * 
     * Larger files should be uploaded using multiple requests with the [content-range](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Range) header to send a partial request with a maximum supported chunk of `5MB`. The `content-range` header values should always be in bytes.
     * 
     * When the first request is sent, the server will return the **File** object, and the subsequent part request must include the file's **id** in `x-appwrite-id` header to allow the server to know that the partial upload is for the existing file and not for a new one.
     * 
     * If you're creating a new file using one of the Appwrite SDKs, all the chunking logic will be managed by the SDK internally.
     * 
     *
     * @param {string} bucketId - Storage bucket unique ID. You can create a new storage bucket using the Storage service [server integration](https://appwrite.io/docs/server/storage#createBucket).
     * @param {string} fileId - File ID. Choose a custom ID or generate a random ID with `ID.unique()`. Valid chars are a-z, A-Z, 0-9, period, hyphen, and underscore. Can't start with a special char. Max length is 36 chars.
     * @param {File} file - Binary file. Appwrite SDKs provide helpers to handle file input. [Learn about file input](https://appwrite.io/docs/products/storage/upload-download#input-file).
     * @param {string[]} permissions - An array of permission strings. By default, only the current user is granted all permissions. [Learn more about permissions](https://appwrite.io/docs/permissions).
     * @throws {AppwriteException}
     * @returns {Promise<Models.File>}
     * @deprecated Use the object parameter style method for a better developer experience.
     */
    createFile(bucketId: string, fileId: string, file: File, permissions?: string[], onProgress?: (progress: UploadProgress) => void): Promise<Models.File>;
    createFile(
        paramsOrFirst: { bucketId: string, fileId: string, file: File, permissions?: string[], onProgress?: (progress: UploadProgress) => void  } | string,
        ...rest: [(string)?, (File)?, (string[])?,((progress: UploadProgress) => void)?]    
    ): Promise<Models.File> {
        let params: { bucketId: string, fileId: string, file: File, permissions?: string[] };
        let onProgress: ((progress: UploadProgress) => void);
        
        if ((paramsOrFirst && typeof paramsOrFirst === 'object' && !Array.isArray(paramsOrFirst))) {
            params = (paramsOrFirst || {}) as { bucketId: string, fileId: string, file: File, permissions?: string[] };
            onProgress = paramsOrFirst?.onProgress as ((progress: UploadProgress) => void);
        } else {
            params = {
                bucketId: paramsOrFirst as string,
                fileId: rest[0] as string,
                file: rest[1] as File,
                permissions: rest[2] as string[]            
            };
            onProgress = rest[3] as ((progress: UploadProgress) => void);
        }
        
        const bucketId = params.bucketId;
        const fileId = params.fileId;
        const file = params.file;
        const permissions = params.permissions;

        if (typeof bucketId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "bucketId"');
        }
        if (typeof fileId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "fileId"');
        }
        if (typeof file === 'undefined') {
            throw new AppwriteException('Missing required parameter: "file"');
        }

        const apiPath = '/storage/buckets/{bucketId}/files'.replace('{bucketId}', bucketId);
        const payload: Payload = {};
        if (typeof fileId !== 'undefined') {
            payload['fileId'] = fileId;
        }
        if (typeof file !== 'undefined') {
            payload['file'] = file;
        }
        if (typeof permissions !== 'undefined') {
            payload['permissions'] = permissions;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);

        const apiHeaders: { [header: string]: string } = {
            'content-type': 'multipart/form-data',
        }

        return this.client.chunkedUpload(
            'post',
            uri,
            apiHeaders,
            payload,
            onProgress
        );
    }

    /**
     * Get a file by its unique ID. This endpoint response returns a JSON object with the file metadata.
     *
     * @param {string} params.bucketId - Storage bucket unique ID. You can create a new storage bucket using the Storage service [server integration](https://appwrite.io/docs/server/storage#createBucket).
     * @param {string} params.fileId - File ID.
     * @throws {AppwriteException}
     * @returns {Promise<Models.File>}
     */
    getFile(params: { bucketId: string, fileId: string  }): Promise<Models.File>;
    /**
     * Get a file by its unique ID. This endpoint response returns a JSON object with the file metadata.
     *
     * @param {string} bucketId - Storage bucket unique ID. You can create a new storage bucket using the Storage service [server integration](https://appwrite.io/docs/server/storage#createBucket).
     * @param {string} fileId - File ID.
     * @throws {AppwriteException}
     * @returns {Promise<Models.File>}
     * @deprecated Use the object parameter style method for a better developer experience.
     */
    getFile(bucketId: string, fileId: string): Promise<Models.File>;
    getFile(
        paramsOrFirst: { bucketId: string, fileId: string } | string,
        ...rest: [(string)?]    
    ): Promise<Models.File> {
        let params: { bucketId: string, fileId: string };
        
        if ((paramsOrFirst && typeof paramsOrFirst === 'object' && !Array.isArray(paramsOrFirst))) {
            params = (paramsOrFirst || {}) as { bucketId: string, fileId: string };
        } else {
            params = {
                bucketId: paramsOrFirst as string,
                fileId: rest[0] as string            
            };
        }
        
        const bucketId = params.bucketId;
        const fileId = params.fileId;

        if (typeof bucketId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "bucketId"');
        }
        if (typeof fileId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "fileId"');
        }

        const apiPath = '/storage/buckets/{bucketId}/files/{fileId}'.replace('{bucketId}', bucketId).replace('{fileId}', fileId);
        const payload: Payload = {};
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
     * Update a file by its unique ID. Only users with write permissions have access to update this resource.
     *
     * @param {string} params.bucketId - Storage bucket unique ID. You can create a new storage bucket using the Storage service [server integration](https://appwrite.io/docs/server/storage#createBucket).
     * @param {string} params.fileId - File unique ID.
     * @param {string} params.name - Name of the file
     * @param {string[]} params.permissions - An array of permission string. By default, the current permissions are inherited. [Learn more about permissions](https://appwrite.io/docs/permissions).
     * @throws {AppwriteException}
     * @returns {Promise<Models.File>}
     */
    updateFile(params: { bucketId: string, fileId: string, name?: string, permissions?: string[]  }): Promise<Models.File>;
    /**
     * Update a file by its unique ID. Only users with write permissions have access to update this resource.
     *
     * @param {string} bucketId - Storage bucket unique ID. You can create a new storage bucket using the Storage service [server integration](https://appwrite.io/docs/server/storage#createBucket).
     * @param {string} fileId - File unique ID.
     * @param {string} name - Name of the file
     * @param {string[]} permissions - An array of permission string. By default, the current permissions are inherited. [Learn more about permissions](https://appwrite.io/docs/permissions).
     * @throws {AppwriteException}
     * @returns {Promise<Models.File>}
     * @deprecated Use the object parameter style method for a better developer experience.
     */
    updateFile(bucketId: string, fileId: string, name?: string, permissions?: string[]): Promise<Models.File>;
    updateFile(
        paramsOrFirst: { bucketId: string, fileId: string, name?: string, permissions?: string[] } | string,
        ...rest: [(string)?, (string)?, (string[])?]    
    ): Promise<Models.File> {
        let params: { bucketId: string, fileId: string, name?: string, permissions?: string[] };
        
        if ((paramsOrFirst && typeof paramsOrFirst === 'object' && !Array.isArray(paramsOrFirst))) {
            params = (paramsOrFirst || {}) as { bucketId: string, fileId: string, name?: string, permissions?: string[] };
        } else {
            params = {
                bucketId: paramsOrFirst as string,
                fileId: rest[0] as string,
                name: rest[1] as string,
                permissions: rest[2] as string[]            
            };
        }
        
        const bucketId = params.bucketId;
        const fileId = params.fileId;
        const name = params.name;
        const permissions = params.permissions;

        if (typeof bucketId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "bucketId"');
        }
        if (typeof fileId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "fileId"');
        }

        const apiPath = '/storage/buckets/{bucketId}/files/{fileId}'.replace('{bucketId}', bucketId).replace('{fileId}', fileId);
        const payload: Payload = {};
        if (typeof name !== 'undefined') {
            payload['name'] = name;
        }
        if (typeof permissions !== 'undefined') {
            payload['permissions'] = permissions;
        }
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
     * Delete a file by its unique ID. Only users with write permissions have access to delete this resource.
     *
     * @param {string} params.bucketId - Storage bucket unique ID. You can create a new storage bucket using the Storage service [server integration](https://appwrite.io/docs/server/storage#createBucket).
     * @param {string} params.fileId - File ID.
     * @throws {AppwriteException}
     * @returns {Promise<{}>}
     */
    deleteFile(params: { bucketId: string, fileId: string  }): Promise<{}>;
    /**
     * Delete a file by its unique ID. Only users with write permissions have access to delete this resource.
     *
     * @param {string} bucketId - Storage bucket unique ID. You can create a new storage bucket using the Storage service [server integration](https://appwrite.io/docs/server/storage#createBucket).
     * @param {string} fileId - File ID.
     * @throws {AppwriteException}
     * @returns {Promise<{}>}
     * @deprecated Use the object parameter style method for a better developer experience.
     */
    deleteFile(bucketId: string, fileId: string): Promise<{}>;
    deleteFile(
        paramsOrFirst: { bucketId: string, fileId: string } | string,
        ...rest: [(string)?]    
    ): Promise<{}> {
        let params: { bucketId: string, fileId: string };
        
        if ((paramsOrFirst && typeof paramsOrFirst === 'object' && !Array.isArray(paramsOrFirst))) {
            params = (paramsOrFirst || {}) as { bucketId: string, fileId: string };
        } else {
            params = {
                bucketId: paramsOrFirst as string,
                fileId: rest[0] as string            
            };
        }
        
        const bucketId = params.bucketId;
        const fileId = params.fileId;

        if (typeof bucketId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "bucketId"');
        }
        if (typeof fileId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "fileId"');
        }

        const apiPath = '/storage/buckets/{bucketId}/files/{fileId}'.replace('{bucketId}', bucketId).replace('{fileId}', fileId);
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

    /**
     * Get a file content by its unique ID. The endpoint response return with a 'Content-Disposition: attachment' header that tells the browser to start downloading the file to user downloads directory.
     *
     * @param {string} params.bucketId - Storage bucket ID. You can create a new storage bucket using the Storage service [server integration](https://appwrite.io/docs/server/storage#createBucket).
     * @param {string} params.fileId - File ID.
     * @param {string} params.token - File token for accessing this file.
     * @throws {AppwriteException}
     * @returns {string}
     */
    getFileDownload(params: { bucketId: string, fileId: string, token?: string  }): string;
    /**
     * Get a file content by its unique ID. The endpoint response return with a 'Content-Disposition: attachment' header that tells the browser to start downloading the file to user downloads directory.
     *
     * @param {string} bucketId - Storage bucket ID. You can create a new storage bucket using the Storage service [server integration](https://appwrite.io/docs/server/storage#createBucket).
     * @param {string} fileId - File ID.
     * @param {string} token - File token for accessing this file.
     * @throws {AppwriteException}
     * @returns {string}
     * @deprecated Use the object parameter style method for a better developer experience.
     */
    getFileDownload(bucketId: string, fileId: string, token?: string): string;
    getFileDownload(
        paramsOrFirst: { bucketId: string, fileId: string, token?: string } | string,
        ...rest: [(string)?, (string)?]    
    ): string {
        let params: { bucketId: string, fileId: string, token?: string };
        
        if ((paramsOrFirst && typeof paramsOrFirst === 'object' && !Array.isArray(paramsOrFirst))) {
            params = (paramsOrFirst || {}) as { bucketId: string, fileId: string, token?: string };
        } else {
            params = {
                bucketId: paramsOrFirst as string,
                fileId: rest[0] as string,
                token: rest[1] as string            
            };
        }
        
        const bucketId = params.bucketId;
        const fileId = params.fileId;
        const token = params.token;

        if (typeof bucketId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "bucketId"');
        }
        if (typeof fileId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "fileId"');
        }

        const apiPath = '/storage/buckets/{bucketId}/files/{fileId}/download'.replace('{bucketId}', bucketId).replace('{fileId}', fileId);
        const payload: Payload = {};
        if (typeof token !== 'undefined') {
            payload['token'] = token;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);

        const apiHeaders: { [header: string]: string } = {
        }

        payload['project'] = this.client.config.project;

        for (const [key, value] of Object.entries(Service.flatten(payload))) {
            uri.searchParams.append(key, value);
        }
        
        return uri.toString();
    }

    /**
     * Get a file preview image. Currently, this method supports preview for image files (jpg, png, and gif), other supported formats, like pdf, docs, slides, and spreadsheets, will return the file icon image. You can also pass query string arguments for cutting and resizing your preview image. Preview is supported only for image files smaller than 10MB.
     *
     * @param {string} params.bucketId - Storage bucket unique ID. You can create a new storage bucket using the Storage service [server integration](https://appwrite.io/docs/server/storage#createBucket).
     * @param {string} params.fileId - File ID
     * @param {number} params.width - Resize preview image width, Pass an integer between 0 to 4000.
     * @param {number} params.height - Resize preview image height, Pass an integer between 0 to 4000.
     * @param {ImageGravity} params.gravity - Image crop gravity. Can be one of center,top-left,top,top-right,left,right,bottom-left,bottom,bottom-right
     * @param {number} params.quality - Preview image quality. Pass an integer between 0 to 100. Defaults to keep existing image quality.
     * @param {number} params.borderWidth - Preview image border in pixels. Pass an integer between 0 to 100. Defaults to 0.
     * @param {string} params.borderColor - Preview image border color. Use a valid HEX color, no # is needed for prefix.
     * @param {number} params.borderRadius - Preview image border radius in pixels. Pass an integer between 0 to 4000.
     * @param {number} params.opacity - Preview image opacity. Only works with images having an alpha channel (like png). Pass a number between 0 to 1.
     * @param {number} params.rotation - Preview image rotation in degrees. Pass an integer between -360 and 360.
     * @param {string} params.background - Preview image background color. Only works with transparent images (png). Use a valid HEX color, no # is needed for prefix.
     * @param {ImageFormat} params.output - Output format type (jpeg, jpg, png, gif and webp).
     * @param {string} params.token - File token for accessing this file.
     * @throws {AppwriteException}
     * @returns {string}
     */
    getFilePreview(params: { bucketId: string, fileId: string, width?: number, height?: number, gravity?: ImageGravity, quality?: number, borderWidth?: number, borderColor?: string, borderRadius?: number, opacity?: number, rotation?: number, background?: string, output?: ImageFormat, token?: string  }): string;
    /**
     * Get a file preview image. Currently, this method supports preview for image files (jpg, png, and gif), other supported formats, like pdf, docs, slides, and spreadsheets, will return the file icon image. You can also pass query string arguments for cutting and resizing your preview image. Preview is supported only for image files smaller than 10MB.
     *
     * @param {string} bucketId - Storage bucket unique ID. You can create a new storage bucket using the Storage service [server integration](https://appwrite.io/docs/server/storage#createBucket).
     * @param {string} fileId - File ID
     * @param {number} width - Resize preview image width, Pass an integer between 0 to 4000.
     * @param {number} height - Resize preview image height, Pass an integer between 0 to 4000.
     * @param {ImageGravity} gravity - Image crop gravity. Can be one of center,top-left,top,top-right,left,right,bottom-left,bottom,bottom-right
     * @param {number} quality - Preview image quality. Pass an integer between 0 to 100. Defaults to keep existing image quality.
     * @param {number} borderWidth - Preview image border in pixels. Pass an integer between 0 to 100. Defaults to 0.
     * @param {string} borderColor - Preview image border color. Use a valid HEX color, no # is needed for prefix.
     * @param {number} borderRadius - Preview image border radius in pixels. Pass an integer between 0 to 4000.
     * @param {number} opacity - Preview image opacity. Only works with images having an alpha channel (like png). Pass a number between 0 to 1.
     * @param {number} rotation - Preview image rotation in degrees. Pass an integer between -360 and 360.
     * @param {string} background - Preview image background color. Only works with transparent images (png). Use a valid HEX color, no # is needed for prefix.
     * @param {ImageFormat} output - Output format type (jpeg, jpg, png, gif and webp).
     * @param {string} token - File token for accessing this file.
     * @throws {AppwriteException}
     * @returns {string}
     * @deprecated Use the object parameter style method for a better developer experience.
     */
    getFilePreview(bucketId: string, fileId: string, width?: number, height?: number, gravity?: ImageGravity, quality?: number, borderWidth?: number, borderColor?: string, borderRadius?: number, opacity?: number, rotation?: number, background?: string, output?: ImageFormat, token?: string): string;
    getFilePreview(
        paramsOrFirst: { bucketId: string, fileId: string, width?: number, height?: number, gravity?: ImageGravity, quality?: number, borderWidth?: number, borderColor?: string, borderRadius?: number, opacity?: number, rotation?: number, background?: string, output?: ImageFormat, token?: string } | string,
        ...rest: [(string)?, (number)?, (number)?, (ImageGravity)?, (number)?, (number)?, (string)?, (number)?, (number)?, (number)?, (string)?, (ImageFormat)?, (string)?]    
    ): string {
        let params: { bucketId: string, fileId: string, width?: number, height?: number, gravity?: ImageGravity, quality?: number, borderWidth?: number, borderColor?: string, borderRadius?: number, opacity?: number, rotation?: number, background?: string, output?: ImageFormat, token?: string };
        
        if ((paramsOrFirst && typeof paramsOrFirst === 'object' && !Array.isArray(paramsOrFirst))) {
            params = (paramsOrFirst || {}) as { bucketId: string, fileId: string, width?: number, height?: number, gravity?: ImageGravity, quality?: number, borderWidth?: number, borderColor?: string, borderRadius?: number, opacity?: number, rotation?: number, background?: string, output?: ImageFormat, token?: string };
        } else {
            params = {
                bucketId: paramsOrFirst as string,
                fileId: rest[0] as string,
                width: rest[1] as number,
                height: rest[2] as number,
                gravity: rest[3] as ImageGravity,
                quality: rest[4] as number,
                borderWidth: rest[5] as number,
                borderColor: rest[6] as string,
                borderRadius: rest[7] as number,
                opacity: rest[8] as number,
                rotation: rest[9] as number,
                background: rest[10] as string,
                output: rest[11] as ImageFormat,
                token: rest[12] as string            
            };
        }
        
        const bucketId = params.bucketId;
        const fileId = params.fileId;
        const width = params.width;
        const height = params.height;
        const gravity = params.gravity;
        const quality = params.quality;
        const borderWidth = params.borderWidth;
        const borderColor = params.borderColor;
        const borderRadius = params.borderRadius;
        const opacity = params.opacity;
        const rotation = params.rotation;
        const background = params.background;
        const output = params.output;
        const token = params.token;

        if (typeof bucketId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "bucketId"');
        }
        if (typeof fileId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "fileId"');
        }

        const apiPath = '/storage/buckets/{bucketId}/files/{fileId}/preview'.replace('{bucketId}', bucketId).replace('{fileId}', fileId);
        const payload: Payload = {};
        if (typeof width !== 'undefined') {
            payload['width'] = width;
        }
        if (typeof height !== 'undefined') {
            payload['height'] = height;
        }
        if (typeof gravity !== 'undefined') {
            payload['gravity'] = gravity;
        }
        if (typeof quality !== 'undefined') {
            payload['quality'] = quality;
        }
        if (typeof borderWidth !== 'undefined') {
            payload['borderWidth'] = borderWidth;
        }
        if (typeof borderColor !== 'undefined') {
            payload['borderColor'] = borderColor;
        }
        if (typeof borderRadius !== 'undefined') {
            payload['borderRadius'] = borderRadius;
        }
        if (typeof opacity !== 'undefined') {
            payload['opacity'] = opacity;
        }
        if (typeof rotation !== 'undefined') {
            payload['rotation'] = rotation;
        }
        if (typeof background !== 'undefined') {
            payload['background'] = background;
        }
        if (typeof output !== 'undefined') {
            payload['output'] = output;
        }
        if (typeof token !== 'undefined') {
            payload['token'] = token;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);

        const apiHeaders: { [header: string]: string } = {
        }

        payload['project'] = this.client.config.project;

        for (const [key, value] of Object.entries(Service.flatten(payload))) {
            uri.searchParams.append(key, value);
        }
        
        return uri.toString();
    }

    /**
     * Get a file content by its unique ID. This endpoint is similar to the download method but returns with no  'Content-Disposition: attachment' header.
     *
     * @param {string} params.bucketId - Storage bucket unique ID. You can create a new storage bucket using the Storage service [server integration](https://appwrite.io/docs/server/storage#createBucket).
     * @param {string} params.fileId - File ID.
     * @param {string} params.token - File token for accessing this file.
     * @throws {AppwriteException}
     * @returns {string}
     */
    getFileView(params: { bucketId: string, fileId: string, token?: string  }): string;
    /**
     * Get a file content by its unique ID. This endpoint is similar to the download method but returns with no  'Content-Disposition: attachment' header.
     *
     * @param {string} bucketId - Storage bucket unique ID. You can create a new storage bucket using the Storage service [server integration](https://appwrite.io/docs/server/storage#createBucket).
     * @param {string} fileId - File ID.
     * @param {string} token - File token for accessing this file.
     * @throws {AppwriteException}
     * @returns {string}
     * @deprecated Use the object parameter style method for a better developer experience.
     */
    getFileView(bucketId: string, fileId: string, token?: string): string;
    getFileView(
        paramsOrFirst: { bucketId: string, fileId: string, token?: string } | string,
        ...rest: [(string)?, (string)?]    
    ): string {
        let params: { bucketId: string, fileId: string, token?: string };
        
        if ((paramsOrFirst && typeof paramsOrFirst === 'object' && !Array.isArray(paramsOrFirst))) {
            params = (paramsOrFirst || {}) as { bucketId: string, fileId: string, token?: string };
        } else {
            params = {
                bucketId: paramsOrFirst as string,
                fileId: rest[0] as string,
                token: rest[1] as string            
            };
        }
        
        const bucketId = params.bucketId;
        const fileId = params.fileId;
        const token = params.token;

        if (typeof bucketId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "bucketId"');
        }
        if (typeof fileId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "fileId"');
        }

        const apiPath = '/storage/buckets/{bucketId}/files/{fileId}/view'.replace('{bucketId}', bucketId).replace('{fileId}', fileId);
        const payload: Payload = {};
        if (typeof token !== 'undefined') {
            payload['token'] = token;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);

        const apiHeaders: { [header: string]: string } = {
        }

        payload['project'] = this.client.config.project;

        for (const [key, value] of Object.entries(Service.flatten(payload))) {
            uri.searchParams.append(key, value);
        }
        
        return uri.toString();
    }
}
