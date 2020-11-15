import logger from './Logger';
import jwt from "express-jwt";

export const pErr = (err: Error) => {
    if (err) {
        logger.err(err);
    }
};

export const getRandomInt = () => {
    return Math.floor(Math.random() * 1_000_000_000_000);
};

export const auth = jwt({
    secret: process.env.JWT_SECRET as string,
    algorithms: ['HS256'],
    requestProperty: 'auth'
});
