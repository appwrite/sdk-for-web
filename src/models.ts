export namespace Models {
    /**
     * Documents List
     */
    export type DocumentList<Document extends Models.Document> = {
        /**
         * Total number of documents documents that matched your query.
         */
        total: number;
        /**
         * List of documents.
         */
        documents: Document[];
    }
    /**
     * Collections List
     */
    export type CollectionList = {
        /**
         * Total number of collections documents that matched your query.
         */
        total: number;
        /**
         * List of collections.
         */
        collections: Collection[];
    }
    /**
     * Databases List
     */
    export type DatabaseList = {
        /**
         * Total number of databases documents that matched your query.
         */
        total: number;
        /**
         * List of databases.
         */
        databases: Database[];
    }
    /**
     * Indexes List
     */
    export type IndexList = {
        /**
         * Total number of indexes documents that matched your query.
         */
        total: number;
        /**
         * List of indexes.
         */
        indexes: Index[];
    }
    /**
     * Users List
     */
    export type UserList<Preferences extends Models.Preferences> = {
        /**
         * Total number of users documents that matched your query.
         */
        total: number;
        /**
         * List of users.
         */
        users: User<Preferences>[];
    }
    /**
     * Sessions List
     */
    export type SessionList = {
        /**
         * Total number of sessions documents that matched your query.
         */
        total: number;
        /**
         * List of sessions.
         */
        sessions: Session[];
    }
    /**
     * Logs List
     */
    export type LogList = {
        /**
         * Total number of logs documents that matched your query.
         */
        total: number;
        /**
         * List of logs.
         */
        logs: Log[];
    }
    /**
     * Files List
     */
    export type FileList = {
        /**
         * Total number of files documents that matched your query.
         */
        total: number;
        /**
         * List of files.
         */
        files: File[];
    }
    /**
     * Buckets List
     */
    export type BucketList = {
        /**
         * Total number of buckets documents that matched your query.
         */
        total: number;
        /**
         * List of buckets.
         */
        buckets: Bucket[];
    }
    /**
     * Teams List
     */
    export type TeamList = {
        /**
         * Total number of teams documents that matched your query.
         */
        total: number;
        /**
         * List of teams.
         */
        teams: Team[];
    }
    /**
     * Memberships List
     */
    export type MembershipList = {
        /**
         * Total number of memberships documents that matched your query.
         */
        total: number;
        /**
         * List of memberships.
         */
        memberships: Membership[];
    }
    /**
     * Functions List
     */
    export type FunctionList = {
        /**
         * Total number of functions documents that matched your query.
         */
        total: number;
        /**
         * List of functions.
         */
        functions: Function[];
    }
    /**
     * Runtimes List
     */
    export type RuntimeList = {
        /**
         * Total number of runtimes documents that matched your query.
         */
        total: number;
        /**
         * List of runtimes.
         */
        runtimes: Runtime[];
    }
    /**
     * Deployments List
     */
    export type DeploymentList = {
        /**
         * Total number of deployments documents that matched your query.
         */
        total: number;
        /**
         * List of deployments.
         */
        deployments: Deployment[];
    }
    /**
     * Executions List
     */
    export type ExecutionList = {
        /**
         * Total number of executions documents that matched your query.
         */
        total: number;
        /**
         * List of executions.
         */
        executions: Execution[];
    }
    /**
     * Projects List
     */
    export type ProjectList = {
        /**
         * Total number of projects documents that matched your query.
         */
        total: number;
        /**
         * List of projects.
         */
        projects: Project[];
    }
    /**
     * Webhooks List
     */
    export type WebhookList = {
        /**
         * Total number of webhooks documents that matched your query.
         */
        total: number;
        /**
         * List of webhooks.
         */
        webhooks: Webhook[];
    }
    /**
     * API Keys List
     */
    export type KeyList = {
        /**
         * Total number of keys documents that matched your query.
         */
        total: number;
        /**
         * List of keys.
         */
        keys: Key[];
    }
    /**
     * Platforms List
     */
    export type PlatformList = {
        /**
         * Total number of platforms documents that matched your query.
         */
        total: number;
        /**
         * List of platforms.
         */
        platforms: Platform[];
    }
    /**
     * Domains List
     */
    export type DomainList = {
        /**
         * Total number of domains documents that matched your query.
         */
        total: number;
        /**
         * List of domains.
         */
        domains: Domain[];
    }
    /**
     * Countries List
     */
    export type CountryList = {
        /**
         * Total number of countries documents that matched your query.
         */
        total: number;
        /**
         * List of countries.
         */
        countries: Country[];
    }
    /**
     * Continents List
     */
    export type ContinentList = {
        /**
         * Total number of continents documents that matched your query.
         */
        total: number;
        /**
         * List of continents.
         */
        continents: Continent[];
    }
    /**
     * Languages List
     */
    export type LanguageList = {
        /**
         * Total number of languages documents that matched your query.
         */
        total: number;
        /**
         * List of languages.
         */
        languages: Language[];
    }
    /**
     * Currencies List
     */
    export type CurrencyList = {
        /**
         * Total number of currencies documents that matched your query.
         */
        total: number;
        /**
         * List of currencies.
         */
        currencies: Currency[];
    }
    /**
     * Phones List
     */
    export type PhoneList = {
        /**
         * Total number of phones documents that matched your query.
         */
        total: number;
        /**
         * List of phones.
         */
        phones: Phone[];
    }
    /**
     * Metric List
     */
    export type MetricList = {
        /**
         * Total number of metrics documents that matched your query.
         */
        total: number;
        /**
         * List of metrics.
         */
        metrics: Metric[];
    }
    /**
     * Variables List
     */
    export type VariableList = {
        /**
         * Total number of variables documents that matched your query.
         */
        total: number;
        /**
         * List of variables.
         */
        variables: Variable[];
    }
    /**
     * Database
     */
    export type Database = {
        /**
         * Database ID.
         */
        $id: string;
        /**
         * Database name.
         */
        name: string;
        /**
         * Database creation date in ISO 8601 format.
         */
        $createdAt: string;
        /**
         * Database update date in ISO 8601 format.
         */
        $updatedAt: string;
    }
    /**
     * Collection
     */
    export type Collection = {
        /**
         * Collection ID.
         */
        $id: string;
        /**
         * Collection creation date in ISO 8601 format.
         */
        $createdAt: string;
        /**
         * Collection update date in ISO 8601 format.
         */
        $updatedAt: string;
        /**
         * Collection permissions. [Learn more about permissions](/docs/permissions).
         */
        $permissions: string[];
        /**
         * Database ID.
         */
        databaseId: string;
        /**
         * Collection name.
         */
        name: string;
        /**
         * Collection enabled.
         */
        enabled: boolean;
        /**
         * Whether document-level permissions are enabled. [Learn more about permissions](/docs/permissions).
         */
        documentSecurity: boolean;
        /**
         * Collection attributes.
         */
        attributes: string[];
        /**
         * Collection indexes.
         */
        indexes: Index[];
    }
    /**
     * Attributes List
     */
    export type AttributeList = {
        /**
         * Total number of attributes in the given collection.
         */
        total: number;
        /**
         * List of attributes.
         */
        attributes: string[];
    }
    /**
     * AttributeString
     */
    export type AttributeString = {
        /**
         * Attribute Key.
         */
        key: string;
        /**
         * Attribute type.
         */
        type: string;
        /**
         * Attribute status. Possible values: `available`, `processing`, `deleting`, `stuck`, or `failed`
         */
        status: string;
        /**
         * Is attribute required?
         */
        required: boolean;
        /**
         * Is attribute an array?
         */
        array?: boolean;
        /**
         * Attribute size.
         */
        size: number;
        /**
         * Default value for attribute when not provided. Cannot be set when attribute is required.
         */
        default?: string;
    }
    /**
     * AttributeInteger
     */
    export type AttributeInteger = {
        /**
         * Attribute Key.
         */
        key: string;
        /**
         * Attribute type.
         */
        type: string;
        /**
         * Attribute status. Possible values: `available`, `processing`, `deleting`, `stuck`, or `failed`
         */
        status: string;
        /**
         * Is attribute required?
         */
        required: boolean;
        /**
         * Is attribute an array?
         */
        array?: boolean;
        /**
         * Minimum value to enforce for new documents.
         */
        min?: number;
        /**
         * Maximum value to enforce for new documents.
         */
        max?: number;
        /**
         * Default value for attribute when not provided. Cannot be set when attribute is required.
         */
        default?: number;
    }
    /**
     * AttributeFloat
     */
    export type AttributeFloat = {
        /**
         * Attribute Key.
         */
        key: string;
        /**
         * Attribute type.
         */
        type: string;
        /**
         * Attribute status. Possible values: `available`, `processing`, `deleting`, `stuck`, or `failed`
         */
        status: string;
        /**
         * Is attribute required?
         */
        required: boolean;
        /**
         * Is attribute an array?
         */
        array?: boolean;
        /**
         * Minimum value to enforce for new documents.
         */
        min?: number;
        /**
         * Maximum value to enforce for new documents.
         */
        max?: number;
        /**
         * Default value for attribute when not provided. Cannot be set when attribute is required.
         */
        default?: number;
    }
    /**
     * AttributeBoolean
     */
    export type AttributeBoolean = {
        /**
         * Attribute Key.
         */
        key: string;
        /**
         * Attribute type.
         */
        type: string;
        /**
         * Attribute status. Possible values: `available`, `processing`, `deleting`, `stuck`, or `failed`
         */
        status: string;
        /**
         * Is attribute required?
         */
        required: boolean;
        /**
         * Is attribute an array?
         */
        array?: boolean;
        /**
         * Default value for attribute when not provided. Cannot be set when attribute is required.
         */
        default?: boolean;
    }
    /**
     * AttributeEmail
     */
    export type AttributeEmail = {
        /**
         * Attribute Key.
         */
        key: string;
        /**
         * Attribute type.
         */
        type: string;
        /**
         * Attribute status. Possible values: `available`, `processing`, `deleting`, `stuck`, or `failed`
         */
        status: string;
        /**
         * Is attribute required?
         */
        required: boolean;
        /**
         * Is attribute an array?
         */
        array?: boolean;
        /**
         * String format.
         */
        format: string;
        /**
         * Default value for attribute when not provided. Cannot be set when attribute is required.
         */
        default?: string;
    }
    /**
     * AttributeEnum
     */
    export type AttributeEnum = {
        /**
         * Attribute Key.
         */
        key: string;
        /**
         * Attribute type.
         */
        type: string;
        /**
         * Attribute status. Possible values: `available`, `processing`, `deleting`, `stuck`, or `failed`
         */
        status: string;
        /**
         * Is attribute required?
         */
        required: boolean;
        /**
         * Is attribute an array?
         */
        array?: boolean;
        /**
         * Array of elements in enumerated type.
         */
        elements: string[];
        /**
         * String format.
         */
        format: string;
        /**
         * Default value for attribute when not provided. Cannot be set when attribute is required.
         */
        default?: string;
    }
    /**
     * AttributeIP
     */
    export type AttributeIp = {
        /**
         * Attribute Key.
         */
        key: string;
        /**
         * Attribute type.
         */
        type: string;
        /**
         * Attribute status. Possible values: `available`, `processing`, `deleting`, `stuck`, or `failed`
         */
        status: string;
        /**
         * Is attribute required?
         */
        required: boolean;
        /**
         * Is attribute an array?
         */
        array?: boolean;
        /**
         * String format.
         */
        format: string;
        /**
         * Default value for attribute when not provided. Cannot be set when attribute is required.
         */
        default?: string;
    }
    /**
     * AttributeURL
     */
    export type AttributeUrl = {
        /**
         * Attribute Key.
         */
        key: string;
        /**
         * Attribute type.
         */
        type: string;
        /**
         * Attribute status. Possible values: `available`, `processing`, `deleting`, `stuck`, or `failed`
         */
        status: string;
        /**
         * Is attribute required?
         */
        required: boolean;
        /**
         * Is attribute an array?
         */
        array?: boolean;
        /**
         * String format.
         */
        format: string;
        /**
         * Default value for attribute when not provided. Cannot be set when attribute is required.
         */
        default?: string;
    }
    /**
     * AttributeDatetime
     */
    export type AttributeDatetime = {
        /**
         * Attribute Key.
         */
        key: string;
        /**
         * Attribute type.
         */
        type: string;
        /**
         * Attribute status. Possible values: `available`, `processing`, `deleting`, `stuck`, or `failed`
         */
        status: string;
        /**
         * Is attribute required?
         */
        required: boolean;
        /**
         * Is attribute an array?
         */
        array?: boolean;
        /**
         * ISO 8601 format.
         */
        format: string;
        /**
         * Default value for attribute when not provided. Only null is optional
         */
        default?: string;
    }
    /**
     * Index
     */
    export type Index = {
        /**
         * Index Key.
         */
        key: string;
        /**
         * Index type.
         */
        type: string;
        /**
         * Index status. Possible values: `available`, `processing`, `deleting`, `stuck`, or `failed`
         */
        status: string;
        /**
         * Index attributes.
         */
        attributes: string[];
        /**
         * Index orders.
         */
        orders?: string[];
    }
    /**
     * Document
     */
    export type Document = {
        /**
         * Document ID.
         */
        $id: string;
        /**
         * Collection ID.
         */
        $collectionId: string;
        /**
         * Database ID.
         */
        $databaseId: string;
        /**
         * Document creation date in ISO 8601 format.
         */
        $createdAt: string;
        /**
         * Document update date in ISO 8601 format.
         */
        $updatedAt: string;
        /**
         * Document permissions. [Learn more about permissions](/docs/permissions).
         */
        $permissions: string[];
        [key: string]: any;
    }
    /**
     * Log
     */
    export type Log = {
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
         * Log creation date in ISO 8601 format.
         */
        time: string;
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
    }
    /**
     * User
     */
    export type User<Preferences extends Models.Preferences> = {
        /**
         * User ID.
         */
        $id: string;
        /**
         * User creation date in ISO 8601 format.
         */
        $createdAt: string;
        /**
         * User update date in ISO 8601 format.
         */
        $updatedAt: string;
        /**
         * User name.
         */
        name: string;
        /**
         * Hashed user password.
         */
        password: string;
        /**
         * Password hashing algorithm.
         */
        hash: string;
        /**
         * Password hashing algorithm configuration.
         */
        hashOptions: object;
        /**
         * User registration date in ISO 8601 format.
         */
        registration: string;
        /**
         * User status. Pass `true` for enabled and `false` for disabled.
         */
        status: boolean;
        /**
         * Password update time in ISO 8601 format.
         */
        passwordUpdate: string;
        /**
         * User email address.
         */
        email: string;
        /**
         * User phone number in E.164 format.
         */
        phone: string;
        /**
         * Email verification status.
         */
        emailVerification: boolean;
        /**
         * Phone verification status.
         */
        phoneVerification: boolean;
        /**
         * User preferences as a key-value object
         */
        prefs: Preferences;
    }
    /**
     * AlgoMD5
     */
    export type AlgoMd5 = {
    }
    /**
     * AlgoSHA
     */
    export type AlgoSha = {
    }
    /**
     * AlgoPHPass
     */
    export type AlgoPhpass = {
    }
    /**
     * AlgoBcrypt
     */
    export type AlgoBcrypt = {
    }
    /**
     * AlgoScrypt
     */
    export type AlgoScrypt = {
        /**
         * CPU complexity of computed hash.
         */
        costCpu: number;
        /**
         * Memory complexity of computed hash.
         */
        costMemory: number;
        /**
         * Parallelization of computed hash.
         */
        costParallel: number;
        /**
         * Length used to compute hash.
         */
        length: number;
    }
    /**
     * AlgoScryptModified
     */
    export type AlgoScryptModified = {
        /**
         * Salt used to compute hash.
         */
        salt: string;
        /**
         * Separator used to compute hash.
         */
        saltSeparator: string;
        /**
         * Key used to compute hash.
         */
        signerKey: string;
    }
    /**
     * AlgoArgon2
     */
    export type AlgoArgon2 = {
        /**
         * Memory used to compute hash.
         */
        memoryCost: number;
        /**
         * Amount of time consumed to compute hash
         */
        timeCost: number;
        /**
         * Number of threads used to compute hash.
         */
        threads: number;
    }
    /**
     * Account
     */
    export type Account<Preferences extends Models.Preferences> = {
        /**
         * User ID.
         */
        $id: string;
        /**
         * User creation date in ISO 8601 format.
         */
        $createdAt: string;
        /**
         * User update date in ISO 8601 format.
         */
        $updatedAt: string;
        /**
         * User name.
         */
        name: string;
        /**
         * User registration date in ISO 8601 format.
         */
        registration: string;
        /**
         * User status. Pass `true` for enabled and `false` for disabled.
         */
        status: boolean;
        /**
         * Password update time in ISO 8601 format.
         */
        passwordUpdate: string;
        /**
         * User email address.
         */
        email: string;
        /**
         * User phone number in E.164 format.
         */
        phone: string;
        /**
         * Email verification status.
         */
        emailVerification: boolean;
        /**
         * Phone verification status.
         */
        phoneVerification: boolean;
        /**
         * User preferences as a key-value object
         */
        prefs: Preferences;
    }
    /**
     * Preferences
     */
    export type Preferences = {
        [key: string]: any;
    }
    /**
     * Session
     */
    export type Session = {
        /**
         * Session ID.
         */
        $id: string;
        /**
         * Session creation date in ISO 8601 format.
         */
        $createdAt: string;
        /**
         * User ID.
         */
        userId: string;
        /**
         * Session expiration date in ISO 8601 format.
         */
        expire: string;
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
         * The date of when the access token expires in ISO 8601 format.
         */
        providerAccessTokenExpiry: string;
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
    }
    /**
     * Token
     */
    export type Token = {
        /**
         * Token ID.
         */
        $id: string;
        /**
         * Token creation date in ISO 8601 format.
         */
        $createdAt: string;
        /**
         * User ID.
         */
        userId: string;
        /**
         * Token secret key. This will return an empty string unless the response is returned using an API key or as part of a webhook payload.
         */
        secret: string;
        /**
         * Token expiration date in ISO 8601 format.
         */
        expire: string;
    }
    /**
     * JWT
     */
    export type Jwt = {
        /**
         * JWT encoded string.
         */
        jwt: string;
    }
    /**
     * Locale
     */
    export type Locale = {
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
    }
    /**
     * File
     */
    export type File = {
        /**
         * File ID.
         */
        $id: string;
        /**
         * Bucket ID.
         */
        bucketId: string;
        /**
         * File creation date in ISO 8601 format.
         */
        $createdAt: string;
        /**
         * File update date in ISO 8601 format.
         */
        $updatedAt: string;
        /**
         * File permissions. [Learn more about permissions](/docs/permissions).
         */
        $permissions: string[];
        /**
         * File name.
         */
        name: string;
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
    }
    /**
     * Bucket
     */
    export type Bucket = {
        /**
         * Bucket ID.
         */
        $id: string;
        /**
         * Bucket creation time in ISO 8601 format.
         */
        $createdAt: string;
        /**
         * Bucket update date in ISO 8601 format.
         */
        $updatedAt: string;
        /**
         * Bucket permissions. [Learn more about permissions](/docs/permissions).
         */
        $permissions: string[];
        /**
         * Whether file-level security is enabled. [Learn more about permissions](/docs/permissions).
         */
        fileSecurity: boolean;
        /**
         * Bucket name.
         */
        name: string;
        /**
         * Bucket enabled.
         */
        enabled: boolean;
        /**
         * Maximum file size supported.
         */
        maximumFileSize: number;
        /**
         * Allowed file extensions.
         */
        allowedFileExtensions: string[];
        /**
         * Compression algorithm choosen for compression. Will be one of none, [gzip](https://en.wikipedia.org/wiki/Gzip), or [zstd](https://en.wikipedia.org/wiki/Zstd).
         */
        compression: string;
        /**
         * Bucket is encrypted.
         */
        encryption: boolean;
        /**
         * Virus scanning is enabled.
         */
        antivirus: boolean;
    }
    /**
     * Team
     */
    export type Team = {
        /**
         * Team ID.
         */
        $id: string;
        /**
         * Team creation date in ISO 8601 format.
         */
        $createdAt: string;
        /**
         * Team update date in ISO 8601 format.
         */
        $updatedAt: string;
        /**
         * Team name.
         */
        name: string;
        /**
         * Total number of team members.
         */
        total: number;
    }
    /**
     * Membership
     */
    export type Membership = {
        /**
         * Membership ID.
         */
        $id: string;
        /**
         * Membership creation date in ISO 8601 format.
         */
        $createdAt: string;
        /**
         * Membership update date in ISO 8601 format.
         */
        $updatedAt: string;
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
         * Date, the user has been invited to join the team in ISO 8601 format.
         */
        invited: string;
        /**
         * Date, the user has accepted the invitation to join the team in ISO 8601 format.
         */
        joined: string;
        /**
         * User confirmation status, true if the user has joined the team or false otherwise.
         */
        confirm: boolean;
        /**
         * User list of roles
         */
        roles: string[];
    }
    /**
     * Function
     */
    export type Function = {
        /**
         * Function ID.
         */
        $id: string;
        /**
         * Function creation date in ISO 8601 format.
         */
        $createdAt: string;
        /**
         * Function update date in ISO 8601 format.
         */
        $updatedAt: string;
        /**
         * Execution permissions.
         */
        execute: string[];
        /**
         * Function name.
         */
        name: string;
        /**
         * Function enabled.
         */
        enabled: boolean;
        /**
         * Function execution runtime.
         */
        runtime: string;
        /**
         * Function&#039;s active deployment ID.
         */
        deployment: string;
        /**
         * Function variables.
         */
        vars: Variable[];
        /**
         * Function trigger events.
         */
        events: string[];
        /**
         * Function execution schedult in CRON format.
         */
        schedule: string;
        /**
         * Function&#039;s next scheduled execution time in ISO 8601 format.
         */
        scheduleNext: string;
        /**
         * Function&#039;s previous scheduled execution time in ISO 8601 format.
         */
        schedulePrevious: string;
        /**
         * Function execution timeout in seconds.
         */
        timeout: number;
    }
    /**
     * Runtime
     */
    export type Runtime = {
        /**
         * Runtime ID.
         */
        $id: string;
        /**
         * Runtime Name.
         */
        name: string;
        /**
         * Runtime version.
         */
        version: string;
        /**
         * Base Docker image used to build the runtime.
         */
        base: string;
        /**
         * Image name of Docker Hub.
         */
        image: string;
        /**
         * Name of the logo image.
         */
        logo: string;
        /**
         * List of supported architectures.
         */
        supports: string[];
    }
    /**
     * Deployment
     */
    export type Deployment = {
        /**
         * Deployment ID.
         */
        $id: string;
        /**
         * Deployment creation date in ISO 8601 format.
         */
        $createdAt: string;
        /**
         * Deployment update date in ISO 8601 format.
         */
        $updatedAt: string;
        /**
         * Resource ID.
         */
        resourceId: string;
        /**
         * Resource type.
         */
        resourceType: string;
        /**
         * The entrypoint file to use to execute the deployment code.
         */
        entrypoint: string;
        /**
         * The code size in bytes.
         */
        size: number;
        /**
         * The current build ID.
         */
        buildId: string;
        /**
         * Whether the deployment should be automatically activated.
         */
        activate: boolean;
        /**
         * The deployment status. Possible values are &quot;processing&quot;, &quot;building&quot;, &quot;pending&quot;, &quot;ready&quot;, and &quot;failed&quot;.
         */
        status: string;
        /**
         * The build stdout.
         */
        buildStdout: string;
        /**
         * The build stderr.
         */
        buildStderr: string;
    }
    /**
     * Execution
     */
    export type Execution = {
        /**
         * Execution ID.
         */
        $id: string;
        /**
         * Execution creation date in ISO 8601 format.
         */
        $createdAt: string;
        /**
         * Execution upate date in ISO 8601 format.
         */
        $updatedAt: string;
        /**
         * Execution roles.
         */
        $permissions: string[];
        /**
         * Function ID.
         */
        functionId: string;
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
         * The script stdout output string. Logs the last 4,000 characters of the execution stdout output. This will return an empty string unless the response is returned using an API key or as part of a webhook payload.
         */
        stdout: string;
        /**
         * The script stderr output string. Logs the last 4,000 characters of the execution stderr output. This will return an empty string unless the response is returned using an API key or as part of a webhook payload.
         */
        stderr: string;
        /**
         * The script execution duration in seconds.
         */
        duration: number;
    }
    /**
     * Project
     */
    export type Project = {
        /**
         * Project ID.
         */
        $id: string;
        /**
         * Project creation date in ISO 8601 format.
         */
        $createdAt: string;
        /**
         * Project update date in ISO 8601 format.
         */
        $updatedAt: string;
        /**
         * Project name.
         */
        name: string;
        /**
         * Project description.
         */
        description: string;
        /**
         * Project team ID.
         */
        teamId: string;
        /**
         * Project logo file ID.
         */
        logo: string;
        /**
         * Project website URL.
         */
        url: string;
        /**
         * Company legal name.
         */
        legalName: string;
        /**
         * Country code in [ISO 3166-1](http://en.wikipedia.org/wiki/ISO_3166-1) two-character format.
         */
        legalCountry: string;
        /**
         * State name.
         */
        legalState: string;
        /**
         * City name.
         */
        legalCity: string;
        /**
         * Company Address.
         */
        legalAddress: string;
        /**
         * Company Tax ID.
         */
        legalTaxId: string;
        /**
         * Max users allowed. 0 is unlimited.
         */
        authLimit: number;
        /**
         * List of Platforms.
         */
        platforms: Platform[];
        /**
         * List of Webhooks.
         */
        webhooks: Webhook[];
        /**
         * List of API Keys.
         */
        keys: Key[];
        /**
         * List of Domains.
         */
        domains: Domain[];
        /**
         * Amazon OAuth app ID.
         */
        providerAmazonAppid: string;
        /**
         * Amazon OAuth secret ID.
         */
        providerAmazonSecret: string;
        /**
         * Apple OAuth app ID.
         */
        providerAppleAppid: string;
        /**
         * Apple OAuth secret ID.
         */
        providerAppleSecret: string;
        /**
         * Auth0 OAuth app ID.
         */
        providerAuth0Appid: string;
        /**
         * Auth0 OAuth secret ID.
         */
        providerAuth0Secret: string;
        /**
         * Authentik OAuth app ID.
         */
        providerAuthentikAppid: string;
        /**
         * Authentik OAuth secret ID.
         */
        providerAuthentikSecret: string;
        /**
         * Autodesk OAuth app ID.
         */
        providerAutodeskAppid: string;
        /**
         * Autodesk OAuth secret ID.
         */
        providerAutodeskSecret: string;
        /**
         * BitBucket OAuth app ID.
         */
        providerBitbucketAppid: string;
        /**
         * BitBucket OAuth secret ID.
         */
        providerBitbucketSecret: string;
        /**
         * Bitly OAuth app ID.
         */
        providerBitlyAppid: string;
        /**
         * Bitly OAuth secret ID.
         */
        providerBitlySecret: string;
        /**
         * Box OAuth app ID.
         */
        providerBoxAppid: string;
        /**
         * Box OAuth secret ID.
         */
        providerBoxSecret: string;
        /**
         * Dailymotion OAuth app ID.
         */
        providerDailymotionAppid: string;
        /**
         * Dailymotion OAuth secret ID.
         */
        providerDailymotionSecret: string;
        /**
         * Discord OAuth app ID.
         */
        providerDiscordAppid: string;
        /**
         * Discord OAuth secret ID.
         */
        providerDiscordSecret: string;
        /**
         * Disqus OAuth app ID.
         */
        providerDisqusAppid: string;
        /**
         * Disqus OAuth secret ID.
         */
        providerDisqusSecret: string;
        /**
         * Dropbox OAuth app ID.
         */
        providerDropboxAppid: string;
        /**
         * Dropbox OAuth secret ID.
         */
        providerDropboxSecret: string;
        /**
         * Etsy OAuth app ID.
         */
        providerEtsyAppid: string;
        /**
         * Etsy OAuth secret ID.
         */
        providerEtsySecret: string;
        /**
         * Facebook OAuth app ID.
         */
        providerFacebookAppid: string;
        /**
         * Facebook OAuth secret ID.
         */
        providerFacebookSecret: string;
        /**
         * GitHub OAuth app ID.
         */
        providerGithubAppid: string;
        /**
         * GitHub OAuth secret ID.
         */
        providerGithubSecret: string;
        /**
         * GitLab OAuth app ID.
         */
        providerGitlabAppid: string;
        /**
         * GitLab OAuth secret ID.
         */
        providerGitlabSecret: string;
        /**
         * Google OAuth app ID.
         */
        providerGoogleAppid: string;
        /**
         * Google OAuth secret ID.
         */
        providerGoogleSecret: string;
        /**
         * LinkedIn OAuth app ID.
         */
        providerLinkedinAppid: string;
        /**
         * LinkedIn OAuth secret ID.
         */
        providerLinkedinSecret: string;
        /**
         * Microsoft OAuth app ID.
         */
        providerMicrosoftAppid: string;
        /**
         * Microsoft OAuth secret ID.
         */
        providerMicrosoftSecret: string;
        /**
         * Notion OAuth app ID.
         */
        providerNotionAppid: string;
        /**
         * Notion OAuth secret ID.
         */
        providerNotionSecret: string;
        /**
         * Okta OAuth app ID.
         */
        providerOktaAppid: string;
        /**
         * Okta OAuth secret ID.
         */
        providerOktaSecret: string;
        /**
         * PayPal OAuth app ID.
         */
        providerPaypalAppid: string;
        /**
         * PayPal OAuth secret ID.
         */
        providerPaypalSecret: string;
        /**
         * PayPal OAuth app ID.
         */
        providerPaypalSandboxAppid: string;
        /**
         * PayPal OAuth secret ID.
         */
        providerPaypalSandboxSecret: string;
        /**
         * Podio OAuth app ID.
         */
        providerPodioAppid: string;
        /**
         * Podio OAuth secret ID.
         */
        providerPodioSecret: string;
        /**
         * Salesforce OAuth app ID.
         */
        providerSalesforceAppid: string;
        /**
         * Salesforce OAuth secret ID.
         */
        providerSalesforceSecret: string;
        /**
         * Slack OAuth app ID.
         */
        providerSlackAppid: string;
        /**
         * Slack OAuth secret ID.
         */
        providerSlackSecret: string;
        /**
         * Spotify OAuth app ID.
         */
        providerSpotifyAppid: string;
        /**
         * Spotify OAuth secret ID.
         */
        providerSpotifySecret: string;
        /**
         * Stripe OAuth app ID.
         */
        providerStripeAppid: string;
        /**
         * Stripe OAuth secret ID.
         */
        providerStripeSecret: string;
        /**
         * Tradeshift OAuth app ID.
         */
        providerTradeshiftAppid: string;
        /**
         * Tradeshift OAuth secret ID.
         */
        providerTradeshiftSecret: string;
        /**
         * Tradeshift OAuth app ID.
         */
        providerTradeshiftBoxAppid: string;
        /**
         * Tradeshift OAuth secret ID.
         */
        providerTradeshiftBoxSecret: string;
        /**
         * Twitch OAuth app ID.
         */
        providerTwitchAppid: string;
        /**
         * Twitch OAuth secret ID.
         */
        providerTwitchSecret: string;
        /**
         * WordPress OAuth app ID.
         */
        providerWordpressAppid: string;
        /**
         * WordPress OAuth secret ID.
         */
        providerWordpressSecret: string;
        /**
         * Yahoo OAuth app ID.
         */
        providerYahooAppid: string;
        /**
         * Yahoo OAuth secret ID.
         */
        providerYahooSecret: string;
        /**
         * Yammer OAuth app ID.
         */
        providerYammerAppid: string;
        /**
         * Yammer OAuth secret ID.
         */
        providerYammerSecret: string;
        /**
         * Yandex OAuth app ID.
         */
        providerYandexAppid: string;
        /**
         * Yandex OAuth secret ID.
         */
        providerYandexSecret: string;
        /**
         * Zoom OAuth app ID.
         */
        providerZoomAppid: string;
        /**
         * Zoom OAuth secret ID.
         */
        providerZoomSecret: string;
        /**
         * Mock OAuth app ID.
         */
        providerMockAppid: string;
        /**
         * Mock OAuth secret ID.
         */
        providerMockSecret: string;
        /**
         * Email/Password auth method status
         */
        authEmailPassword: boolean;
        /**
         * Magic URL auth method status
         */
        authUsersAuthMagicURL: boolean;
        /**
         * Anonymous auth method status
         */
        authAnonymous: boolean;
        /**
         * Invites auth method status
         */
        authInvites: boolean;
        /**
         * JWT auth method status
         */
        authJWT: boolean;
        /**
         * Phone auth method status
         */
        authPhone: boolean;
        /**
         * Account service status
         */
        serviceStatusForAccount: boolean;
        /**
         * Avatars service status
         */
        serviceStatusForAvatars: boolean;
        /**
         * Databases service status
         */
        serviceStatusForDatabases: boolean;
        /**
         * Locale service status
         */
        serviceStatusForLocale: boolean;
        /**
         * Health service status
         */
        serviceStatusForHealth: boolean;
        /**
         * Storage service status
         */
        serviceStatusForStorage: boolean;
        /**
         * Teams service status
         */
        serviceStatusForTeams: boolean;
        /**
         * Users service status
         */
        serviceStatusForUsers: boolean;
        /**
         * Functions service status
         */
        serviceStatusForFunctions: boolean;
    }
    /**
     * Webhook
     */
    export type Webhook = {
        /**
         * Webhook ID.
         */
        $id: string;
        /**
         * Webhook creation date in ISO 8601 format.
         */
        $createdAt: string;
        /**
         * Webhook update date in ISO 8601 format.
         */
        $updatedAt: string;
        /**
         * Webhook name.
         */
        name: string;
        /**
         * Webhook URL endpoint.
         */
        url: string;
        /**
         * Webhook trigger events.
         */
        events: string[];
        /**
         * Indicated if SSL / TLS Certificate verification is enabled.
         */
        security: boolean;
        /**
         * HTTP basic authentication username.
         */
        httpUser: string;
        /**
         * HTTP basic authentication password.
         */
        httpPass: string;
        /**
         * Signature key which can be used to validated incoming
         */
        signatureKey: string;
    }
    /**
     * Key
     */
    export type Key = {
        /**
         * Key ID.
         */
        $id: string;
        /**
         * Key creation date in ISO 8601 format.
         */
        $createdAt: string;
        /**
         * Key update date in ISO 8601 format.
         */
        $updatedAt: string;
        /**
         * Key name.
         */
        name: string;
        /**
         * Key expiration date in ISO 8601 format.
         */
        expire: string;
        /**
         * Allowed permission scopes.
         */
        scopes: string[];
        /**
         * Secret key.
         */
        secret: string;
        /**
         * Most recent access date in ISO 8601 format.
         */
        accessedAt: string;
        /**
         * List of SDK user agents that used this key.
         */
        sdks: string[];
    }
    /**
     * Domain
     */
    export type Domain = {
        /**
         * Domain ID.
         */
        $id: string;
        /**
         * Domain creation date in ISO 8601 format.
         */
        $createdAt: string;
        /**
         * Domain update date in ISO 8601 format.
         */
        $updatedAt: string;
        /**
         * Domain name.
         */
        domain: string;
        /**
         * Registerable domain name.
         */
        registerable: string;
        /**
         * TLD name.
         */
        tld: string;
        /**
         * Verification process status.
         */
        verification: boolean;
        /**
         * Certificate ID.
         */
        certificateId: string;
    }
    /**
     * Platform
     */
    export type Platform = {
        /**
         * Platform ID.
         */
        $id: string;
        /**
         * Platform creation date in ISO 8601 format.
         */
        $createdAt: string;
        /**
         * Platform update date in ISO 8601 format.
         */
        $updatedAt: string;
        /**
         * Platform name.
         */
        name: string;
        /**
         * Platform type. Possible values are: web, flutter-ios, flutter-android, ios, android, and unity.
         */
        type: string;
        /**
         * Platform Key. iOS bundle ID or Android package name.  Empty string for other platforms.
         */
        key: string;
        /**
         * App store or Google Play store ID.
         */
        store: string;
        /**
         * Web app hostname. Empty string for other platforms.
         */
        hostname: string;
        /**
         * HTTP basic authentication username.
         */
        httpUser: string;
        /**
         * HTTP basic authentication password.
         */
        httpPass: string;
    }
    /**
     * Variable
     */
    export type Variable = {
        /**
         * Variable ID.
         */
        $id: string;
        /**
         * Variable creation date in ISO 8601 format.
         */
        $createdAt: string;
        /**
         * Variable creation date in ISO 8601 format.
         */
        $updatedAt: string;
        /**
         * Variable key.
         */
        key: string;
        /**
         * Variable value.
         */
        value: string;
        /**
         * Function ID.
         */
        functionId: string;
    }
    /**
     * Country
     */
    export type Country = {
        /**
         * Country name.
         */
        name: string;
        /**
         * Country two-character ISO 3166-1 alpha code.
         */
        code: string;
    }
    /**
     * Continent
     */
    export type Continent = {
        /**
         * Continent name.
         */
        name: string;
        /**
         * Continent two letter code.
         */
        code: string;
    }
    /**
     * Language
     */
    export type Language = {
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
    }
    /**
     * Currency
     */
    export type Currency = {
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
    }
    /**
     * Phone
     */
    export type Phone = {
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
    }
    /**
     * Health Antivirus
     */
    export type HealthAntivirus = {
        /**
         * Antivirus version.
         */
        version: string;
        /**
         * Antivirus status. Possible values can are: `disabled`, `offline`, `online`
         */
        status: string;
    }
    /**
     * Health Queue
     */
    export type HealthQueue = {
        /**
         * Amount of actions in the queue.
         */
        size: number;
    }
    /**
     * Health Status
     */
    export type HealthStatus = {
        /**
         * Duration in milliseconds how long the health check took.
         */
        ping: number;
        /**
         * Service status. Possible values can are: `pass`, `fail`
         */
        status: string;
    }
    /**
     * Health Time
     */
    export type HealthTime = {
        /**
         * Current unix timestamp on trustful remote server.
         */
        remoteTime: number;
        /**
         * Current unix timestamp of local server where Appwrite runs.
         */
        localTime: number;
        /**
         * Difference of unix remote and local timestamps in milliseconds.
         */
        diff: number;
    }
    /**
     * Metric
     */
    export type Metric = {
        /**
         * The value of this metric at the timestamp.
         */
        value: number;
        /**
         * The date at which this metric was aggregated in ISO 8601 format.
         */
        date: string;
    }
    /**
     * UsageDatabases
     */
    export type UsageDatabases = {
        /**
         * The time range of the usage stats.
         */
        range: string;
        /**
         * Aggregated stats for total number of documents.
         */
        databasesCount: MetricList[];
        /**
         * Aggregated stats for total number of documents.
         */
        documentsCount: MetricList[];
        /**
         * Aggregated stats for total number of collections.
         */
        collectionsCount: MetricList[];
        /**
         * Aggregated stats for documents created.
         */
        databasesCreate: MetricList[];
        /**
         * Aggregated stats for documents read.
         */
        databasesRead: MetricList[];
        /**
         * Aggregated stats for documents updated.
         */
        databasesUpdate: MetricList[];
        /**
         * Aggregated stats for total number of collections.
         */
        databasesDelete: MetricList[];
        /**
         * Aggregated stats for documents created.
         */
        documentsCreate: MetricList[];
        /**
         * Aggregated stats for documents read.
         */
        documentsRead: MetricList[];
        /**
         * Aggregated stats for documents updated.
         */
        documentsUpdate: MetricList[];
        /**
         * Aggregated stats for documents deleted.
         */
        documentsDelete: MetricList[];
        /**
         * Aggregated stats for collections created.
         */
        collectionsCreate: MetricList[];
        /**
         * Aggregated stats for collections read.
         */
        collectionsRead: MetricList[];
        /**
         * Aggregated stats for collections updated.
         */
        collectionsUpdate: MetricList[];
        /**
         * Aggregated stats for collections delete.
         */
        collectionsDelete: MetricList[];
    }
    /**
     * UsageDatabase
     */
    export type UsageDatabase = {
        /**
         * The time range of the usage stats.
         */
        range: string;
        /**
         * Aggregated stats for total number of documents.
         */
        documentsCount: MetricList[];
        /**
         * Aggregated stats for total number of collections.
         */
        collectionsCount: MetricList[];
        /**
         * Aggregated stats for documents created.
         */
        documentsCreate: MetricList[];
        /**
         * Aggregated stats for documents read.
         */
        documentsRead: MetricList[];
        /**
         * Aggregated stats for documents updated.
         */
        documentsUpdate: MetricList[];
        /**
         * Aggregated stats for documents deleted.
         */
        documentsDelete: MetricList[];
        /**
         * Aggregated stats for collections created.
         */
        collectionsCreate: MetricList[];
        /**
         * Aggregated stats for collections read.
         */
        collectionsRead: MetricList[];
        /**
         * Aggregated stats for collections updated.
         */
        collectionsUpdate: MetricList[];
        /**
         * Aggregated stats for collections delete.
         */
        collectionsDelete: MetricList[];
    }
    /**
     * UsageCollection
     */
    export type UsageCollection = {
        /**
         * The time range of the usage stats.
         */
        range: string;
        /**
         * Aggregated stats for total number of documents.
         */
        documentsCount: MetricList[];
        /**
         * Aggregated stats for documents created.
         */
        documentsCreate: MetricList[];
        /**
         * Aggregated stats for documents read.
         */
        documentsRead: MetricList[];
        /**
         * Aggregated stats for documents updated.
         */
        documentsUpdate: MetricList[];
        /**
         * Aggregated stats for documents deleted.
         */
        documentsDelete: MetricList[];
    }
    /**
     * UsageUsers
     */
    export type UsageUsers = {
        /**
         * The time range of the usage stats.
         */
        range: string;
        /**
         * Aggregated stats for total number of users.
         */
        usersCount: MetricList[];
        /**
         * Aggregated stats for users created.
         */
        usersCreate: MetricList[];
        /**
         * Aggregated stats for users read.
         */
        usersRead: MetricList[];
        /**
         * Aggregated stats for users updated.
         */
        usersUpdate: MetricList[];
        /**
         * Aggregated stats for users deleted.
         */
        usersDelete: MetricList[];
        /**
         * Aggregated stats for sessions created.
         */
        sessionsCreate: MetricList[];
        /**
         * Aggregated stats for sessions created for a provider ( email, anonymous or oauth2 ).
         */
        sessionsProviderCreate: MetricList[];
        /**
         * Aggregated stats for sessions deleted.
         */
        sessionsDelete: MetricList[];
    }
    /**
     * StorageUsage
     */
    export type UsageStorage = {
        /**
         * The time range of the usage stats.
         */
        range: string;
        /**
         * Aggregated stats for the occupied storage size (in bytes).
         */
        storage: MetricList[];
        /**
         * Aggregated stats for total number of files.
         */
        filesCount: MetricList[];
        /**
         * Aggregated stats for total number of buckets.
         */
        bucketsCount: MetricList[];
        /**
         * Aggregated stats for buckets created.
         */
        bucketsCreate: MetricList[];
        /**
         * Aggregated stats for buckets read.
         */
        bucketsRead: MetricList[];
        /**
         * Aggregated stats for buckets updated.
         */
        bucketsUpdate: MetricList[];
        /**
         * Aggregated stats for buckets deleted.
         */
        bucketsDelete: MetricList[];
        /**
         * Aggregated stats for files created.
         */
        filesCreate: MetricList[];
        /**
         * Aggregated stats for files read.
         */
        filesRead: MetricList[];
        /**
         * Aggregated stats for files updated.
         */
        filesUpdate: MetricList[];
        /**
         * Aggregated stats for files deleted.
         */
        filesDelete: MetricList[];
    }
    /**
     * UsageBuckets
     */
    export type UsageBuckets = {
        /**
         * The time range of the usage stats.
         */
        range: string;
        /**
         * Aggregated stats for total number of files in this bucket.
         */
        filesCount: MetricList[];
        /**
         * Aggregated stats for total storage of files in this bucket.
         */
        filesStorage: MetricList[];
        /**
         * Aggregated stats for files created.
         */
        filesCreate: MetricList[];
        /**
         * Aggregated stats for files read.
         */
        filesRead: MetricList[];
        /**
         * Aggregated stats for files updated.
         */
        filesUpdate: MetricList[];
        /**
         * Aggregated stats for files deleted.
         */
        filesDelete: MetricList[];
    }
    /**
     * UsageFunctions
     */
    export type UsageFunctions = {
        /**
         * The time range of the usage stats.
         */
        range: string;
        /**
         * Aggregated stats for number of function executions.
         */
        executionsTotal: MetricList[];
        /**
         * Aggregated stats for function execution failures.
         */
        executionsFailure: MetricList[];
        /**
         * Aggregated stats for function execution successes.
         */
        executionsSuccess: MetricList[];
        /**
         * Aggregated stats for function execution duration.
         */
        executionsTime: MetricList[];
        /**
         * Aggregated stats for number of function builds.
         */
        buildsTotal: MetricList[];
        /**
         * Aggregated stats for function build failures.
         */
        buildsFailure: MetricList[];
        /**
         * Aggregated stats for function build successes.
         */
        buildsSuccess: MetricList[];
        /**
         * Aggregated stats for function build duration.
         */
        buildsTime: MetricList[];
    }
    /**
     * UsageProject
     */
    export type UsageProject = {
        /**
         * The time range of the usage stats.
         */
        range: string;
        /**
         * Aggregated stats for number of requests.
         */
        requests: MetricList[];
        /**
         * Aggregated stats for consumed bandwidth.
         */
        network: MetricList[];
        /**
         * Aggregated stats for function executions.
         */
        executions: MetricList[];
        /**
         * Aggregated stats for number of documents.
         */
        documents: MetricList[];
        /**
         * Aggregated stats for number of collections.
         */
        collections: MetricList[];
        /**
         * Aggregated stats for number of users.
         */
        users: MetricList[];
        /**
         * Aggregated stats for the occupied storage size (in bytes).
         */
        storage: MetricList[];
    }
}
