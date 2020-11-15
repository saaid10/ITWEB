import { Request } from 'express';
import { IUser } from '@entities/User';
import {IWorkoutProgram} from "@models/user";


export const paramMissingError = 'One or more of the required parameters was missing.';

export interface AuthTokenInfo {
    id: string;
    username: string;
    exp: number;
    iat: number;
}

export interface IRequest extends Request {
    body: {
        user: IUser;
        program: IWorkoutProgram;
    },
    auth?: AuthTokenInfo;
} 
