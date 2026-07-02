```javascript
import { Client, Notifications } from "appwrite";

const client = new Client()
    .setEndpoint('https://<REGION>.cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const notifications = new Notifications(client);

const result = await notifications.list({
    queries: [] // optional
});

console.log(result);
```
