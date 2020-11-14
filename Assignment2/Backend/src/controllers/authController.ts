import {Request, Response, Router} from 'express';
import {BAD_REQUEST, CONFLICT} from "http-status-codes";
import User, {IUser} from "@models/user1";
import mongoose from "mongoose";
import logger from "@shared/Logger";

// const userColl = mongoose.model('User');

class responseToken {
    public token: string;

    constructor(token: string) {
        this.token = token;
    }
}

export default class authController {
    static async registration(req: Request, res: Response) {
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
            res.sendStatus(CONFLICT);
            return;
        }
    }
}
