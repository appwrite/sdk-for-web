```javascript
import { Client, Videos } from 'appwrite';

const client = new Client()
    .setEndpoint('https://<REGION>.cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const videos = new Videos(client);

const result = await videos.get({
    videoId: '<VIDEO_ID>',
});

console.log(result);
```
