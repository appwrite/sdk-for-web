import { Service } from '../service';
import { AppwriteException, Client, type Payload, UploadProgress } from '../client';
import type { Models } from '../models';

export class Locale {
    client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    /**
     * Get user locale
     *
     * Get the current user location based on IP. Returns an object with user country code, country name, continent name, continent code, ip address and suggested currency. You can use the locale header to get the data in a supported language.

([IP Geolocation by DB-IP](https://db-ip.com))
     *
     * @throws {AppwriteException}
     * @returns {Promise<Models.Locale>}
     */
    async get(): Promise<Models.Locale> {
        const apiPath = '/locale';
        const payload: Payload = {};
        const uri = new URL(this.client.config.endpoint + apiPath);

        const apiHeaders: { [header: string]: string } = {
            'content-type': 'application/json',
        }


        return await this.client.call(
            'get',
            uri,
            apiHeaders,
            payload
        );
    }
    /**
     * List Locale Codes
     *
     * List of all locale codes in [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes).
     *
     * @throws {AppwriteException}
     * @returns {Promise<Models.LocaleCodeList>}
     */
    async listCodes(): Promise<Models.LocaleCodeList> {
        const apiPath = '/locale/codes';
        const payload: Payload = {};
        const uri = new URL(this.client.config.endpoint + apiPath);

        const apiHeaders: { [header: string]: string } = {
            'content-type': 'application/json',
        }


        return await this.client.call(
            'get',
            uri,
            apiHeaders,
            payload
        );
    }
    /**
     * List continents
     *
     * List of all continents. You can use the locale header to get the data in a supported language.
     *
     * @throws {AppwriteException}
     * @returns {Promise<Models.ContinentList>}
     */
    async listContinents(): Promise<Models.ContinentList> {
        const apiPath = '/locale/continents';
        const payload: Payload = {};
        const uri = new URL(this.client.config.endpoint + apiPath);

        const apiHeaders: { [header: string]: string } = {
            'content-type': 'application/json',
        }


        return await this.client.call(
            'get',
            uri,
            apiHeaders,
            payload
        );
    }
    /**
     * List countries
     *
     * List of all countries. You can use the locale header to get the data in a supported language.
     *
     * @throws {AppwriteException}
     * @returns {Promise<Models.CountryList>}
     */
    async listCountries(): Promise<Models.CountryList> {
        const apiPath = '/locale/countries';
        const payload: Payload = {};
        const uri = new URL(this.client.config.endpoint + apiPath);

        const apiHeaders: { [header: string]: string } = {
            'content-type': 'application/json',
        }


        return await this.client.call(
            'get',
            uri,
            apiHeaders,
            payload
        );
    }
    /**
     * List EU countries
     *
     * List of all countries that are currently members of the EU. You can use the locale header to get the data in a supported language.
     *
     * @throws {AppwriteException}
     * @returns {Promise<Models.CountryList>}
     */
    async listCountriesEU(): Promise<Models.CountryList> {
        const apiPath = '/locale/countries/eu';
        const payload: Payload = {};
        const uri = new URL(this.client.config.endpoint + apiPath);

        const apiHeaders: { [header: string]: string } = {
            'content-type': 'application/json',
        }


        return await this.client.call(
            'get',
            uri,
            apiHeaders,
            payload
        );
    }
    /**
     * List countries phone codes
     *
     * List of all countries phone codes. You can use the locale header to get the data in a supported language.
     *
     * @throws {AppwriteException}
     * @returns {Promise<Models.PhoneList>}
     */
    async listCountriesPhones(): Promise<Models.PhoneList> {
        const apiPath = '/locale/countries/phones';
        const payload: Payload = {};
        const uri = new URL(this.client.config.endpoint + apiPath);

        const apiHeaders: { [header: string]: string } = {
            'content-type': 'application/json',
        }


        return await this.client.call(
            'get',
            uri,
            apiHeaders,
            payload
        );
    }
    /**
     * List currencies
     *
     * List of all currencies, including currency symbol, name, plural, and decimal digits for all major and minor currencies. You can use the locale header to get the data in a supported language.
     *
     * @throws {AppwriteException}
     * @returns {Promise<Models.CurrencyList>}
     */
    async listCurrencies(): Promise<Models.CurrencyList> {
        const apiPath = '/locale/currencies';
        const payload: Payload = {};
        const uri = new URL(this.client.config.endpoint + apiPath);

        const apiHeaders: { [header: string]: string } = {
            'content-type': 'application/json',
        }


        return await this.client.call(
            'get',
            uri,
            apiHeaders,
            payload
        );
    }
    /**
     * List languages
     *
     * List of all languages classified by ISO 639-1 including 2-letter code, name in English, and name in the respective language.
     *
     * @throws {AppwriteException}
     * @returns {Promise<Models.LanguageList>}
     */
    async listLanguages(): Promise<Models.LanguageList> {
        const apiPath = '/locale/languages';
        const payload: Payload = {};
        const uri = new URL(this.client.config.endpoint + apiPath);

        const apiHeaders: { [header: string]: string } = {
            'content-type': 'application/json',
        }


        return await this.client.call(
            'get',
            uri,
            apiHeaders,
            payload
        );
    }
}
