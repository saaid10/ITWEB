import { Request } from 'express';
import { IUser } from '@entities/User';


export const paramMissingError = 'One or more of the required parameters was missing.';

interface AuthTokenInfo {
    id: string;
    username: string;
    exp: number;
    iat: number;
}

export interface IRequest extends Request {
    body: {
        user: IUser;
    },
    auth?: AuthTokenInfo;
} 
