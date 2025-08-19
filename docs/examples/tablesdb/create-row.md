import { Client, TablesDb } from "appwrite";

const client = new Client()
    .setEndpoint('https://<REGION>.cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const tablesDb = new TablesDb(client);

const result = await tablesDb.createRow(
    '<DATABASE_ID>', // databaseId
    '<TABLE_ID>', // tableId
    '<ROW_ID>', // rowId
    {}, // data
    ["read("any")"] // permissions (optional)
);

console.log(result);
