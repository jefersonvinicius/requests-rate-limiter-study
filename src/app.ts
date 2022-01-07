import express from 'express';
import { BlockedMessageController } from './controllers/BlockedMessageController';
import { MyLimitedEndpointController } from './controllers/MyLimitedEndpointController';
import { limitRequestsRate } from './middlewares/limit-requests-rate';

const app = express();

const myLimitedEndpointController = new MyLimitedEndpointController();
const blockedMessageController = new BlockedMessageController();

app.get('/', (_, response) => response.send('Home :)'));
app.get('/my-limited-endpoint', limitRequestsRate, myLimitedEndpointController.handle);
app.get('/blocked-message', blockedMessageController.handle);

export default app;
