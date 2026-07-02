```javascript
import { Client, Waf } from "appwrite";

const client = new Client()
    .setEndpoint('https://<REGION>.cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const waf = new Waf(client);

const result = await waf.createChallenge({
    nonce: '<NONCE>',
    solution: '<SOLUTION>'
});

console.log(result);
```
