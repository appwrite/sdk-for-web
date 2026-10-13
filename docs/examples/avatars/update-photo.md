```javascript
import { Client, Avatars } from 'appwrite';

const client = new Client()
    .setEndpoint('https://<REGION>.cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const avatars = new Avatars(client);

const result = await avatars.updatePhoto({
    file: document.getElementById('uploader').files[0],
});

console.log(result);
```
