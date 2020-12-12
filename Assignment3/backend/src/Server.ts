import cookieParser from 'cookie-parser';
import path from 'path';
import morgan from 'morgan';
import helmet from 'helmet';
import StatusCodes from 'http-status-codes';
import express, {NextFunction, Request, Response} from 'express';
import 'express-async-errors';

import BaseRouter from './routes';
import logger from '@shared/Logger';
import {cookieProps} from '@shared/constants';

import cors from 'cors';

const app = express();
const {BAD_REQUEST} = StatusCodes;


/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser(cookieProps.secret));
app.use(cors());

// Show routes called in console during development
if (process.env.NODE_ENV) {
    app.use(morgan('dev'));
}

// Security
if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
}

// Add APIs
app.use('/api', BaseRouter);

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

const buildDir = path.join(__dirname, 'Build');
app.use(express.static(buildDir));
app.get('*', (req: Request, res: Response) => {
    res.sendFile('index.html', {root: buildDir});
});


/************************************************************************************
 *                              Export Server
 ***********************************************************************************/

export default app;
