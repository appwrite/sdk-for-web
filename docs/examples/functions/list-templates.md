import { Client, Functions } from "appwrite";

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('&lt;YOUR_PROJECT_ID&gt;'); // Your project ID

const functions = new Functions(client);

const result = await functions.listTemplates(
    [], // runtimes (optional)
    [], // useCases (optional)
    1, // limit (optional)
    0 // offset (optional)
);

console.log(result);
