import { Client, Graphql } from "appwrite";

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('&lt;YOUR_PROJECT_ID&gt;'); // Your project ID

const graphql = new Graphql(client);

const result = await graphql.query(
    {} // query
);

console.log(response);
