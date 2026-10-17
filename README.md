# Appwrite Web SDK

![License](https://img.shields.io/badge/license-BSD--3--Clause-blue.svg?style=flat-square)
![Version](https://img.shields.io/badge/api%20version-2.5.0-blue.svg?style=flat-square)
[![X Account](https://img.shields.io/badge/follow-%40appwrite-000000?logo=x&style=flat-square)](https://x.com/appwrite)
[![Discord](https://img.shields.io/discord/564160730845151244?label=discord&style=flat-square)](https://appwrite.io/discord)

**This SDK targets Appwrite server version 2.5.x as shipped on Appwrite Cloud.** Self-hosted releases can lag behind Cloud — if you run an older self-hosted build, use a matching older SDK from [previous releases](https://github.com/appwrite/sdk-for-web/releases) when APIs differ.

Appwrite is an open-source backend as a service server that abstracts and simplifies complex and repetitive development tasks behind a very simple to use REST API. Appwrite aims to help you develop your apps faster and in a more secure way. Use the Web SDK to integrate your app with the Appwrite server to easily start interacting with all of Appwrite backend APIs and tools. For full API documentation and tutorials go to [https://appwrite.io/docs](https://appwrite.io/docs)

![Appwrite](https://github.com/appwrite/appwrite/raw/main/public/images/github.png)

## Installation

### npm

```bash
npm install appwrite
```

Import the modules you need. The package ships ES modules, CommonJS and TypeScript types:

```js
import { Client, Account } from 'appwrite';
```

### CDN

Add the script before any code that uses the SDK. It exposes every export on the global `Appwrite` object:

```html
<script src="https://cdn.jsdelivr.net/npm/appwrite@29.0.0"></script>
<script>
    const { Client, Account } = Appwrite;
</script>
```

## Getting started

### Add a Web platform

In the Appwrite Console, open your project and under **Add a platform** choose **Web app**. Enter the hostname your app runs on: `localhost` for local development, and your production domain once you deploy. Appwrite only accepts browser requests from hostnames registered as platforms, so a missing hostname shows up as a CORS error.

### Initialize the client

Copy your endpoint and project ID from your project's **Settings** page.

```js
import { Client } from 'appwrite';

const client = new Client()
    .setEndpoint('https://<REGION>.cloud.appwrite.io/v1')
    .setProject('<PROJECT_ID>');
```

For a self-hosted Appwrite, use `https://<HOSTNAME>/v1` as the endpoint.

### Make your first request

Create a service from the client and call any of its methods. Every method takes a single object of named parameters and returns a promise. See the [API reference](https://appwrite.io/docs/references) for every service and method.

```js
import { Account, ID } from 'appwrite';

const account = new Account(client);

const user = await account.create({
    userId: ID.unique(),
    email: 'email@example.com',
    password: 'password',
    name: "Walter O'Brien",
});

console.log(user);
```

### Sign in with OAuth

Enable the provider in the Console under **Auth > Settings**, then redirect the user to it. The `success` and `failure` URLs must be on a hostname you registered as a platform.

```js
import { Account, OAuthProvider } from 'appwrite';

const account = new Account(client);

account.createOAuth2Session({
    provider: OAuthProvider.Github,
    success: 'https://example.com/success',
    failure: 'https://example.com/failure',
});
```

### Type safety with models

Methods that return rows, such as `listRows` and `getRow`, accept a type parameter for your own row shape:

```ts
import { TablesDB, type Models } from 'appwrite';

interface Book extends Models.Row {
    name: string;
    author: string;
    releaseYear?: string;
    genre?: string[];
    isCheckedOut: boolean;
}

const tablesDB = new TablesDB(client);

const result = await tablesDB.listRows<Book>({
    databaseId: '<DATABASE_ID>',
    tableId: '<TABLE_ID>',
});

for (const book of result.rows) {
    console.log(`${book.name} by ${book.author}`);
}
```

In JavaScript, the same types are available through JSDoc:

```js
import { TablesDB } from 'appwrite';

const tablesDB = new TablesDB(client);

/**
 * @typedef {import('appwrite').Models.Row & {
 *     name: string,
 *     author: string,
 *     isCheckedOut: boolean,
 * }} Book
 */

/** @type {import('appwrite').Models.RowList<Book>} */
const result = await tablesDB.listRows({
    databaseId: '<DATABASE_ID>',
    tableId: '<TABLE_ID>',
});
```

The [Appwrite CLI](https://github.com/appwrite/sdk-for-cli) can generate these interfaces from your database schema with `appwrite types`. See [type generation](https://appwrite.io/docs/products/databases/tablesdb/type-generation).

### Error handling

Failed requests throw an `AppwriteException` with `message`, `code`, `type` and `response` properties.

```js
import { AppwriteException } from 'appwrite';

try {
    const user = await account.get();
    console.log(user);
} catch (error) {
    if (error instanceof AppwriteException) {
        console.error(error.code, error.type, error.message);
    }
}
```

The [response codes](https://appwrite.io/docs/apis/response-codes) page lists every error type.

### Learn more

- [Web quick start](https://appwrite.io/docs/quick-starts/web)
- [Appwrite docs](https://appwrite.io/docs)
- [Discord community](https://appwrite.io/discord)
- [Web playground](https://github.com/appwrite/playground-for-web)

## Contribution

This library is auto-generated by the Appwrite [SDK Generator](https://github.com/appwrite/sdk-generator). To learn more about how you can help us improve this SDK, please check the [contribution guide](https://github.com/appwrite/sdk-generator/blob/main/CONTRIBUTING.md) before sending a pull-request.

## License

Please see the [BSD-3-Clause license](https://raw.githubusercontent.com/appwrite/appwrite/master/LICENSE) file for more information.
