"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wsServer = void 0;
require("./preStart"); // Must be the first import
const _server_1 = __importDefault(require("@server"));
const Logger_1 = __importDefault(require("@shared/Logger"));
const ws_1 = require("ws");
// Start the server
const port = Number(process.env.PORT || 4000);
const httpServer = _server_1.default.listen(port, () => {
    Logger_1.default.info('Express server started on port: ' + port);
});
const wsServer = new ws_1.Server({ server: httpServer });
exports.wsServer = wsServer;
wsServer.on('connection', websocket => {
    websocket.send(JSON.stringify('Hello from the two-way WebSocket server'));
    websocket.onmessage = (message) => console.log(`The server received: ${message.data.toString()}`);
    websocket.onerror = (error) => console.log(`The server received: ${error.message}`);
    websocket.onclose = (why) => console.log(`The server received: ${why.code} ${why.reason}`);
});
