"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Logger_1 = __importDefault(require("@shared/Logger"));
class DatabaseSetup {
    constructor() {
        this.connectToDB();
    }
    connectToDB() {
        const dbURI = process.env.MONGODB_URI || '';
        mongoose_1.default.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
            .then(() => Logger_1.default.info(`Mongoose connected to ${dbURI}`))
            .catch((err) => Logger_1.default.err(`Mongoose connection error: ${err}`));
        mongoose_1.default.connection.on('disconnected', () => {
            Logger_1.default.info('Mongoose disconnected');
        });
        // For nodemon restarts
        process.once('SIGUSR2', () => {
            this.gracefulShutdown('nodemon restart', () => {
                process.kill(process.pid, 'SIGUSR2');
            });
        });
        // For app termination
        process.on('SIGINT', () => {
            this.gracefulShutdown('app termination', () => {
                process.exit(0);
            });
        });
        // For Heroku app termination
        process.on('SIGTERM', () => {
            this.gracefulShutdown('Heroku app shutdown', () => {
                process.exit(0);
            });
        });
    }
    gracefulShutdown(msg, callback) {
        mongoose_1.default.connection.close().then(() => {
            Logger_1.default.info(`Mongoose disconnected through ${msg}`);
            callback();
        });
    }
}
exports.default = DatabaseSetup;
