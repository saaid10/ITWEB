import { Request } from 'express';
import { IUser } from '@entities/User';

// Strings
export const paramMissingError = 'One or more of the required parameters was missing.';
export const loginFailedErr = 'Login failed';

// Numbers
export const pwdSaltRounds = 12;

// IRequest object for express routes
export interface IRequest extends Request {
    body: {
        username: string;
        email: string;
        password: string;
    }
    auth?: AuthTokenInfo;
}

export interface AuthTokenInfo {
    id: string;
    username: string;
    exp: number;
    iat: number;
}
