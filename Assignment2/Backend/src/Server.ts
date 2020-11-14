import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';

import express, {NextFunction, Request, Response} from 'express';
import StatusCodes from 'http-status-codes';
import 'express-async-errors';
require('@models/db');
import BaseRouter from './routes';
import logger from '@shared/Logger';
import compression from 'compression'

const app = express();
const {BAD_REQUEST} = StatusCodes;

/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(compression());

// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
} else {
    app.use(helmet());
}

// Add APIs
app.use('/api', BaseRouter);

app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
    if (err.name === 'UnauthorizedError') {
        logger.err(err, true);
        res.status(401);
        res.json({"message": err.name + ": " + err.message});
    } else {
        next(err);
    }
});

// Print API errors
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.err(err, true);
    return res.status(BAD_REQUEST).json({
        error: err.message,
    });
});


/************************************************************************************
 *                              Serve front-end content
 ***********************************************************************************/

const viewsDir = path.join(__dirname, 'Build');
app.set('views', viewsDir);
const staticDir = path.join(__dirname, 'Build');
app.use(express.static(staticDir));
app.get('*', (req: Request, res: Response) => {
    res.sendFile('index.html', {root: viewsDir});
});

// Export express instance
export default app;
