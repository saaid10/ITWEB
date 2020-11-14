import mongoose from 'mongoose'
import logger from "@shared/Logger";


export default class DatabaseSetup {

    constructor() {
        this.connectToDB();
    }

    private connectToDB() {
        const dbURI = process.env.MONGODB_URI || '';
        mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
            .then(() => logger.info(`Mongoose connected to ${dbURI}`))
            .catch((err: any) => logger.err(`Mongoose connection error: ${err}`));


        mongoose.connection.on('disconnected', () => {
            logger.info('Mongoose disconnected');
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

    private gracefulShutdown(msg: string, callback: () => void) {
        mongoose.connection.close().then(() => {
            logger.info(`Mongoose disconnected through ${msg}`);
            callback();
        });
    }
}
