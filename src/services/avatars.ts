import {
    AppwriteException,
    Client,
    type Payload,
    UploadProgress,
} from '../client';
import type { Models } from '../models';

import { Browser } from '../enums/browser';
import { CreditCard } from '../enums/credit-card';
import { Flag } from '../enums/flag';
import { BrowserTheme } from '../enums/browser-theme';
import { Timezone } from '../enums/timezone';
import { BrowserPermission } from '../enums/browser-permission';
import { ImageFormat } from '../enums/image-format';
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
    getBrowser(params: {
        code: Browser;
        width?: number;
        height?: number;
        quality?: number;
    }): string;
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
    getBrowser(
        code: Browser,
        width?: number,
        height?: number,
        quality?: number,
    ): string;
    getBrowser(
        paramsOrFirst:
            | {
                  code: Browser;
                  width?: number;
                  height?: number;
                  quality?: number;
              }
            | Browser,
        ...rest: [number?, number?, number?]
    ): string {
        let params: {
            code: Browser;
            width?: number;
            height?: number;
            quality?: number;
        };

        if (
            paramsOrFirst &&
            typeof paramsOrFirst === 'object' &&
            !Array.isArray(paramsOrFirst) &&
            ('code' in paramsOrFirst ||
                'width' in paramsOrFirst ||
                'height' in paramsOrFirst ||
                'quality' in paramsOrFirst)
        ) {
            params = (paramsOrFirst || {}) as {
                code: Browser;
                width?: number;
                height?: number;
                quality?: number;
            };
        } else {
            params = {
                code: paramsOrFirst as Browser,
                width: rest[0] as number,
                height: rest[1] as number,
                quality: rest[2] as number,
            };
        }

        const code = params.code;
        const width = params.width;
        const height = params.height;
        const quality = params.quality;

        if (typeof code === 'undefined') {
            throw new AppwriteException('Missing required parameter: "code"');
        }
        const apiPath = '/avatars/browsers/{code}'.replace(
            '{code}',
            encodeURIComponent(String(code)),
        );
        const apiPayload: Payload = {};
        if (typeof width !== 'undefined') {
            apiPayload['width'] = width;
        }
        if (typeof height !== 'undefined') {
            apiPayload['height'] = height;
        }
        if (typeof quality !== 'undefined') {
            apiPayload['quality'] = quality;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);

        apiPayload['project'] = this.client.config.project;
        apiPayload['impersonateuserid'] = this.client.config.impersonateuserid;

        for (const [key, value] of Object.entries(Client.flatten(apiPayload))) {
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
     * @param {CreditCard} params.code - Credit Card Code. Possible values: amex, argencard, cabal, cencosud, diners, discover, elo, hipercard, jcb, mastercard, naranja, targeta-shopping, unionpay, visa, mir, maestro, rupay.
     * @param {number} params.width - Image width. Pass an integer between 0 to 2000. Defaults to 100.
     * @param {number} params.height - Image height. Pass an integer between 0 to 2000. Defaults to 100.
     * @param {number} params.quality - Image quality. Pass an integer between 0 to 100. Defaults to keep existing image quality.
     * @throws {AppwriteException}
     * @returns {string}
     */
    getCreditCard(params: {
        code: CreditCard;
        width?: number;
        height?: number;
        quality?: number;
    }): string;
    /**
     * The credit card endpoint will return you the icon of the credit card provider you need. Use width, height and quality arguments to change the output settings.
     *
     * When one dimension is specified and the other is 0, the image is scaled with preserved aspect ratio. If both dimensions are 0, the API provides an image at source quality. If dimensions are not specified, the default size of image returned is 100x100px.
     *
     *
     * @param {CreditCard} code - Credit Card Code. Possible values: amex, argencard, cabal, cencosud, diners, discover, elo, hipercard, jcb, mastercard, naranja, targeta-shopping, unionpay, visa, mir, maestro, rupay.
     * @param {number} width - Image width. Pass an integer between 0 to 2000. Defaults to 100.
     * @param {number} height - Image height. Pass an integer between 0 to 2000. Defaults to 100.
     * @param {number} quality - Image quality. Pass an integer between 0 to 100. Defaults to keep existing image quality.
     * @throws {AppwriteException}
     * @returns {string}
     * @deprecated Use the object parameter style method for a better developer experience.
     */
    getCreditCard(
        code: CreditCard,
        width?: number,
        height?: number,
        quality?: number,
    ): string;
    getCreditCard(
        paramsOrFirst:
            | {
                  code: CreditCard;
                  width?: number;
                  height?: number;
                  quality?: number;
              }
            | CreditCard,
        ...rest: [number?, number?, number?]
    ): string {
        let params: {
            code: CreditCard;
            width?: number;
            height?: number;
            quality?: number;
        };

        if (
            paramsOrFirst &&
            typeof paramsOrFirst === 'object' &&
            !Array.isArray(paramsOrFirst) &&
            ('code' in paramsOrFirst ||
                'width' in paramsOrFirst ||
                'height' in paramsOrFirst ||
                'quality' in paramsOrFirst)
        ) {
            params = (paramsOrFirst || {}) as {
                code: CreditCard;
                width?: number;
                height?: number;
                quality?: number;
            };
        } else {
            params = {
                code: paramsOrFirst as CreditCard,
                width: rest[0] as number,
                height: rest[1] as number,
                quality: rest[2] as number,
            };
        }

        const code = params.code;
        const width = params.width;
        const height = params.height;
        const quality = params.quality;

        if (typeof code === 'undefined') {
            throw new AppwriteException('Missing required parameter: "code"');
        }
        const apiPath = '/avatars/credit-cards/{code}'.replace(
            '{code}',
            encodeURIComponent(String(code)),
        );
        const apiPayload: Payload = {};
        if (typeof width !== 'undefined') {
            apiPayload['width'] = width;
        }
        if (typeof height !== 'undefined') {
            apiPayload['height'] = height;
        }
        if (typeof quality !== 'undefined') {
            apiPayload['quality'] = quality;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);

        apiPayload['project'] = this.client.config.project;
        apiPayload['impersonateuserid'] = this.client.config.impersonateuserid;

        for (const [key, value] of Object.entries(Client.flatten(apiPayload))) {
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
    getFavicon(params: { url: string }): string;
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
    getFavicon(paramsOrFirst: { url: string } | string): string {
        let params: { url: string };

        if (
            paramsOrFirst &&
            typeof paramsOrFirst === 'object' &&
            !Array.isArray(paramsOrFirst)
        ) {
            params = (paramsOrFirst || {}) as { url: string };
        } else {
            params = {
                url: paramsOrFirst as string,
            };
        }

        const url = params.url;

        if (typeof url === 'undefined') {
            throw new AppwriteException('Missing required parameter: "url"');
        }
        const apiPath = '/avatars/favicon';
        const apiPayload: Payload = {};
        if (typeof url !== 'undefined') {
            apiPayload['url'] = url;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);

        apiPayload['project'] = this.client.config.project;
        apiPayload['impersonateuserid'] = this.client.config.impersonateuserid;

        for (const [key, value] of Object.entries(Client.flatten(apiPayload))) {
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
    getFlag(params: {
        code: Flag;
        width?: number;
        height?: number;
        quality?: number;
    }): string;
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
    getFlag(
        code: Flag,
        width?: number,
        height?: number,
        quality?: number,
    ): string;
    getFlag(
        paramsOrFirst:
            | { code: Flag; width?: number; height?: number; quality?: number }
            | Flag,
        ...rest: [number?, number?, number?]
    ): string {
        let params: {
            code: Flag;
            width?: number;
            height?: number;
            quality?: number;
        };

        if (
            paramsOrFirst &&
            typeof paramsOrFirst === 'object' &&
            !Array.isArray(paramsOrFirst) &&
            ('code' in paramsOrFirst ||
                'width' in paramsOrFirst ||
                'height' in paramsOrFirst ||
                'quality' in paramsOrFirst)
        ) {
            params = (paramsOrFirst || {}) as {
                code: Flag;
                width?: number;
                height?: number;
                quality?: number;
            };
        } else {
            params = {
                code: paramsOrFirst as Flag,
                width: rest[0] as number,
                height: rest[1] as number,
                quality: rest[2] as number,
            };
        }

        const code = params.code;
        const width = params.width;
        const height = params.height;
        const quality = params.quality;

        if (typeof code === 'undefined') {
            throw new AppwriteException('Missing required parameter: "code"');
        }
        const apiPath = '/avatars/flags/{code}'.replace(
            '{code}',
            encodeURIComponent(String(code)),
        );
        const apiPayload: Payload = {};
        if (typeof width !== 'undefined') {
            apiPayload['width'] = width;
        }
        if (typeof height !== 'undefined') {
            apiPayload['height'] = height;
        }
        if (typeof quality !== 'undefined') {
            apiPayload['quality'] = quality;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);

        apiPayload['project'] = this.client.config.project;
        apiPayload['impersonateuserid'] = this.client.config.impersonateuserid;

        for (const [key, value] of Object.entries(Client.flatten(apiPayload))) {
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
    getImage(params: { url: string; width?: number; height?: number }): string;
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
        paramsOrFirst:
            { url: string; width?: number; height?: number } | string,
        ...rest: [number?, number?]
    ): string {
        let params: { url: string; width?: number; height?: number };

        if (
            paramsOrFirst &&
            typeof paramsOrFirst === 'object' &&
            !Array.isArray(paramsOrFirst)
        ) {
            params = (paramsOrFirst || {}) as {
                url: string;
                width?: number;
                height?: number;
            };
        } else {
            params = {
                url: paramsOrFirst as string,
                width: rest[0] as number,
                height: rest[1] as number,
            };
        }

        const url = params.url;
        const width = params.width;
        const height = params.height;

        if (typeof url === 'undefined') {
            throw new AppwriteException('Missing required parameter: "url"');
        }
        const apiPath = '/avatars/image';
        const apiPayload: Payload = {};
        if (typeof url !== 'undefined') {
            apiPayload['url'] = url;
        }
        if (typeof width !== 'undefined') {
            apiPayload['width'] = width;
        }
        if (typeof height !== 'undefined') {
            apiPayload['height'] = height;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);

        apiPayload['project'] = this.client.config.project;
        apiPayload['impersonateuserid'] = this.client.config.impersonateuserid;

        for (const [key, value] of Object.entries(Client.flatten(apiPayload))) {
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
    getInitials(params?: {
        name?: string;
        width?: number;
        height?: number;
        background?: string;
    }): string;
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
    getInitials(
        name?: string,
        width?: number,
        height?: number,
        background?: string,
    ): string;
    getInitials(
        paramsOrFirst?:
            | {
                  name?: string;
                  width?: number;
                  height?: number;
                  background?: string;
              }
            | string,
        ...rest: [number?, number?, string?]
    ): string {
        let params: {
            name?: string;
            width?: number;
            height?: number;
            background?: string;
        };

        if (
            (typeof paramsOrFirst === 'undefined' && rest.length === 0) ||
            (paramsOrFirst &&
                typeof paramsOrFirst === 'object' &&
                !Array.isArray(paramsOrFirst))
        ) {
            params = (paramsOrFirst || {}) as {
                name?: string;
                width?: number;
                height?: number;
                background?: string;
            };
        } else {
            params = {
                name: paramsOrFirst as string,
                width: rest[0] as number,
                height: rest[1] as number,
                background: rest[2] as string,
            };
        }

        const name = params.name;
        const width = params.width;
        const height = params.height;
        const background = params.background;

        const apiPath = '/avatars/initials';
        const apiPayload: Payload = {};
        if (typeof name !== 'undefined') {
            apiPayload['name'] = name;
        }
        if (typeof width !== 'undefined') {
            apiPayload['width'] = width;
        }
        if (typeof height !== 'undefined') {
            apiPayload['height'] = height;
        }
        if (typeof background !== 'undefined') {
            apiPayload['background'] = background;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);

        apiPayload['project'] = this.client.config.project;
        apiPayload['impersonateuserid'] = this.client.config.impersonateuserid;

        for (const [key, value] of Object.entries(Client.flatten(apiPayload))) {
            uri.searchParams.append(key, value);
        }

        return uri.toString();
    }

    /**
     * Returns the best available profile photo for a user. The endpoint tries each source in priority order and returns the first successful result: a custom uploaded photo (see avatars.updatePhoto), OAuth2 identity photo, Gravatar, Libravatar, Appwrite Initials, built-in static fallback.
     *
     * Passing `userId` — `current()` for the authenticated user — resolves the photo from everything known about that user: identity photos, email, and name. An explicit `emailHash` or `name` then overrides just that value, and the user's remaining sources stay in the chain. Without `userId`, passing `emailHash` and/or `name` resolves the avatar from those values alone: the hash is looked up on Gravatar and Libravatar, the name is rendered as initials, and the session user stays out of the chain so their own photo never shadows the avatar being asked for. When nothing is passed, the photo resolves for the currently authenticated user. Emails are only ever accepted pre-hashed, so no address ends up in a URL.
     *
     * @param {number} params.width - Output image width in pixels. Pass an integer between 0 and 2000. Defaults to 256.
     * @param {number} params.height - Output image height in pixels. Pass an integer between 0 and 2000. Defaults to 256.
     * @param {number} params.quality - Output image quality between 0 and 100. Defaults to 100.
     * @param {string} params.output - Output image format. Defaults to 'png'.
     * @param {string} params.rating - Maximum image rating to fetch from Gravatar/Libravatar. Defaults to 'g'.
     * @param {string} params.userId - User ID to resolve the photo for. Pass 'current()' for the currently authenticated user. When omitted, the session user is used only if no emailHash and no name is passed.
     * @param {string} params.emailHash - SHA256 hash of the lowercase, trimmed email address to look up on Gravatar and Libravatar instead of the user's own email. Pass the hash, never the address itself.
     * @param {string} params.name - Name to render initials from instead of the user's own name. Max length: 128 chars.
     * @throws {AppwriteException}
     * @returns {string}
     */
    getPhoto(params?: {
        width?: number;
        height?: number;
        quality?: number;
        output?: string;
        rating?: string;
        userId?: string;
        emailHash?: string;
        name?: string;
    }): string;
    /**
     * Returns the best available profile photo for a user. The endpoint tries each source in priority order and returns the first successful result: a custom uploaded photo (see avatars.updatePhoto), OAuth2 identity photo, Gravatar, Libravatar, Appwrite Initials, built-in static fallback.
     *
     * Passing `userId` — `current()` for the authenticated user — resolves the photo from everything known about that user: identity photos, email, and name. An explicit `emailHash` or `name` then overrides just that value, and the user's remaining sources stay in the chain. Without `userId`, passing `emailHash` and/or `name` resolves the avatar from those values alone: the hash is looked up on Gravatar and Libravatar, the name is rendered as initials, and the session user stays out of the chain so their own photo never shadows the avatar being asked for. When nothing is passed, the photo resolves for the currently authenticated user. Emails are only ever accepted pre-hashed, so no address ends up in a URL.
     *
     * @param {number} width - Output image width in pixels. Pass an integer between 0 and 2000. Defaults to 256.
     * @param {number} height - Output image height in pixels. Pass an integer between 0 and 2000. Defaults to 256.
     * @param {number} quality - Output image quality between 0 and 100. Defaults to 100.
     * @param {string} output - Output image format. Defaults to 'png'.
     * @param {string} rating - Maximum image rating to fetch from Gravatar/Libravatar. Defaults to 'g'.
     * @param {string} userId - User ID to resolve the photo for. Pass 'current()' for the currently authenticated user. When omitted, the session user is used only if no emailHash and no name is passed.
     * @param {string} emailHash - SHA256 hash of the lowercase, trimmed email address to look up on Gravatar and Libravatar instead of the user's own email. Pass the hash, never the address itself.
     * @param {string} name - Name to render initials from instead of the user's own name. Max length: 128 chars.
     * @throws {AppwriteException}
     * @returns {string}
     * @deprecated Use the object parameter style method for a better developer experience.
     */
    getPhoto(
        width?: number,
        height?: number,
        quality?: number,
        output?: string,
        rating?: string,
        userId?: string,
        emailHash?: string,
        name?: string,
    ): string;
    getPhoto(
        paramsOrFirst?:
            | {
                  width?: number;
                  height?: number;
                  quality?: number;
                  output?: string;
                  rating?: string;
                  userId?: string;
                  emailHash?: string;
                  name?: string;
              }
            | number,
        ...rest: [number?, number?, string?, string?, string?, string?, string?]
    ): string {
        let params: {
            width?: number;
            height?: number;
            quality?: number;
            output?: string;
            rating?: string;
            userId?: string;
            emailHash?: string;
            name?: string;
        };

        if (
            (typeof paramsOrFirst === 'undefined' && rest.length === 0) ||
            (paramsOrFirst &&
                typeof paramsOrFirst === 'object' &&
                !Array.isArray(paramsOrFirst))
        ) {
            params = (paramsOrFirst || {}) as {
                width?: number;
                height?: number;
                quality?: number;
                output?: string;
                rating?: string;
                userId?: string;
                emailHash?: string;
                name?: string;
            };
        } else {
            params = {
                width: paramsOrFirst as number,
                height: rest[0] as number,
                quality: rest[1] as number,
                output: rest[2] as string,
                rating: rest[3] as string,
                userId: rest[4] as string,
                emailHash: rest[5] as string,
                name: rest[6] as string,
            };
        }

        const width = params.width;
        const height = params.height;
        const quality = params.quality;
        const output = params.output;
        const rating = params.rating;
        const userId = params.userId;
        const emailHash = params.emailHash;
        const name = params.name;

        const apiPath = '/avatars/photo';
        const apiPayload: Payload = {};
        if (typeof width !== 'undefined') {
            apiPayload['width'] = width;
        }
        if (typeof height !== 'undefined') {
            apiPayload['height'] = height;
        }
        if (typeof quality !== 'undefined') {
            apiPayload['quality'] = quality;
        }
        if (typeof output !== 'undefined') {
            apiPayload['output'] = output;
        }
        if (typeof rating !== 'undefined') {
            apiPayload['rating'] = rating;
        }
        if (typeof userId !== 'undefined') {
            apiPayload['userId'] = userId;
        }
        if (typeof emailHash !== 'undefined') {
            apiPayload['emailHash'] = emailHash;
        }
        if (typeof name !== 'undefined') {
            apiPayload['name'] = name;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);

        apiPayload['project'] = this.client.config.project;
        apiPayload['impersonateuserid'] = this.client.config.impersonateuserid;

        for (const [key, value] of Object.entries(Client.flatten(apiPayload))) {
            uri.searchParams.append(key, value);
        }

        return uri.toString();
    }

    /**
     * Update the profile photo of the currently authenticated user. The uploaded image takes priority over every other photo source, including OAuth2 identity photos, Gravatar, and Libravatar. Updating an already customized photo replaces it. The image must be at most 5MB and is sent in a single request.
     *
     * @param {File} params.file - Binary image file of at most 5MB. Allowed file types are png, jpg, jpeg, and webp.
     * @throws {AppwriteException}
     * @returns {Promise<Models.Account<Preferences>>}
     */
    updatePhoto<
        Preferences extends Models.Preferences = Models.DefaultPreferences,
    >(params: {
        file: File;
        onProgress?: (progress: UploadProgress) => void;
    }): Promise<Models.Account<Preferences>>;
    /**
     * Update the profile photo of the currently authenticated user. The uploaded image takes priority over every other photo source, including OAuth2 identity photos, Gravatar, and Libravatar. Updating an already customized photo replaces it. The image must be at most 5MB and is sent in a single request.
     *
     * @param {File} file - Binary image file of at most 5MB. Allowed file types are png, jpg, jpeg, and webp.
     * @throws {AppwriteException}
     * @returns {Promise<Models.Account<Preferences>>}
     * @deprecated Use the object parameter style method for a better developer experience.
     */
    updatePhoto<
        Preferences extends Models.Preferences = Models.DefaultPreferences,
    >(
        file: File,
        onProgress?: (progress: UploadProgress) => void,
    ): Promise<Models.Account<Preferences>>;
    updatePhoto<
        Preferences extends Models.Preferences = Models.DefaultPreferences,
    >(
        paramsOrFirst:
            | { file: File; onProgress?: (progress: UploadProgress) => void }
            | File,
        ...rest: [((progress: UploadProgress) => void)?]
    ): Promise<Models.Account<Preferences>> {
        let params: { file: File };
        let onProgress: (progress: UploadProgress) => void;

        if (
            paramsOrFirst &&
            typeof paramsOrFirst === 'object' &&
            !Array.isArray(paramsOrFirst) &&
            ('file' in paramsOrFirst || 'onProgress' in paramsOrFirst)
        ) {
            params = (paramsOrFirst || {}) as { file: File };
            onProgress = paramsOrFirst?.onProgress as (
                progress: UploadProgress,
            ) => void;
        } else {
            params = {
                file: paramsOrFirst as File,
            };
            onProgress = rest[0] as (progress: UploadProgress) => void;
        }

        const file = params.file;

        if (typeof file === 'undefined') {
            throw new AppwriteException('Missing required parameter: "file"');
        }
        const apiPath = '/avatars/photo';
        const apiPayload: Payload = {};
        if (typeof file !== 'undefined') {
            apiPayload['file'] = file;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);

        const apiHeaders: { [header: string]: string } = {
            'X-Appwrite-Project': this.client.config.project,
            'content-type': 'multipart/form-data',
            accept: 'application/json',
        };

        return this.client.chunkedUpload(
            'put',
            uri,
            apiHeaders,
            apiPayload,
            onProgress,
        );
    }

    /**
     * Delete the profile photo of the currently authenticated user and store the built-in static placeholder in its place. The placeholder is the user's photo from then on, so it takes priority over every other photo source — OAuth2 identity photos, Gravatar, Libravatar, and initials — until a new photo is uploaded with avatars.updatePhoto.
     *
     * @throws {AppwriteException}
     * @returns {Promise<{}>}
     */
    deletePhoto(): Promise<{}> {
        const apiPath = '/avatars/photo';
        const apiPayload: Payload = {};
        const uri = new URL(this.client.config.endpoint + apiPath);

        const apiHeaders: { [header: string]: string } = {
            'X-Appwrite-Project': this.client.config.project,
            'content-type': 'application/json',
            accept: 'application/json',
        };

        return this.client.call('delete', uri, apiHeaders, apiPayload);
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
    getQR(params: {
        text: string;
        size?: number;
        margin?: number;
        download?: boolean;
    }): string;
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
    getQR(
        text: string,
        size?: number,
        margin?: number,
        download?: boolean,
    ): string;
    getQR(
        paramsOrFirst:
            | {
                  text: string;
                  size?: number;
                  margin?: number;
                  download?: boolean;
              }
            | string,
        ...rest: [number?, number?, boolean?]
    ): string {
        let params: {
            text: string;
            size?: number;
            margin?: number;
            download?: boolean;
        };

        if (
            paramsOrFirst &&
            typeof paramsOrFirst === 'object' &&
            !Array.isArray(paramsOrFirst)
        ) {
            params = (paramsOrFirst || {}) as {
                text: string;
                size?: number;
                margin?: number;
                download?: boolean;
            };
        } else {
            params = {
                text: paramsOrFirst as string,
                size: rest[0] as number,
                margin: rest[1] as number,
                download: rest[2] as boolean,
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
        const apiPayload: Payload = {};
        if (typeof text !== 'undefined') {
            apiPayload['text'] = text;
        }
        if (typeof size !== 'undefined') {
            apiPayload['size'] = size;
        }
        if (typeof margin !== 'undefined') {
            apiPayload['margin'] = margin;
        }
        if (typeof download !== 'undefined') {
            apiPayload['download'] = download;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);

        apiPayload['project'] = this.client.config.project;
        apiPayload['impersonateuserid'] = this.client.config.impersonateuserid;

        for (const [key, value] of Object.entries(Client.flatten(apiPayload))) {
            uri.searchParams.append(key, value);
        }

        return uri.toString();
    }

    /**
     * Use this endpoint to capture a screenshot of any website URL. This endpoint uses a headless browser to render the webpage and capture it as an image.
     *
     * You can configure the browser viewport size, theme, user agent, geolocation, permissions, and more. Capture either just the viewport or the full page scroll.
     *
     * When width and height are specified, the image is resized accordingly. If both dimensions are 0, the API provides an image at original size. If dimensions are not specified, the default viewport size is 1280x720px.
     *
     * @param {string} params.url - Website URL which you want to capture.
     * @param {object} params.headers - HTTP headers to send with the browser request. Only Accept and Accept-Language are allowed. Defaults to empty.
     * @param {number} params.viewportWidth - Browser viewport width. Pass an integer between 1 to 1920. Defaults to 1280.
     * @param {number} params.viewportHeight - Browser viewport height. Pass an integer between 1 to 1080. Defaults to 720.
     * @param {number} params.scale - Browser scale factor. Pass a number between 0.1 to 3. Defaults to 1.
     * @param {BrowserTheme} params.theme - Browser theme. Pass "light" or "dark". Defaults to "light".
     * @param {string} params.userAgent - Custom user agent string. Defaults to browser default.
     * @param {boolean} params.fullpage - Capture full page scroll. Pass 0 for viewport only, or 1 for full page. Defaults to 0.
     * @param {string} params.locale - Browser locale (e.g., "en-US", "fr-FR"). Defaults to browser default.
     * @param {Timezone} params.timezone - IANA timezone identifier (e.g., "America/New_York", "Europe/London"). Defaults to browser default.
     * @param {number} params.latitude - Geolocation latitude. Pass a number between -90 to 90. Defaults to 0.
     * @param {number} params.longitude - Geolocation longitude. Pass a number between -180 to 180. Defaults to 0.
     * @param {number} params.accuracy - Geolocation accuracy in meters. Pass a number between 0 to 100000. Defaults to 0.
     * @param {boolean} params.touch - Enable touch support. Pass 0 for no touch, or 1 for touch enabled. Defaults to 0.
     * @param {BrowserPermission[]} params.permissions - Browser permissions to grant. Pass an array of permission names like ["geolocation", "camera", "microphone"]. Defaults to empty.
     * @param {number} params.sleep - Wait time in seconds before taking the screenshot. Pass an integer between 0 to 10. Defaults to 0.
     * @param {number} params.width - Output image width. Pass 0 to use original width, or an integer between 1 to 2000. Defaults to 0 (original width).
     * @param {number} params.height - Output image height. Pass 0 to use original height, or an integer between 1 to 2000. Defaults to 0 (original height).
     * @param {number} params.quality - Screenshot quality. Pass an integer between 0 to 100. Defaults to keep existing image quality.
     * @param {ImageFormat} params.output - Output format type (jpeg, jpg, png, gif and webp).
     * @throws {AppwriteException}
     * @returns {string}
     */
    getScreenshot(params: {
        url: string;
        headers?: object;
        viewportWidth?: number;
        viewportHeight?: number;
        scale?: number;
        theme?: BrowserTheme;
        userAgent?: string;
        fullpage?: boolean;
        locale?: string;
        timezone?: Timezone;
        latitude?: number;
        longitude?: number;
        accuracy?: number;
        touch?: boolean;
        permissions?: BrowserPermission[];
        sleep?: number;
        width?: number;
        height?: number;
        quality?: number;
        output?: ImageFormat;
    }): string;
    /**
     * Use this endpoint to capture a screenshot of any website URL. This endpoint uses a headless browser to render the webpage and capture it as an image.
     *
     * You can configure the browser viewport size, theme, user agent, geolocation, permissions, and more. Capture either just the viewport or the full page scroll.
     *
     * When width and height are specified, the image is resized accordingly. If both dimensions are 0, the API provides an image at original size. If dimensions are not specified, the default viewport size is 1280x720px.
     *
     * @param {string} url - Website URL which you want to capture.
     * @param {object} headers - HTTP headers to send with the browser request. Only Accept and Accept-Language are allowed. Defaults to empty.
     * @param {number} viewportWidth - Browser viewport width. Pass an integer between 1 to 1920. Defaults to 1280.
     * @param {number} viewportHeight - Browser viewport height. Pass an integer between 1 to 1080. Defaults to 720.
     * @param {number} scale - Browser scale factor. Pass a number between 0.1 to 3. Defaults to 1.
     * @param {BrowserTheme} theme - Browser theme. Pass "light" or "dark". Defaults to "light".
     * @param {string} userAgent - Custom user agent string. Defaults to browser default.
     * @param {boolean} fullpage - Capture full page scroll. Pass 0 for viewport only, or 1 for full page. Defaults to 0.
     * @param {string} locale - Browser locale (e.g., "en-US", "fr-FR"). Defaults to browser default.
     * @param {Timezone} timezone - IANA timezone identifier (e.g., "America/New_York", "Europe/London"). Defaults to browser default.
     * @param {number} latitude - Geolocation latitude. Pass a number between -90 to 90. Defaults to 0.
     * @param {number} longitude - Geolocation longitude. Pass a number between -180 to 180. Defaults to 0.
     * @param {number} accuracy - Geolocation accuracy in meters. Pass a number between 0 to 100000. Defaults to 0.
     * @param {boolean} touch - Enable touch support. Pass 0 for no touch, or 1 for touch enabled. Defaults to 0.
     * @param {BrowserPermission[]} permissions - Browser permissions to grant. Pass an array of permission names like ["geolocation", "camera", "microphone"]. Defaults to empty.
     * @param {number} sleep - Wait time in seconds before taking the screenshot. Pass an integer between 0 to 10. Defaults to 0.
     * @param {number} width - Output image width. Pass 0 to use original width, or an integer between 1 to 2000. Defaults to 0 (original width).
     * @param {number} height - Output image height. Pass 0 to use original height, or an integer between 1 to 2000. Defaults to 0 (original height).
     * @param {number} quality - Screenshot quality. Pass an integer between 0 to 100. Defaults to keep existing image quality.
     * @param {ImageFormat} output - Output format type (jpeg, jpg, png, gif and webp).
     * @throws {AppwriteException}
     * @returns {string}
     * @deprecated Use the object parameter style method for a better developer experience.
     */
    getScreenshot(
        url: string,
        headers?: object,
        viewportWidth?: number,
        viewportHeight?: number,
        scale?: number,
        theme?: BrowserTheme,
        userAgent?: string,
        fullpage?: boolean,
        locale?: string,
        timezone?: Timezone,
        latitude?: number,
        longitude?: number,
        accuracy?: number,
        touch?: boolean,
        permissions?: BrowserPermission[],
        sleep?: number,
        width?: number,
        height?: number,
        quality?: number,
        output?: ImageFormat,
    ): string;
    getScreenshot(
        paramsOrFirst:
            | {
                  url: string;
                  headers?: object;
                  viewportWidth?: number;
                  viewportHeight?: number;
                  scale?: number;
                  theme?: BrowserTheme;
                  userAgent?: string;
                  fullpage?: boolean;
                  locale?: string;
                  timezone?: Timezone;
                  latitude?: number;
                  longitude?: number;
                  accuracy?: number;
                  touch?: boolean;
                  permissions?: BrowserPermission[];
                  sleep?: number;
                  width?: number;
                  height?: number;
                  quality?: number;
                  output?: ImageFormat;
              }
            | string,
        ...rest: [
            object?,
            number?,
            number?,
            number?,
            BrowserTheme?,
            string?,
            boolean?,
            string?,
            Timezone?,
            number?,
            number?,
            number?,
            boolean?,
            BrowserPermission[]?,
            number?,
            number?,
            number?,
            number?,
            ImageFormat?,
        ]
    ): string {
        let params: {
            url: string;
            headers?: object;
            viewportWidth?: number;
            viewportHeight?: number;
            scale?: number;
            theme?: BrowserTheme;
            userAgent?: string;
            fullpage?: boolean;
            locale?: string;
            timezone?: Timezone;
            latitude?: number;
            longitude?: number;
            accuracy?: number;
            touch?: boolean;
            permissions?: BrowserPermission[];
            sleep?: number;
            width?: number;
            height?: number;
            quality?: number;
            output?: ImageFormat;
        };

        if (
            paramsOrFirst &&
            typeof paramsOrFirst === 'object' &&
            !Array.isArray(paramsOrFirst)
        ) {
            params = (paramsOrFirst || {}) as {
                url: string;
                headers?: object;
                viewportWidth?: number;
                viewportHeight?: number;
                scale?: number;
                theme?: BrowserTheme;
                userAgent?: string;
                fullpage?: boolean;
                locale?: string;
                timezone?: Timezone;
                latitude?: number;
                longitude?: number;
                accuracy?: number;
                touch?: boolean;
                permissions?: BrowserPermission[];
                sleep?: number;
                width?: number;
                height?: number;
                quality?: number;
                output?: ImageFormat;
            };
        } else {
            params = {
                url: paramsOrFirst as string,
                headers: rest[0] as object,
                viewportWidth: rest[1] as number,
                viewportHeight: rest[2] as number,
                scale: rest[3] as number,
                theme: rest[4] as BrowserTheme,
                userAgent: rest[5] as string,
                fullpage: rest[6] as boolean,
                locale: rest[7] as string,
                timezone: rest[8] as Timezone,
                latitude: rest[9] as number,
                longitude: rest[10] as number,
                accuracy: rest[11] as number,
                touch: rest[12] as boolean,
                permissions: rest[13] as BrowserPermission[],
                sleep: rest[14] as number,
                width: rest[15] as number,
                height: rest[16] as number,
                quality: rest[17] as number,
                output: rest[18] as ImageFormat,
            };
        }

        const url = params.url;
        const headers = params.headers;
        const viewportWidth = params.viewportWidth;
        const viewportHeight = params.viewportHeight;
        const scale = params.scale;
        const theme = params.theme;
        const userAgent = params.userAgent;
        const fullpage = params.fullpage;
        const locale = params.locale;
        const timezone = params.timezone;
        const latitude = params.latitude;
        const longitude = params.longitude;
        const accuracy = params.accuracy;
        const touch = params.touch;
        const permissions = params.permissions;
        const sleep = params.sleep;
        const width = params.width;
        const height = params.height;
        const quality = params.quality;
        const output = params.output;

        if (typeof url === 'undefined') {
            throw new AppwriteException('Missing required parameter: "url"');
        }
        const apiPath = '/avatars/screenshots';
        const apiPayload: Payload = {};
        if (typeof url !== 'undefined') {
            apiPayload['url'] = url;
        }
        if (typeof headers !== 'undefined') {
            apiPayload['headers'] = headers;
        }
        if (typeof viewportWidth !== 'undefined') {
            apiPayload['viewportWidth'] = viewportWidth;
        }
        if (typeof viewportHeight !== 'undefined') {
            apiPayload['viewportHeight'] = viewportHeight;
        }
        if (typeof scale !== 'undefined') {
            apiPayload['scale'] = scale;
        }
        if (typeof theme !== 'undefined') {
            apiPayload['theme'] = theme;
        }
        if (typeof userAgent !== 'undefined') {
            apiPayload['userAgent'] = userAgent;
        }
        if (typeof fullpage !== 'undefined') {
            apiPayload['fullpage'] = fullpage;
        }
        if (typeof locale !== 'undefined') {
            apiPayload['locale'] = locale;
        }
        if (typeof timezone !== 'undefined') {
            apiPayload['timezone'] = timezone;
        }
        if (typeof latitude !== 'undefined') {
            apiPayload['latitude'] = latitude;
        }
        if (typeof longitude !== 'undefined') {
            apiPayload['longitude'] = longitude;
        }
        if (typeof accuracy !== 'undefined') {
            apiPayload['accuracy'] = accuracy;
        }
        if (typeof touch !== 'undefined') {
            apiPayload['touch'] = touch;
        }
        if (typeof permissions !== 'undefined') {
            apiPayload['permissions'] = permissions;
        }
        if (typeof sleep !== 'undefined') {
            apiPayload['sleep'] = sleep;
        }
        if (typeof width !== 'undefined') {
            apiPayload['width'] = width;
        }
        if (typeof height !== 'undefined') {
            apiPayload['height'] = height;
        }
        if (typeof quality !== 'undefined') {
            apiPayload['quality'] = quality;
        }
        if (typeof output !== 'undefined') {
            apiPayload['output'] = output;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);

        apiPayload['project'] = this.client.config.project;
        apiPayload['impersonateuserid'] = this.client.config.impersonateuserid;

        for (const [key, value] of Object.entries(Client.flatten(apiPayload))) {
            uri.searchParams.append(key, value);
        }

        return uri.toString();
    }
}
