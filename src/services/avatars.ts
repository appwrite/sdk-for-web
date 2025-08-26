import { Service } from '../service';
import { AppwriteException, Client, type Payload, UploadProgress } from '../client';
import type { Models } from '../models';

import { Browser } from '../enums/browser';
import { CreditCard } from '../enums/credit-card';
import { Flag } from '../enums/flag';

export class Avatars {
    client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    /**
     * You can use this endpoint to show different browser icons to your users. The code argument receives the browser code as it appears in your user [GET /account/sessions](https://appwrite.io/docs/references/cloud/client-web/account#getSessions) endpoint. Use width, height and quality arguments to change the output settings.
     * 
     * When one dimension is specified and the other is 0, the image is scaled with preserved aspect ratio. If both dimensions are 0, the API provides an image at source quality. If dimensions are not specified, the default size of image returned is 100x100px.
     *
     * @param {Browser} params.code - Browser Code.
     * @param {number} params.width - Image width. Pass an integer between 0 to 2000. Defaults to 100.
     * @param {number} params.height - Image height. Pass an integer between 0 to 2000. Defaults to 100.
     * @param {number} params.quality - Image quality. Pass an integer between 0 to 100. Defaults to keep existing image quality.
     * @throws {AppwriteException}
     * @returns {string}
     */
    getBrowser(params: { code: Browser, width?: number, height?: number, quality?: number  }): string;
    /**
     * You can use this endpoint to show different browser icons to your users. The code argument receives the browser code as it appears in your user [GET /account/sessions](https://appwrite.io/docs/references/cloud/client-web/account#getSessions) endpoint. Use width, height and quality arguments to change the output settings.
     * 
     * When one dimension is specified and the other is 0, the image is scaled with preserved aspect ratio. If both dimensions are 0, the API provides an image at source quality. If dimensions are not specified, the default size of image returned is 100x100px.
     *
     * @param {Browser} code - Browser Code.
     * @param {number} width - Image width. Pass an integer between 0 to 2000. Defaults to 100.
     * @param {number} height - Image height. Pass an integer between 0 to 2000. Defaults to 100.
     * @param {number} quality - Image quality. Pass an integer between 0 to 100. Defaults to keep existing image quality.
     * @throws {AppwriteException}
     * @returns {string}
     * @deprecated Use the object parameter style method for a better developer experience.
     */
    getBrowser(code: Browser, width?: number, height?: number, quality?: number): string;
    getBrowser(
        paramsOrFirst: { code: Browser, width?: number, height?: number, quality?: number } | Browser,
        ...rest: [(number)?, (number)?, (number)?]    
    ): string {
        let params: { code: Browser, width?: number, height?: number, quality?: number };
        
        if ((paramsOrFirst && typeof paramsOrFirst === 'object' && !Array.isArray(paramsOrFirst) && 'code' in paramsOrFirst)) {
            params = (paramsOrFirst || {}) as { code: Browser, width?: number, height?: number, quality?: number };
        } else {
            params = {
                code: paramsOrFirst as Browser,
                width: rest[0] as number,
                height: rest[1] as number,
                quality: rest[2] as number            
            };
        }
        
        const code = params.code;
        const width = params.width;
        const height = params.height;
        const quality = params.quality;

        if (typeof code === 'undefined') {
            throw new AppwriteException('Missing required parameter: "code"');
        }

        const apiPath = '/avatars/browsers/{code}'.replace('{code}', code);
        const payload: Payload = {};
        if (typeof width !== 'undefined') {
            payload['width'] = width;
        }
        if (typeof height !== 'undefined') {
            payload['height'] = height;
        }
        if (typeof quality !== 'undefined') {
            payload['quality'] = quality;
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
     * The credit card endpoint will return you the icon of the credit card provider you need. Use width, height and quality arguments to change the output settings.
     * 
     * When one dimension is specified and the other is 0, the image is scaled with preserved aspect ratio. If both dimensions are 0, the API provides an image at source quality. If dimensions are not specified, the default size of image returned is 100x100px.
     * 
     *
     * @param {CreditCard} params.code - Credit Card Code. Possible values: amex, argencard, cabal, cencosud, diners, discover, elo, hipercard, jcb, mastercard, naranja, targeta-shopping, union-china-pay, visa, mir, maestro, rupay.
     * @param {number} params.width - Image width. Pass an integer between 0 to 2000. Defaults to 100.
     * @param {number} params.height - Image height. Pass an integer between 0 to 2000. Defaults to 100.
     * @param {number} params.quality - Image quality. Pass an integer between 0 to 100. Defaults to keep existing image quality.
     * @throws {AppwriteException}
     * @returns {string}
     */
    getCreditCard(params: { code: CreditCard, width?: number, height?: number, quality?: number  }): string;
    /**
     * The credit card endpoint will return you the icon of the credit card provider you need. Use width, height and quality arguments to change the output settings.
     * 
     * When one dimension is specified and the other is 0, the image is scaled with preserved aspect ratio. If both dimensions are 0, the API provides an image at source quality. If dimensions are not specified, the default size of image returned is 100x100px.
     * 
     *
     * @param {CreditCard} code - Credit Card Code. Possible values: amex, argencard, cabal, cencosud, diners, discover, elo, hipercard, jcb, mastercard, naranja, targeta-shopping, union-china-pay, visa, mir, maestro, rupay.
     * @param {number} width - Image width. Pass an integer between 0 to 2000. Defaults to 100.
     * @param {number} height - Image height. Pass an integer between 0 to 2000. Defaults to 100.
     * @param {number} quality - Image quality. Pass an integer between 0 to 100. Defaults to keep existing image quality.
     * @throws {AppwriteException}
     * @returns {string}
     * @deprecated Use the object parameter style method for a better developer experience.
     */
    getCreditCard(code: CreditCard, width?: number, height?: number, quality?: number): string;
    getCreditCard(
        paramsOrFirst: { code: CreditCard, width?: number, height?: number, quality?: number } | CreditCard,
        ...rest: [(number)?, (number)?, (number)?]    
    ): string {
        let params: { code: CreditCard, width?: number, height?: number, quality?: number };
        
        if ((paramsOrFirst && typeof paramsOrFirst === 'object' && !Array.isArray(paramsOrFirst) && 'code' in paramsOrFirst)) {
            params = (paramsOrFirst || {}) as { code: CreditCard, width?: number, height?: number, quality?: number };
        } else {
            params = {
                code: paramsOrFirst as CreditCard,
                width: rest[0] as number,
                height: rest[1] as number,
                quality: rest[2] as number            
            };
        }
        
        const code = params.code;
        const width = params.width;
        const height = params.height;
        const quality = params.quality;

        if (typeof code === 'undefined') {
            throw new AppwriteException('Missing required parameter: "code"');
        }

        const apiPath = '/avatars/credit-cards/{code}'.replace('{code}', code);
        const payload: Payload = {};
        if (typeof width !== 'undefined') {
            payload['width'] = width;
        }
        if (typeof height !== 'undefined') {
            payload['height'] = height;
        }
        if (typeof quality !== 'undefined') {
            payload['quality'] = quality;
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
     * Use this endpoint to fetch the favorite icon (AKA favicon) of any remote website URL.
     * 
     * This endpoint does not follow HTTP redirects.
     *
     * @param {string} params.url - Website URL which you want to fetch the favicon from.
     * @throws {AppwriteException}
     * @returns {string}
     */
    getFavicon(params: { url: string  }): string;
    /**
     * Use this endpoint to fetch the favorite icon (AKA favicon) of any remote website URL.
     * 
     * This endpoint does not follow HTTP redirects.
     *
     * @param {string} url - Website URL which you want to fetch the favicon from.
     * @throws {AppwriteException}
     * @returns {string}
     * @deprecated Use the object parameter style method for a better developer experience.
     */
    getFavicon(url: string): string;
    getFavicon(
        paramsOrFirst: { url: string } | string    
    ): string {
        let params: { url: string };
        
        if ((paramsOrFirst && typeof paramsOrFirst === 'object' && !Array.isArray(paramsOrFirst))) {
            params = (paramsOrFirst || {}) as { url: string };
        } else {
            params = {
                url: paramsOrFirst as string            
            };
        }
        
        const url = params.url;

        if (typeof url === 'undefined') {
            throw new AppwriteException('Missing required parameter: "url"');
        }

        const apiPath = '/avatars/favicon';
        const payload: Payload = {};
        if (typeof url !== 'undefined') {
            payload['url'] = url;
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
     * You can use this endpoint to show different country flags icons to your users. The code argument receives the 2 letter country code. Use width, height and quality arguments to change the output settings. Country codes follow the [ISO 3166-1](https://en.wikipedia.org/wiki/ISO_3166-1) standard.
     * 
     * When one dimension is specified and the other is 0, the image is scaled with preserved aspect ratio. If both dimensions are 0, the API provides an image at source quality. If dimensions are not specified, the default size of image returned is 100x100px.
     * 
     *
     * @param {Flag} params.code - Country Code. ISO Alpha-2 country code format.
     * @param {number} params.width - Image width. Pass an integer between 0 to 2000. Defaults to 100.
     * @param {number} params.height - Image height. Pass an integer between 0 to 2000. Defaults to 100.
     * @param {number} params.quality - Image quality. Pass an integer between 0 to 100. Defaults to keep existing image quality.
     * @throws {AppwriteException}
     * @returns {string}
     */
    getFlag(params: { code: Flag, width?: number, height?: number, quality?: number  }): string;
    /**
     * You can use this endpoint to show different country flags icons to your users. The code argument receives the 2 letter country code. Use width, height and quality arguments to change the output settings. Country codes follow the [ISO 3166-1](https://en.wikipedia.org/wiki/ISO_3166-1) standard.
     * 
     * When one dimension is specified and the other is 0, the image is scaled with preserved aspect ratio. If both dimensions are 0, the API provides an image at source quality. If dimensions are not specified, the default size of image returned is 100x100px.
     * 
     *
     * @param {Flag} code - Country Code. ISO Alpha-2 country code format.
     * @param {number} width - Image width. Pass an integer between 0 to 2000. Defaults to 100.
     * @param {number} height - Image height. Pass an integer between 0 to 2000. Defaults to 100.
     * @param {number} quality - Image quality. Pass an integer between 0 to 100. Defaults to keep existing image quality.
     * @throws {AppwriteException}
     * @returns {string}
     * @deprecated Use the object parameter style method for a better developer experience.
     */
    getFlag(code: Flag, width?: number, height?: number, quality?: number): string;
    getFlag(
        paramsOrFirst: { code: Flag, width?: number, height?: number, quality?: number } | Flag,
        ...rest: [(number)?, (number)?, (number)?]    
    ): string {
        let params: { code: Flag, width?: number, height?: number, quality?: number };
        
        if ((paramsOrFirst && typeof paramsOrFirst === 'object' && !Array.isArray(paramsOrFirst) && 'code' in paramsOrFirst)) {
            params = (paramsOrFirst || {}) as { code: Flag, width?: number, height?: number, quality?: number };
        } else {
            params = {
                code: paramsOrFirst as Flag,
                width: rest[0] as number,
                height: rest[1] as number,
                quality: rest[2] as number            
            };
        }
        
        const code = params.code;
        const width = params.width;
        const height = params.height;
        const quality = params.quality;

        if (typeof code === 'undefined') {
            throw new AppwriteException('Missing required parameter: "code"');
        }

        const apiPath = '/avatars/flags/{code}'.replace('{code}', code);
        const payload: Payload = {};
        if (typeof width !== 'undefined') {
            payload['width'] = width;
        }
        if (typeof height !== 'undefined') {
            payload['height'] = height;
        }
        if (typeof quality !== 'undefined') {
            payload['quality'] = quality;
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
     * Use this endpoint to fetch a remote image URL and crop it to any image size you want. This endpoint is very useful if you need to crop and display remote images in your app or in case you want to make sure a 3rd party image is properly served using a TLS protocol.
     * 
     * When one dimension is specified and the other is 0, the image is scaled with preserved aspect ratio. If both dimensions are 0, the API provides an image at source quality. If dimensions are not specified, the default size of image returned is 400x400px.
     * 
     * This endpoint does not follow HTTP redirects.
     *
     * @param {string} params.url - Image URL which you want to crop.
     * @param {number} params.width - Resize preview image width, Pass an integer between 0 to 2000. Defaults to 400.
     * @param {number} params.height - Resize preview image height, Pass an integer between 0 to 2000. Defaults to 400.
     * @throws {AppwriteException}
     * @returns {string}
     */
    getImage(params: { url: string, width?: number, height?: number  }): string;
    /**
     * Use this endpoint to fetch a remote image URL and crop it to any image size you want. This endpoint is very useful if you need to crop and display remote images in your app or in case you want to make sure a 3rd party image is properly served using a TLS protocol.
     * 
     * When one dimension is specified and the other is 0, the image is scaled with preserved aspect ratio. If both dimensions are 0, the API provides an image at source quality. If dimensions are not specified, the default size of image returned is 400x400px.
     * 
     * This endpoint does not follow HTTP redirects.
     *
     * @param {string} url - Image URL which you want to crop.
     * @param {number} width - Resize preview image width, Pass an integer between 0 to 2000. Defaults to 400.
     * @param {number} height - Resize preview image height, Pass an integer between 0 to 2000. Defaults to 400.
     * @throws {AppwriteException}
     * @returns {string}
     * @deprecated Use the object parameter style method for a better developer experience.
     */
    getImage(url: string, width?: number, height?: number): string;
    getImage(
        paramsOrFirst: { url: string, width?: number, height?: number } | string,
        ...rest: [(number)?, (number)?]    
    ): string {
        let params: { url: string, width?: number, height?: number };
        
        if ((paramsOrFirst && typeof paramsOrFirst === 'object' && !Array.isArray(paramsOrFirst))) {
            params = (paramsOrFirst || {}) as { url: string, width?: number, height?: number };
        } else {
            params = {
                url: paramsOrFirst as string,
                width: rest[0] as number,
                height: rest[1] as number            
            };
        }
        
        const url = params.url;
        const width = params.width;
        const height = params.height;

        if (typeof url === 'undefined') {
            throw new AppwriteException('Missing required parameter: "url"');
        }

        const apiPath = '/avatars/image';
        const payload: Payload = {};
        if (typeof url !== 'undefined') {
            payload['url'] = url;
        }
        if (typeof width !== 'undefined') {
            payload['width'] = width;
        }
        if (typeof height !== 'undefined') {
            payload['height'] = height;
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
     * Use this endpoint to show your user initials avatar icon on your website or app. By default, this route will try to print your logged-in user name or email initials. You can also overwrite the user name if you pass the 'name' parameter. If no name is given and no user is logged, an empty avatar will be returned.
     * 
     * You can use the color and background params to change the avatar colors. By default, a random theme will be selected. The random theme will persist for the user's initials when reloading the same theme will always return for the same initials.
     * 
     * When one dimension is specified and the other is 0, the image is scaled with preserved aspect ratio. If both dimensions are 0, the API provides an image at source quality. If dimensions are not specified, the default size of image returned is 100x100px.
     * 
     *
     * @param {string} params.name - Full Name. When empty, current user name or email will be used. Max length: 128 chars.
     * @param {number} params.width - Image width. Pass an integer between 0 to 2000. Defaults to 100.
     * @param {number} params.height - Image height. Pass an integer between 0 to 2000. Defaults to 100.
     * @param {string} params.background - Changes background color. By default a random color will be picked and stay will persistent to the given name.
     * @throws {AppwriteException}
     * @returns {string}
     */
    getInitials(params?: { name?: string, width?: number, height?: number, background?: string  }): string;
    /**
     * Use this endpoint to show your user initials avatar icon on your website or app. By default, this route will try to print your logged-in user name or email initials. You can also overwrite the user name if you pass the 'name' parameter. If no name is given and no user is logged, an empty avatar will be returned.
     * 
     * You can use the color and background params to change the avatar colors. By default, a random theme will be selected. The random theme will persist for the user's initials when reloading the same theme will always return for the same initials.
     * 
     * When one dimension is specified and the other is 0, the image is scaled with preserved aspect ratio. If both dimensions are 0, the API provides an image at source quality. If dimensions are not specified, the default size of image returned is 100x100px.
     * 
     *
     * @param {string} name - Full Name. When empty, current user name or email will be used. Max length: 128 chars.
     * @param {number} width - Image width. Pass an integer between 0 to 2000. Defaults to 100.
     * @param {number} height - Image height. Pass an integer between 0 to 2000. Defaults to 100.
     * @param {string} background - Changes background color. By default a random color will be picked and stay will persistent to the given name.
     * @throws {AppwriteException}
     * @returns {string}
     * @deprecated Use the object parameter style method for a better developer experience.
     */
    getInitials(name?: string, width?: number, height?: number, background?: string): string;
    getInitials(
        paramsOrFirst?: { name?: string, width?: number, height?: number, background?: string } | string,
        ...rest: [(number)?, (number)?, (string)?]    
    ): string {
        let params: { name?: string, width?: number, height?: number, background?: string };
        
        if (!paramsOrFirst || (paramsOrFirst && typeof paramsOrFirst === 'object' && !Array.isArray(paramsOrFirst))) {
            params = (paramsOrFirst || {}) as { name?: string, width?: number, height?: number, background?: string };
        } else {
            params = {
                name: paramsOrFirst as string,
                width: rest[0] as number,
                height: rest[1] as number,
                background: rest[2] as string            
            };
        }
        
        const name = params.name;
        const width = params.width;
        const height = params.height;
        const background = params.background;


        const apiPath = '/avatars/initials';
        const payload: Payload = {};
        if (typeof name !== 'undefined') {
            payload['name'] = name;
        }
        if (typeof width !== 'undefined') {
            payload['width'] = width;
        }
        if (typeof height !== 'undefined') {
            payload['height'] = height;
        }
        if (typeof background !== 'undefined') {
            payload['background'] = background;
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
     * Converts a given plain text to a QR code image. You can use the query parameters to change the size and style of the resulting image.
     * 
     *
     * @param {string} params.text - Plain text to be converted to QR code image.
     * @param {number} params.size - QR code size. Pass an integer between 1 to 1000. Defaults to 400.
     * @param {number} params.margin - Margin from edge. Pass an integer between 0 to 10. Defaults to 1.
     * @param {boolean} params.download - Return resulting image with 'Content-Disposition: attachment ' headers for the browser to start downloading it. Pass 0 for no header, or 1 for otherwise. Default value is set to 0.
     * @throws {AppwriteException}
     * @returns {string}
     */
    getQR(params: { text: string, size?: number, margin?: number, download?: boolean  }): string;
    /**
     * Converts a given plain text to a QR code image. You can use the query parameters to change the size and style of the resulting image.
     * 
     *
     * @param {string} text - Plain text to be converted to QR code image.
     * @param {number} size - QR code size. Pass an integer between 1 to 1000. Defaults to 400.
     * @param {number} margin - Margin from edge. Pass an integer between 0 to 10. Defaults to 1.
     * @param {boolean} download - Return resulting image with 'Content-Disposition: attachment ' headers for the browser to start downloading it. Pass 0 for no header, or 1 for otherwise. Default value is set to 0.
     * @throws {AppwriteException}
     * @returns {string}
     * @deprecated Use the object parameter style method for a better developer experience.
     */
    getQR(text: string, size?: number, margin?: number, download?: boolean): string;
    getQR(
        paramsOrFirst: { text: string, size?: number, margin?: number, download?: boolean } | string,
        ...rest: [(number)?, (number)?, (boolean)?]    
    ): string {
        let params: { text: string, size?: number, margin?: number, download?: boolean };
        
        if ((paramsOrFirst && typeof paramsOrFirst === 'object' && !Array.isArray(paramsOrFirst))) {
            params = (paramsOrFirst || {}) as { text: string, size?: number, margin?: number, download?: boolean };
        } else {
            params = {
                text: paramsOrFirst as string,
                size: rest[0] as number,
                margin: rest[1] as number,
                download: rest[2] as boolean            
            };
        }
        
        const text = params.text;
        const size = params.size;
        const margin = params.margin;
        const download = params.download;

        if (typeof text === 'undefined') {
            throw new AppwriteException('Missing required parameter: "text"');
        }

        const apiPath = '/avatars/qr';
        const payload: Payload = {};
        if (typeof text !== 'undefined') {
            payload['text'] = text;
        }
        if (typeof size !== 'undefined') {
            payload['size'] = size;
        }
        if (typeof margin !== 'undefined') {
            payload['margin'] = margin;
        }
        if (typeof download !== 'undefined') {
            payload['download'] = download;
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
