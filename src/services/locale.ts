import { Service } from '../service';
import { AppwriteException } from '../client';
import type { Models } from '../models';
import type { UploadProgress } from '../client';

type Payload = {
    [key: string]: any;
}

export class Locale extends Service {

        /**
         * Get User Locale
         *
         * Get the current user location based on IP. Returns an object with user
         * country code, country name, continent name, continent code, ip address and
         * suggested currency. You can use the locale header to get the data in a
         * supported language.
         * 
         * ([IP Geolocation by DB-IP](https://db-ip.com))
         *
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async get(): Promise<Models.Locale> {
            let path = '/locale';
            let payload: Payload = {};

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('get', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * List Continents
         *
         * List of all continents. You can use the locale header to get the data in a
         * supported language.
         *
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async getContinents(): Promise<Models.ContinentList> {
            let path = '/locale/continents';
            let payload: Payload = {};

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('get', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * List Countries
         *
         * List of all countries. You can use the locale header to get the data in a
         * supported language.
         *
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async getCountries(): Promise<Models.CountryList> {
            let path = '/locale/countries';
            let payload: Payload = {};

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('get', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * List EU Countries
         *
         * List of all countries that are currently members of the EU. You can use the
         * locale header to get the data in a supported language.
         *
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async getCountriesEU(): Promise<Models.CountryList> {
            let path = '/locale/countries/eu';
            let payload: Payload = {};

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('get', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * List Countries Phone Codes
         *
         * List of all countries phone codes. You can use the locale header to get the
         * data in a supported language.
         *
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async getCountriesPhones(): Promise<Models.PhoneList> {
            let path = '/locale/countries/phones';
            let payload: Payload = {};

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('get', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * List Currencies
         *
         * List of all currencies, including currency symbol, name, plural, and
         * decimal digits for all major and minor currencies. You can use the locale
         * header to get the data in a supported language.
         *
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async getCurrencies(): Promise<Models.CurrencyList> {
            let path = '/locale/currencies';
            let payload: Payload = {};

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('get', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * List Languages
         *
         * List of all languages classified by ISO 639-1 including 2-letter code, name
         * in English, and name in the respective language.
         *
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async getLanguages(): Promise<Models.LanguageList> {
            let path = '/locale/languages';
            let payload: Payload = {};

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('get', uri, {
                'content-type': 'application/json',
            }, payload);
        }
};
