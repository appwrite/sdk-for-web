import { Client, Avatars, Flag } from "appwrite";

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('&lt;YOUR_PROJECT_ID&gt;'); // Your project ID

const avatars = new Avatars(client);

const result = avatars.getFlag(
    Flag.Afghanistan, // code
    0, // width (optional)
    0, // height (optional)
    0 // quality (optional)
);

console.log(result);
