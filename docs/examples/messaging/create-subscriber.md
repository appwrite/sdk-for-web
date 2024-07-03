import { Client, Messaging } from "appwrite";

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('&lt;YOUR_PROJECT_ID&gt;'); // Your project ID

const messaging = new Messaging(client);

const result = await messaging.createSubscriber(
    '<TOPIC_ID>', // topicId
    '<SUBSCRIBER_ID>', // subscriberId
    '<TARGET_ID>' // targetId
);

console.log(response);
