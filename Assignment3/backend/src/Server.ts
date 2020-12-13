import cookieParser from 'cookie-parser';
import path from 'path';
import morgan from 'morgan';
import helmet from 'helmet';
import StatusCodes from 'http-status-codes';
import express, {NextFunction, Request, Response} from 'express';
import 'express-async-errors';

import BaseRouter from './routes';
import logger from '@shared/Logger';

import cors from 'cors';
import DatabaseSetup from '@models/db';

const app = express();
const {BAD_REQUEST} = StatusCodes;


/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors());

new DatabaseSetup();

// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
} else {
    app.use(helmet());
}

// Add APIs
app.use('/api', BaseRouter);

// Print API errors
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
