# Change Log

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