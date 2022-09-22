import { Service } from '../service';
import { AppwriteException, Client } from '../client';
import type { Models } from '../models';
import type { UploadProgress, Payload } from '../client';

export class Users extends Service {

     constructor(client: Client)
     {
        super(client);
     }

        /**
         * List Users
         *
         * Get a list of all the project's users. You can use the query params to
         * filter your results.
         *
         * @param {string[]} queries
         * @param {string} search
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async list<Preferences extends Models.Preferences>(queries?: string[], search?: string): Promise<Models.UserList<Preferences>> {
            let path = '/users';
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
         * Create User
         *
         * Create a new user.
         *
         * @param {string} userId
         * @param {string} email
         * @param {string} phone
         * @param {string} password
         * @param {string} name
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async create<Preferences extends Models.Preferences>(userId: string, email?: string, phone?: string, password?: string, name?: string): Promise<Models.User<Preferences>> {
            if (typeof userId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "userId"');
            }

            let path = '/users';
            let payload: Payload = {};

            if (typeof userId !== 'undefined') {
                payload['userId'] = userId;
            }

            if (typeof email !== 'undefined') {
                payload['email'] = email;
            }

            if (typeof phone !== 'undefined') {
                payload['phone'] = phone;
            }

            if (typeof password !== 'undefined') {
                payload['password'] = password;
            }

            if (typeof name !== 'undefined') {
                payload['name'] = name;
            }

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('post', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Create User with Argon2 Password
         *
         * Create a new user. Password provided must be hashed with the
         * [Argon2](https://en.wikipedia.org/wiki/Argon2) algorithm. Use the [POST
         * /users](/docs/server/users#usersCreate) endpoint to create users with a
         * plain text password.
         *
         * @param {string} userId
         * @param {string} email
         * @param {string} password
         * @param {string} name
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async createArgon2User<Preferences extends Models.Preferences>(userId: string, email: string, password: string, name?: string): Promise<Models.User<Preferences>> {
            if (typeof userId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "userId"');
            }

            if (typeof email === 'undefined') {
                throw new AppwriteException('Missing required parameter: "email"');
            }

            if (typeof password === 'undefined') {
                throw new AppwriteException('Missing required parameter: "password"');
            }

            let path = '/users/argon2';
            let payload: Payload = {};

            if (typeof userId !== 'undefined') {
                payload['userId'] = userId;
            }

            if (typeof email !== 'undefined') {
                payload['email'] = email;
            }

            if (typeof password !== 'undefined') {
                payload['password'] = password;
            }

            if (typeof name !== 'undefined') {
                payload['name'] = name;
            }

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('post', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Create User with Bcrypt Password
         *
         * Create a new user. Password provided must be hashed with the
         * [Bcrypt](https://en.wikipedia.org/wiki/Bcrypt) algorithm. Use the [POST
         * /users](/docs/server/users#usersCreate) endpoint to create users with a
         * plain text password.
         *
         * @param {string} userId
         * @param {string} email
         * @param {string} password
         * @param {string} name
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async createBcryptUser<Preferences extends Models.Preferences>(userId: string, email: string, password: string, name?: string): Promise<Models.User<Preferences>> {
            if (typeof userId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "userId"');
            }

            if (typeof email === 'undefined') {
                throw new AppwriteException('Missing required parameter: "email"');
            }

            if (typeof password === 'undefined') {
                throw new AppwriteException('Missing required parameter: "password"');
            }

            let path = '/users/bcrypt';
            let payload: Payload = {};

            if (typeof userId !== 'undefined') {
                payload['userId'] = userId;
            }

            if (typeof email !== 'undefined') {
                payload['email'] = email;
            }

            if (typeof password !== 'undefined') {
                payload['password'] = password;
            }

            if (typeof name !== 'undefined') {
                payload['name'] = name;
            }

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('post', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Create User with MD5 Password
         *
         * Create a new user. Password provided must be hashed with the
         * [MD5](https://en.wikipedia.org/wiki/MD5) algorithm. Use the [POST
         * /users](/docs/server/users#usersCreate) endpoint to create users with a
         * plain text password.
         *
         * @param {string} userId
         * @param {string} email
         * @param {string} password
         * @param {string} name
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async createMD5User<Preferences extends Models.Preferences>(userId: string, email: string, password: string, name?: string): Promise<Models.User<Preferences>> {
            if (typeof userId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "userId"');
            }

            if (typeof email === 'undefined') {
                throw new AppwriteException('Missing required parameter: "email"');
            }

            if (typeof password === 'undefined') {
                throw new AppwriteException('Missing required parameter: "password"');
            }

            let path = '/users/md5';
            let payload: Payload = {};

            if (typeof userId !== 'undefined') {
                payload['userId'] = userId;
            }

            if (typeof email !== 'undefined') {
                payload['email'] = email;
            }

            if (typeof password !== 'undefined') {
                payload['password'] = password;
            }

            if (typeof name !== 'undefined') {
                payload['name'] = name;
            }

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('post', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Create User with PHPass Password
         *
         * Create a new user. Password provided must be hashed with the
         * [PHPass](https://www.openwall.com/phpass/) algorithm. Use the [POST
         * /users](/docs/server/users#usersCreate) endpoint to create users with a
         * plain text password.
         *
         * @param {string} userId
         * @param {string} email
         * @param {string} password
         * @param {string} name
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async createPHPassUser<Preferences extends Models.Preferences>(userId: string, email: string, password: string, name?: string): Promise<Models.User<Preferences>> {
            if (typeof userId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "userId"');
            }

            if (typeof email === 'undefined') {
                throw new AppwriteException('Missing required parameter: "email"');
            }

            if (typeof password === 'undefined') {
                throw new AppwriteException('Missing required parameter: "password"');
            }

            let path = '/users/phpass';
            let payload: Payload = {};

            if (typeof userId !== 'undefined') {
                payload['userId'] = userId;
            }

            if (typeof email !== 'undefined') {
                payload['email'] = email;
            }

            if (typeof password !== 'undefined') {
                payload['password'] = password;
            }

            if (typeof name !== 'undefined') {
                payload['name'] = name;
            }

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('post', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Create User with Scrypt Password
         *
         * Create a new user. Password provided must be hashed with the
         * [Scrypt](https://github.com/Tarsnap/scrypt) algorithm. Use the [POST
         * /users](/docs/server/users#usersCreate) endpoint to create users with a
         * plain text password.
         *
         * @param {string} userId
         * @param {string} email
         * @param {string} password
         * @param {string} passwordSalt
         * @param {number} passwordCpu
         * @param {number} passwordMemory
         * @param {number} passwordParallel
         * @param {number} passwordLength
         * @param {string} name
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async createScryptUser<Preferences extends Models.Preferences>(userId: string, email: string, password: string, passwordSalt: string, passwordCpu: number, passwordMemory: number, passwordParallel: number, passwordLength: number, name?: string): Promise<Models.User<Preferences>> {
            if (typeof userId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "userId"');
            }

            if (typeof email === 'undefined') {
                throw new AppwriteException('Missing required parameter: "email"');
            }

            if (typeof password === 'undefined') {
                throw new AppwriteException('Missing required parameter: "password"');
            }

            if (typeof passwordSalt === 'undefined') {
                throw new AppwriteException('Missing required parameter: "passwordSalt"');
            }

            if (typeof passwordCpu === 'undefined') {
                throw new AppwriteException('Missing required parameter: "passwordCpu"');
            }

            if (typeof passwordMemory === 'undefined') {
                throw new AppwriteException('Missing required parameter: "passwordMemory"');
            }

            if (typeof passwordParallel === 'undefined') {
                throw new AppwriteException('Missing required parameter: "passwordParallel"');
            }

            if (typeof passwordLength === 'undefined') {
                throw new AppwriteException('Missing required parameter: "passwordLength"');
            }

            let path = '/users/scrypt';
            let payload: Payload = {};

            if (typeof userId !== 'undefined') {
                payload['userId'] = userId;
            }

            if (typeof email !== 'undefined') {
                payload['email'] = email;
            }

            if (typeof password !== 'undefined') {
                payload['password'] = password;
            }

            if (typeof passwordSalt !== 'undefined') {
                payload['passwordSalt'] = passwordSalt;
            }

            if (typeof passwordCpu !== 'undefined') {
                payload['passwordCpu'] = passwordCpu;
            }

            if (typeof passwordMemory !== 'undefined') {
                payload['passwordMemory'] = passwordMemory;
            }

            if (typeof passwordParallel !== 'undefined') {
                payload['passwordParallel'] = passwordParallel;
            }

            if (typeof passwordLength !== 'undefined') {
                payload['passwordLength'] = passwordLength;
            }

            if (typeof name !== 'undefined') {
                payload['name'] = name;
            }

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('post', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Create User with Scrypt Modified Password
         *
         * Create a new user. Password provided must be hashed with the [Scrypt
         * Modified](https://gist.github.com/Meldiron/eecf84a0225eccb5a378d45bb27462cc)
         * algorithm. Use the [POST /users](/docs/server/users#usersCreate) endpoint
         * to create users with a plain text password.
         *
         * @param {string} userId
         * @param {string} email
         * @param {string} password
         * @param {string} passwordSalt
         * @param {string} passwordSaltSeparator
         * @param {string} passwordSignerKey
         * @param {string} name
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async createScryptModifiedUser<Preferences extends Models.Preferences>(userId: string, email: string, password: string, passwordSalt: string, passwordSaltSeparator: string, passwordSignerKey: string, name?: string): Promise<Models.User<Preferences>> {
            if (typeof userId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "userId"');
            }

            if (typeof email === 'undefined') {
                throw new AppwriteException('Missing required parameter: "email"');
            }

            if (typeof password === 'undefined') {
                throw new AppwriteException('Missing required parameter: "password"');
            }

            if (typeof passwordSalt === 'undefined') {
                throw new AppwriteException('Missing required parameter: "passwordSalt"');
            }

            if (typeof passwordSaltSeparator === 'undefined') {
                throw new AppwriteException('Missing required parameter: "passwordSaltSeparator"');
            }

            if (typeof passwordSignerKey === 'undefined') {
                throw new AppwriteException('Missing required parameter: "passwordSignerKey"');
            }

            let path = '/users/scrypt-modified';
            let payload: Payload = {};

            if (typeof userId !== 'undefined') {
                payload['userId'] = userId;
            }

            if (typeof email !== 'undefined') {
                payload['email'] = email;
            }

            if (typeof password !== 'undefined') {
                payload['password'] = password;
            }

            if (typeof passwordSalt !== 'undefined') {
                payload['passwordSalt'] = passwordSalt;
            }

            if (typeof passwordSaltSeparator !== 'undefined') {
                payload['passwordSaltSeparator'] = passwordSaltSeparator;
            }

            if (typeof passwordSignerKey !== 'undefined') {
                payload['passwordSignerKey'] = passwordSignerKey;
            }

            if (typeof name !== 'undefined') {
                payload['name'] = name;
            }

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('post', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Create User with SHA Password
         *
         * Create a new user. Password provided must be hashed with the
         * [SHA](https://en.wikipedia.org/wiki/Secure_Hash_Algorithm) algorithm. Use
         * the [POST /users](/docs/server/users#usersCreate) endpoint to create users
         * with a plain text password.
         *
         * @param {string} userId
         * @param {string} email
         * @param {string} password
         * @param {string} passwordVersion
         * @param {string} name
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async createSHAUser<Preferences extends Models.Preferences>(userId: string, email: string, password: string, passwordVersion?: string, name?: string): Promise<Models.User<Preferences>> {
            if (typeof userId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "userId"');
            }

            if (typeof email === 'undefined') {
                throw new AppwriteException('Missing required parameter: "email"');
            }

            if (typeof password === 'undefined') {
                throw new AppwriteException('Missing required parameter: "password"');
            }

            let path = '/users/sha';
            let payload: Payload = {};

            if (typeof userId !== 'undefined') {
                payload['userId'] = userId;
            }

            if (typeof email !== 'undefined') {
                payload['email'] = email;
            }

            if (typeof password !== 'undefined') {
                payload['password'] = password;
            }

            if (typeof passwordVersion !== 'undefined') {
                payload['passwordVersion'] = passwordVersion;
            }

            if (typeof name !== 'undefined') {
                payload['name'] = name;
            }

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('post', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Get usage stats for the users API
         *
         *
         * @param {string} range
         * @param {string} provider
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async getUsage(range?: string, provider?: string): Promise<Models.UsageUsers> {
            let path = '/users/usage';
            let payload: Payload = {};

            if (typeof range !== 'undefined') {
                payload['range'] = range;
            }

            if (typeof provider !== 'undefined') {
                payload['provider'] = provider;
            }

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('get', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Get User
         *
         * Get a user by its unique ID.
         *
         * @param {string} userId
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async get<Preferences extends Models.Preferences>(userId: string): Promise<Models.User<Preferences>> {
            if (typeof userId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "userId"');
            }

            let path = '/users/{userId}'.replace('{userId}', userId);
            let payload: Payload = {};

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('get', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Delete User
         *
         * Delete a user by its unique ID, thereby releasing it's ID. Since ID is
         * released and can be reused, all user-related resources like documents or
         * storage files should be deleted before user deletion. If you want to keep
         * ID reserved, use the [updateStatus](/docs/server/users#usersUpdateStatus)
         * endpoint instead.
         *
         * @param {string} userId
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async delete(userId: string): Promise<{}> {
            if (typeof userId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "userId"');
            }

            let path = '/users/{userId}'.replace('{userId}', userId);
            let payload: Payload = {};

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('delete', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Update Email
         *
         * Update the user email by its unique ID.
         *
         * @param {string} userId
         * @param {string} email
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async updateEmail<Preferences extends Models.Preferences>(userId: string, email: string): Promise<Models.User<Preferences>> {
            if (typeof userId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "userId"');
            }

            if (typeof email === 'undefined') {
                throw new AppwriteException('Missing required parameter: "email"');
            }

            let path = '/users/{userId}/email'.replace('{userId}', userId);
            let payload: Payload = {};

            if (typeof email !== 'undefined') {
                payload['email'] = email;
            }

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('patch', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * List User Logs
         *
         * Get the user activity logs list by its unique ID.
         *
         * @param {string} userId
         * @param {string[]} queries
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async listLogs(userId: string, queries?: string[]): Promise<Models.LogList> {
            if (typeof userId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "userId"');
            }

            let path = '/users/{userId}/logs'.replace('{userId}', userId);
            let payload: Payload = {};

            if (typeof queries !== 'undefined') {
                payload['queries'] = queries;
            }

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('get', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * List User Memberships
         *
         * Get the user membership list by its unique ID.
         *
         * @param {string} userId
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async listMemberships(userId: string): Promise<Models.MembershipList> {
            if (typeof userId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "userId"');
            }

            let path = '/users/{userId}/memberships'.replace('{userId}', userId);
            let payload: Payload = {};

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('get', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Update Name
         *
         * Update the user name by its unique ID.
         *
         * @param {string} userId
         * @param {string} name
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async updateName<Preferences extends Models.Preferences>(userId: string, name: string): Promise<Models.User<Preferences>> {
            if (typeof userId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "userId"');
            }

            if (typeof name === 'undefined') {
                throw new AppwriteException('Missing required parameter: "name"');
            }

            let path = '/users/{userId}/name'.replace('{userId}', userId);
            let payload: Payload = {};

            if (typeof name !== 'undefined') {
                payload['name'] = name;
            }

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('patch', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Update Password
         *
         * Update the user password by its unique ID.
         *
         * @param {string} userId
         * @param {string} password
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async updatePassword<Preferences extends Models.Preferences>(userId: string, password: string): Promise<Models.User<Preferences>> {
            if (typeof userId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "userId"');
            }

            if (typeof password === 'undefined') {
                throw new AppwriteException('Missing required parameter: "password"');
            }

            let path = '/users/{userId}/password'.replace('{userId}', userId);
            let payload: Payload = {};

            if (typeof password !== 'undefined') {
                payload['password'] = password;
            }

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('patch', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Update Phone
         *
         * Update the user phone by its unique ID.
         *
         * @param {string} userId
         * @param {string} number
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async updatePhone<Preferences extends Models.Preferences>(userId: string, number: string): Promise<Models.User<Preferences>> {
            if (typeof userId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "userId"');
            }

            if (typeof number === 'undefined') {
                throw new AppwriteException('Missing required parameter: "number"');
            }

            let path = '/users/{userId}/phone'.replace('{userId}', userId);
            let payload: Payload = {};

            if (typeof number !== 'undefined') {
                payload['number'] = number;
            }

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('patch', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Get User Preferences
         *
         * Get the user preferences by its unique ID.
         *
         * @param {string} userId
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async getPrefs<Preferences extends Models.Preferences>(userId: string): Promise<Preferences> {
            if (typeof userId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "userId"');
            }

            let path = '/users/{userId}/prefs'.replace('{userId}', userId);
            let payload: Payload = {};

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('get', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Update User Preferences
         *
         * Update the user preferences by its unique ID. The object you pass is stored
         * as is, and replaces any previous value. The maximum allowed prefs size is
         * 64kB and throws error if exceeded.
         *
         * @param {string} userId
         * @param {object} prefs
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async updatePrefs<Preferences extends Models.Preferences>(userId: string, prefs: object): Promise<Preferences> {
            if (typeof userId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "userId"');
            }

            if (typeof prefs === 'undefined') {
                throw new AppwriteException('Missing required parameter: "prefs"');
            }

            let path = '/users/{userId}/prefs'.replace('{userId}', userId);
            let payload: Payload = {};

            if (typeof prefs !== 'undefined') {
                payload['prefs'] = prefs;
            }

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('patch', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * List User Sessions
         *
         * Get the user sessions list by its unique ID.
         *
         * @param {string} userId
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async listSessions(userId: string): Promise<Models.SessionList> {
            if (typeof userId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "userId"');
            }

            let path = '/users/{userId}/sessions'.replace('{userId}', userId);
            let payload: Payload = {};

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('get', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Delete User Sessions
         *
         * Delete all user's sessions by using the user's unique ID.
         *
         * @param {string} userId
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async deleteSessions(userId: string): Promise<{}> {
            if (typeof userId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "userId"');
            }

            let path = '/users/{userId}/sessions'.replace('{userId}', userId);
            let payload: Payload = {};

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('delete', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Delete User Session
         *
         * Delete a user sessions by its unique ID.
         *
         * @param {string} userId
         * @param {string} sessionId
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async deleteSession(userId: string, sessionId: string): Promise<{}> {
            if (typeof userId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "userId"');
            }

            if (typeof sessionId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "sessionId"');
            }

            let path = '/users/{userId}/sessions/{sessionId}'.replace('{userId}', userId).replace('{sessionId}', sessionId);
            let payload: Payload = {};

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('delete', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Update User Status
         *
         * Update the user status by its unique ID. Use this endpoint as an
         * alternative to deleting a user if you want to keep user's ID reserved.
         *
         * @param {string} userId
         * @param {boolean} status
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async updateStatus<Preferences extends Models.Preferences>(userId: string, status: boolean): Promise<Models.User<Preferences>> {
            if (typeof userId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "userId"');
            }

            if (typeof status === 'undefined') {
                throw new AppwriteException('Missing required parameter: "status"');
            }

            let path = '/users/{userId}/status'.replace('{userId}', userId);
            let payload: Payload = {};

            if (typeof status !== 'undefined') {
                payload['status'] = status;
            }

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('patch', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Update Email Verification
         *
         * Update the user email verification status by its unique ID.
         *
         * @param {string} userId
         * @param {boolean} emailVerification
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async updateEmailVerification<Preferences extends Models.Preferences>(userId: string, emailVerification: boolean): Promise<Models.User<Preferences>> {
            if (typeof userId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "userId"');
            }

            if (typeof emailVerification === 'undefined') {
                throw new AppwriteException('Missing required parameter: "emailVerification"');
            }

            let path = '/users/{userId}/verification'.replace('{userId}', userId);
            let payload: Payload = {};

            if (typeof emailVerification !== 'undefined') {
                payload['emailVerification'] = emailVerification;
            }

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('patch', uri, {
                'content-type': 'application/json',
            }, payload);
        }

        /**
         * Update Phone Verification
         *
         * Update the user phone verification status by its unique ID.
         *
         * @param {string} userId
         * @param {boolean} phoneVerification
         * @throws {AppwriteException}
         * @returns {Promise}
         */
        async updatePhoneVerification<Preferences extends Models.Preferences>(userId: string, phoneVerification: boolean): Promise<Models.User<Preferences>> {
            if (typeof userId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "userId"');
            }

            if (typeof phoneVerification === 'undefined') {
                throw new AppwriteException('Missing required parameter: "phoneVerification"');
            }

            let path = '/users/{userId}/verification/phone'.replace('{userId}', userId);
            let payload: Payload = {};

            if (typeof phoneVerification !== 'undefined') {
                payload['phoneVerification'] = phoneVerification;
            }

            const uri = new URL(this.client.config.endpoint + path);
            return await this.client.call('patch', uri, {
                'content-type': 'application/json',
            }, payload);
        }
};
