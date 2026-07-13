# Change Log

## 26.2.0

* Added: `Client.setBearer()` to authenticate requests with an OAuth access token
* Added: `appwrite` value to `OAuthProvider` enum
* Added: `Query.vectorDot`, `Query.vectorCosine`, `Query.vectorEuclidean` vector similarity query helpers
* Added: geolocation and network fields (`city`, `timeZone`, `latitude`, `isp`, ASN, connection info) to `Locale` model
* Fixed: `AppwriteException` message now falls back to response text when missing

## 26.1.0

* Added: Realtime connections now send the configured JWT for authentication.
* Added: Forwarded `impersonateUserId` on `avatars` and `storage` file requests.

## 26.0.0

* Breaking: Renamed `Theme` enum to `BrowserTheme`, changing `avatars.getScreenshot()` `theme` param type.
* Breaking: Made `presences` `list`/`get`/`upsert`/`update` non-generic and removed `Models.DefaultPresence`.
* Added: Email metadata fields to `User` (`emailCanonical`, `emailIsFree`, `emailIsDisposable`, `emailIsCorporate`, `emailIsCanonical`).
* Added: `Membership.userAccessedAt` and `Presence.metadata` fields.
* Fixed: Removed `Client.setKey()` and `Client.setForwardedUserAgent()` methods that were exposed on the client SDK by mistake.
* Fixed: `toString()` on response objects now returns valid JSON via `JSONbig.stringify`, preserving large integers.
* Updated: Requests now send an explicit `accept` header matching each endpoint's response type.

## 25.1.1

* Fixed: Removed `Advisor` service and `Insight`, `InsightCTA`, `InsightList`, `Report`, `ReportList` models (admin-only endpoints, not intended for client SDKs)
* Added: `sizeActual` field to `File` model

## 25.1.0

* Added: Realtime `presences` channel and `RealtimePresence` types for presence subscriptions
* Added: `Advisor` and `Presences` services
* Added: `Insight`, `Presence`, and `Report` models with list variants
* Added: `fusionauth`, `keycloak`, and `kick` providers to `OAuthProvider` enum
* Added: `Client.setCookie()` method for forwarding cookies in server-side runtimes
* Updated: `X-Appwrite-Response-Format` header to `1.9.5`

## 25.0.0

* Breaking: Added `unsubscribe()`, `update()`, and `close()` to Realtime subscriptions
* Added: Added `userPhone` field to `Membership` model
* Updated: Updated `X-Appwrite-Response-Format` header to `1.9.2`

## 24.2.0

* Added `x` OAuth provider to `OAuthProvider` enum
* Added `userType` field to `Log` model
* Updated `X-Appwrite-Response-Format` header to `1.9.1`
* Updated TTL description for list caching in Databases and TablesDB
* Updated dev dependencies: Rollup 3→4, related plugin upgrades

## 24.1.1

* Fixed: Added `files` field to `package.json` to publish only built artifacts to npm

## 24.1.0

* Added: Added `getHeaders()` method to `Client` to expose current request headers
* Added: Added `package-lock.json` to track dependency lockfile in version control

## 24.0.0

* [BREAKING] Changed `$sequence` type from `number` to `string` for `Row` and `Document` models
* Added impersonation support: `setImpersonateUserId()`, `setImpersonateUserEmail()`, `setImpersonateUserPhone()` on `Client`
* Added `impersonator` and `impersonatorUserId` optional fields to `User` model
* Added custom `toString()` on response data objects using `JSONbig.stringify` to fix BigInt serialization
* Updated `Log` model field descriptions to clarify impersonation behavior for `userId`, `userEmail`, `userName`
* Updated `X-Appwrite-Response-Format` header to `1.9.0`
* Updated devDependencies: Rollup 2→3, TypeScript 4.7→5.7, and related plugin upgrades

## 23.0.0

* Breaking: Made Channel.collection() require id parameter
* Breaking: Made Channel.table() require id parameter
* Breaking: Root factory methods require explicit IDs (databases, executions, tablesdb, bucket, function, team, membership)
* Added ttl option to listDocuments and listRows for caching

## 22.4.1

* Fix very large double values (for example 1.7976931348623157e+308) from being expanded into giant integer literals

## 22.4.0

* Added Query.containsAny(attribute, value[]) to filter resources where the attribute contains any of the given values.
* Added Query.containsAll(attribute, value[]) to filter resources where the attribute contains all of the given values.
* Updated Query.contains documentation to clarify behavior: string attributes are matched by substring, and for array attributes use containsAny/containsAll.

## 22.3.1

* Add `upsert` method to Realtime `Channels` helper class
* Fix `bignumber.js` bundler conflict with Next.js Turbopack by removing direct dependency in favor of transitive dependency from `json-bigint`

## 22.1.0

* Add `queries` parameter to `Realtime.subscribe()` and `client.subscribe()` for server-side query filtering
* Add slot-based subscription management with subscription ID mappings from backend
* Add `subscriptions` field to `RealtimeResponseEvent` type
* Fix `Roles` enum removed from Teams service; `roles` parameter now accepts `string[]`
* Fix parameter detection in overloaded methods to check for optional params (Account, Avatars, Graphql)
* Fix WebSocket connection handling with stale connection guards and improved close/reconnect logic
* Fix doc examples wrapped in markdown code fences

## 22.0.0

* Add array-based enum parameters (e.g., `permissions: BrowserPermission[]`).
* Breaking change: `Output` enum has been removed; use `ImageFormat` instead.
* Add `Channel` helpers for Realtime.

## 21.5.0

* Add `getScreenshot` method to `Avatars` service
* Add `Theme`, `Timezone` and `Output` enums

## 21.4.0

* Add `total` parameter to list queries allowing skipping counting rows in a table for improved performance
* Add `Operator` class for atomic modification of rows via update, bulk update, upsert, and bulk upsert operations

## 21.3.0

* Add new `Realtime` service with methods for subscribing to channels and receiving messages
* Fix `client.setSession` not working when using realtime
* Deprecate `client.subscribe` method in favor of `Realtime` service

> Note: Deprecated methods are still available for backwards compatibility, but might be removed in future versions.

## 21.2.1

* Add transaction support for Databases and TablesDB

## 21.1.0

* Deprecate `createVerification` method in `Account` service
* Add `createEmailVerification` method in `Account` service

## 18.2.0

* Add `incrementDocumentAttribute` and `decrementDocumentAttribute` support to `Databases` service
* Add `gif` support to `ImageFormat` enum
* Fix undefined `fileParam` error in `chunkedUpload` method
* Fix autocompletion not working for `Document` model even when generic is passed

## 18.1.1

* Fix using `devKeys` resulting in an error by conditionally removing credentials

## 18.1.0

* Add `devKeys` support to `Client` service
* Add `upsertDocument` support to `Databases` service

## 18.0.0

* Add `<REGION>` to doc examples due to the new multi region endpoints
* Remove `Gif` from ImageFormat enum
* Remove `search` param from `listExecutions` method
* Add `token` param to `getFilePreview` and `getFileView` for File tokens usage
* Improve CORS error catching in `client.call` method

## 17.0.2

* Fix requests failing by removing `Content-Type` header from `GET` and `HEAD` requests

## 17.0.1

* Remove unnecessary titles from method descriptions
* Fix duplicate adding of payload params
* Remove unnecessary awaits and asyncs
* Ensure `AppwriteException` response is always string

## 17.0.0

* Fix pong response & chunked upload
* Add `ping` support to `Realtime` service
