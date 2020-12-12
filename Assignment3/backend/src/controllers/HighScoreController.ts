import { User } from "@models/user";
import { IRequest } from "@shared/constants";
import { Response } from "express";
import { StatusCodes } from "http-status-codes";

const {OK, UNAUTHORIZED, BAD_REQUEST, CONFLICT} = StatusCodes;

export default class HighScoreController {
   static NewHighScore = async (req: IRequest, res: Response) => {
    if (req.body.highscore) {
            try {
                const user = await User.findById(req.auth?.id);
                if (user === null) throw new Error('User not found');

                user.addHighScore(req.body.highscore)

                const saved = await user.save();
                res.status(OK).send(saved)
            } catch (e) {
                res.status(BAD_REQUEST)
                    .json({"message": `Something whent wrong - ${e}`});
                return;
            }
        } else {
            res.sendStatus(BAD_REQUEST)
        }
    }
}
