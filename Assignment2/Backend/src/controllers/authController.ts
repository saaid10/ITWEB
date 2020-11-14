import {Request, Response, Router} from 'express';
import logger from "@shared/Logger";
import StatusCodes from "http-status-codes";
const {BAD_REQUEST, CONFLICT} = StatusCodes

import User, {IUser} from "@models/user1";


class responseToken {
    public token: string;

    constructor(token: string) {
        this.token = token;
    }
}

export default class authController {
    static registration = async (req: Request, res: Response) => {
        if (!req.body.username || !req.body.password || !req.body.confirmPassword) {
            res.sendStatus(BAD_REQUEST);
            return;
        }
        try {
            const user: IUser = new User();
            user.username = req.body.username;
            user.setPassword(req.body.password);

            await User.create(user);
            res.send(new responseToken(user.generateJwt()));
        } catch (e) {
            logger.err(e)
            res.status(CONFLICT).json({"message": "Username already exists"})
            return;
        }
    }
}
