import {Result, validationResult} from "express-validator";
import StatusCodes from "http-status-codes";
import {IUser, User} from "@models/user";
import logger from "@shared/Logger";
import {IRequest} from "@shared/constants";
import {Response} from 'express'

const {OK, UNAUTHORIZED, BAD_REQUEST, CONFLICT} = StatusCodes;

export class AuthController {
    static registration = async (req: IRequest, res: Response) => {
        const errors: Result = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(BAD_REQUEST).send(errors.array());
            return;
        }

        try {
            const {username, password} = req.body;

            const user: IUser = new User();
            user.username = username;
            user.setPassword(password);
            await User.create(user);
            res.send({token: user.generateJwt()});
        } catch (e) {
            logger.err(e)
            res.status(CONFLICT).json({"message": "Username already exists"})
            return;
        }
    }


    static login = async (req: IRequest, res: Response) => {
        const errors: Result = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(UNAUTHORIZED).send(errors.array());
            return;
        }
        const {username, password} = req.body;
        try {
            // Check if username and password are set
            if (!(username && password)) {
                throw new Error('No username or password provided')
            }

            const userFromDB: IUser | null = await User.findOne({username: username});

            // Check if user is found in DB
            if (userFromDB === null) throw new Error('User does not exist');

            // Check if password is correct
            if (!userFromDB.validatePassword(password)) throw new Error('Wrong password');

            // All OK - Login success
            res.status(OK).send({"token": userFromDB.generateJwt()});
        } catch (e) {
            res.status(UNAUTHORIZED)
                .json({"message": `Something when wrong with user: ${username} - ${e}`});
            return;
        }
    }
}
