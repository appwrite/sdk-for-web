let sdk = new Appwrite();

sdk
    setProject('')
    setKey('')
;

let promise = sdk.storage.getFileDownload('[ID]');

promise.then(function (response) {
    console.log(response);
}, function (error) {
    console.log(error);
});