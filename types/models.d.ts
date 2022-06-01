export declare namespace Models {
    /**
     * Documents List
     */
    type DocumentList<Document extends Models.Document> = {
        /**
         * Total number of documents documents that matched your query.
         */
        total: number;
        /**
         * List of documents.
         */
        documents: Document[];
    };
    /**
     * Sessions List
     */
    type SessionList = {
        /**
         * Total number of sessions documents that matched your query.
         */
        total: number;
        /**
         * List of sessions.
         */
        sessions: Session[];
    };
    /**
     * Logs List
     */
    type LogList = {
        /**
         * Total number of logs documents that matched your query.
         */
        total: number;
        /**
         * List of logs.
         */
        logs: Log[];
    };
    /**
     * Files List
     */
    type FileList = {
        /**
         * Total number of files documents that matched your query.
         */
        total: number;
        /**
         * List of files.
         */
        files: File[];
    };
    /**
     * Teams List
     */
    type TeamList = {
        /**
         * Total number of teams documents that matched your query.
         */
        total: number;
        /**
         * List of teams.
         */
        teams: Team[];
    };
    /**
     * Memberships List
     */
    type MembershipList = {
        /**
         * Total number of memberships documents that matched your query.
         */
        total: number;
        /**
         * List of memberships.
         */
        memberships: Membership[];
    };
    /**
     * Executions List
     */
    type ExecutionList = {
        /**
         * Total number of executions documents that matched your query.
         */
        total: number;
        /**
         * List of executions.
         */
        executions: Execution[];
    };
    /**
     * Countries List
     */
    type CountryList = {
        /**
         * Total number of countries documents that matched your query.
         */
        total: number;
        /**
         * List of countries.
         */
        countries: Country[];
    };
    /**
     * Continents List
     */
    type ContinentList = {
        /**
         * Total number of continents documents that matched your query.
         */
        total: number;
        /**
         * List of continents.
         */
        continents: Continent[];
    };
    /**
     * Languages List
     */
    type LanguageList = {
        /**
         * Total number of languages documents that matched your query.
         */
        total: number;
        /**
         * List of languages.
         */
        languages: Language[];
    };
    /**
     * Currencies List
     */
    type CurrencyList = {
        /**
         * Total number of currencies documents that matched your query.
         */
        total: number;
        /**
         * List of currencies.
         */
        currencies: Currency[];
    };
    /**
     * Phones List
     */
    type PhoneList = {
        /**
         * Total number of phones documents that matched your query.
         */
        total: number;
        /**
         * List of phones.
         */
        phones: Phone[];
    };
    /**
     * Document
     */
    type Document = {
        /**
         * Document ID.
         */
        $id: string;
        /**
         * Collection ID.
         */
        $collection: string;
        /**
         * Document read permissions.
         */
        $read: string[];
        /**
         * Document write permissions.
         */
        $write: string[];
        [key: string]: any;
    };
    /**
     * Log
     */
    type Log = {
        /**
         * Event name.
         */
        event: string;
        /**
         * User ID.
         */
        userId: string;
        /**
         * User Email.
         */
        userEmail: string;
        /**
         * User Name.
         */
        userName: string;
        /**
         * API mode when event triggered.
         */
        mode: string;
        /**
         * IP session in use when the session was created.
         */
        ip: string;
        /**
         * Log creation time in Unix timestamp.
         */
        time: number;
        /**
         * Operating system code name. View list of [available options](https://github.com/appwrite/appwrite/blob/master/docs/lists/os.json).
         */
        osCode: string;
        /**
         * Operating system name.
         */
        osName: string;
        /**
         * Operating system version.
         */
        osVersion: string;
        /**
         * Client type.
         */
        clientType: string;
        /**
         * Client code name. View list of [available options](https://github.com/appwrite/appwrite/blob/master/docs/lists/clients.json).
         */
        clientCode: string;
        /**
         * Client name.
         */
        clientName: string;
        /**
         * Client version.
         */
        clientVersion: string;
        /**
         * Client engine name.
         */
        clientEngine: string;
        /**
         * Client engine name.
         */
        clientEngineVersion: string;
        /**
         * Device name.
         */
        deviceName: string;
        /**
         * Device brand name.
         */
        deviceBrand: string;
        /**
         * Device model name.
         */
        deviceModel: string;
        /**
         * Country two-character ISO 3166-1 alpha code.
         */
        countryCode: string;
        /**
         * Country name.
         */
        countryName: string;
    };
    /**
     * User
     */
    type User<Preferences extends Models.Preferences> = {
        /**
         * User ID.
         */
        $id: string;
        /**
         * User name.
         */
        name: string;
        /**
         * User registration date in Unix timestamp.
         */
        registration: number;
        /**
         * User status. Pass `true` for enabled and `false` for disabled.
         */
        status: boolean;
        /**
         * Unix timestamp of the most recent password update
         */
        passwordUpdate: number;
        /**
         * User email address.
         */
        email: string;
        /**
         * Email verification status.
         */
        emailVerification: boolean;
        /**
         * User preferences as a key-value object
         */
        prefs: Preferences;
    };
    /**
     * Preferences
     */
    type Preferences = {
        [key: string]: any;
    };
    /**
     * Session
     */
    type Session = {
        /**
         * Session ID.
         */
        $id: string;
        /**
         * User ID.
         */
        userId: string;
        /**
         * Session expiration date in Unix timestamp.
         */
        expire: number;
        /**
         * Session Provider.
         */
        provider: string;
        /**
         * Session Provider User ID.
         */
        providerUid: string;
        /**
         * Session Provider Access Token.
         */
        providerAccessToken: string;
        /**
         * Date, the Unix timestamp of when the access token expires.
         */
        providerAccessTokenExpiry: number;
        /**
         * Session Provider Refresh Token.
         */
        providerRefreshToken: string;
        /**
         * IP in use when the session was created.
         */
        ip: string;
        /**
         * Operating system code name. View list of [available options](https://github.com/appwrite/appwrite/blob/master/docs/lists/os.json).
         */
        osCode: string;
        /**
         * Operating system name.
         */
        osName: string;
        /**
         * Operating system version.
         */
        osVersion: string;
        /**
         * Client type.
         */
        clientType: string;
        /**
         * Client code name. View list of [available options](https://github.com/appwrite/appwrite/blob/master/docs/lists/clients.json).
         */
        clientCode: string;
        /**
         * Client name.
         */
        clientName: string;
        /**
         * Client version.
         */
        clientVersion: string;
        /**
         * Client engine name.
         */
        clientEngine: string;
        /**
         * Client engine name.
         */
        clientEngineVersion: string;
        /**
         * Device name.
         */
        deviceName: string;
        /**
         * Device brand name.
         */
        deviceBrand: string;
        /**
         * Device model name.
         */
        deviceModel: string;
        /**
         * Country two-character ISO 3166-1 alpha code.
         */
        countryCode: string;
        /**
         * Country name.
         */
        countryName: string;
        /**
         * Returns true if this the current user session.
         */
        current: boolean;
    };
    /**
     * Token
     */
    type Token = {
        /**
         * Token ID.
         */
        $id: string;
        /**
         * User ID.
         */
        userId: string;
        /**
         * Token secret key. This will return an empty string unless the response is returned using an API key or as part of a webhook payload.
         */
        secret: string;
        /**
         * Token expiration date in Unix timestamp.
         */
        expire: number;
    };
    /**
     * JWT
     */
    type Jwt = {
        /**
         * JWT encoded string.
         */
        jwt: string;
    };
    /**
     * Locale
     */
    type Locale = {
        /**
         * User IP address.
         */
        ip: string;
        /**
         * Country code in [ISO 3166-1](http://en.wikipedia.org/wiki/ISO_3166-1) two-character format
         */
        countryCode: string;
        /**
         * Country name. This field support localization.
         */
        country: string;
        /**
         * Continent code. A two character continent code &quot;AF&quot; for Africa, &quot;AN&quot; for Antarctica, &quot;AS&quot; for Asia, &quot;EU&quot; for Europe, &quot;NA&quot; for North America, &quot;OC&quot; for Oceania, and &quot;SA&quot; for South America.
         */
        continentCode: string;
        /**
         * Continent name. This field support localization.
         */
        continent: string;
        /**
         * True if country is part of the Europian Union.
         */
        eu: boolean;
        /**
         * Currency code in [ISO 4217-1](http://en.wikipedia.org/wiki/ISO_4217) three-character format
         */
        currency: string;
    };
    /**
     * File
     */
    type File = {
        /**
         * File ID.
         */
        $id: string;
        /**
         * Bucket ID.
         */
        bucketId: string;
        /**
         * File read permissions.
         */
        $read: string[];
        /**
         * File write permissions.
         */
        $write: string[];
        /**
         * File name.
         */
        name: string;
        /**
         * File creation date in Unix timestamp.
         */
        dateCreated: number;
        /**
         * File MD5 signature.
         */
        signature: string;
        /**
         * File mime type.
         */
        mimeType: string;
        /**
         * File original size in bytes.
         */
        sizeOriginal: number;
        /**
         * Total number of chunks available
         */
        chunksTotal: number;
        /**
         * Total number of chunks uploaded
         */
        chunksUploaded: number;
    };
    /**
     * Team
     */
    type Team = {
        /**
         * Team ID.
         */
        $id: string;
        /**
         * Team name.
         */
        name: string;
        /**
         * Team creation date in Unix timestamp.
         */
        dateCreated: number;
        /**
         * Total number of team members.
         */
        total: number;
    };
    /**
     * Membership
     */
    type Membership = {
        /**
         * Membership ID.
         */
        $id: string;
        /**
         * User ID.
         */
        userId: string;
        /**
         * User name.
         */
        userName: string;
        /**
         * User email address.
         */
        userEmail: string;
        /**
         * Team ID.
         */
        teamId: string;
        /**
         * Team name.
         */
        teamName: string;
        /**
         * Date, the user has been invited to join the team in Unix timestamp.
         */
        invited: number;
        /**
         * Date, the user has accepted the invitation to join the team in Unix timestamp.
         */
        joined: number;
        /**
         * User confirmation status, true if the user has joined the team or false otherwise.
         */
        confirm: boolean;
        /**
         * User list of roles
         */
        roles: string[];
    };
    /**
     * Execution
     */
    type Execution = {
        /**
         * Execution ID.
         */
        $id: string;
        /**
         * Execution read permissions.
         */
        $read: string[];
        /**
         * Function ID.
         */
        functionId: string;
        /**
         * The execution creation date in Unix timestamp.
         */
        dateCreated: number;
        /**
         * The trigger that caused the function to execute. Possible values can be: `http`, `schedule`, or `event`.
         */
        trigger: string;
        /**
         * The status of the function execution. Possible values can be: `waiting`, `processing`, `completed`, or `failed`.
         */
        status: string;
        /**
         * The script status code.
         */
        statusCode: number;
        /**
         * The script response output string. Logs the last 4,000 characters of the execution response output.
         */
        response: string;
        /**
         * The script stderr output string. Logs the last 4,000 characters of the execution stderr output
         */
        stderr: string;
        /**
         * The script execution time in seconds.
         */
        time: number;
    };
    /**
     * Country
     */
    type Country = {
        /**
         * Country name.
         */
        name: string;
        /**
         * Country two-character ISO 3166-1 alpha code.
         */
        code: string;
    };
    /**
     * Continent
     */
    type Continent = {
        /**
         * Continent name.
         */
        name: string;
        /**
         * Continent two letter code.
         */
        code: string;
    };
    /**
     * Language
     */
    type Language = {
        /**
         * Language name.
         */
        name: string;
        /**
         * Language two-character ISO 639-1 codes.
         */
        code: string;
        /**
         * Language native name.
         */
        nativeName: string;
    };
    /**
     * Currency
     */
    type Currency = {
        /**
         * Currency symbol.
         */
        symbol: string;
        /**
         * Currency name.
         */
        name: string;
        /**
         * Currency native symbol.
         */
        symbolNative: string;
        /**
         * Number of decimal digits.
         */
        decimalDigits: number;
        /**
         * Currency digit rounding.
         */
        rounding: number;
        /**
         * Currency code in [ISO 4217-1](http://en.wikipedia.org/wiki/ISO_4217) three-character format.
         */
        code: string;
        /**
         * Currency plural name
         */
        namePlural: string;
    };
    /**
     * Phone
     */
    type Phone = {
        /**
         * Phone code.
         */
        code: string;
        /**
         * Country two-character ISO 3166-1 alpha code.
         */
        countryCode: string;
        /**
         * Country name.
         */
        countryName: string;
    };
}
