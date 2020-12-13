import './preStart'; // Must be the first import
import app from '@server';
import logger from '@shared/Logger';
import { Server } from 'ws';


// Start the server
const port = Number(process.env.PORT || 4000);
const httpServer = app.listen(port, () => {
    logger.info('Express server started on port: ' + port);
});
const wsServer: Server = new Server({server: httpServer});

wsServer.on('connection',
    websocket => {
        websocket.send(JSON.stringify('Hello from the two-way WebSocket server'));
        websocket.onmessage = (message) =>
            console.log(`The server received: ${message.data.toString()}`);
        websocket.onerror = (error) =>
            console.log(`The server received: ${error.message}`);
        websocket.onclose = (why) =>
            console.log(`The server received: ${why.code} ${why.reason}`);
    }
);
export {wsServer}
