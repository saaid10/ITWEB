import { IHighscore, IUser, User } from "@models/user";
import { IRequest } from "@shared/constants";
import { time } from "console";
import { endOfDay, startOfDay } from "date-fns";
import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { wsServer } from "src";

const {OK, UNAUTHORIZED, BAD_REQUEST, CONFLICT} = StatusCodes;

export default class HighScoreController {
	static NewHighScore = async (req: IRequest, res: Response) => {
		if (req.body.highscore) {
			try {
				const user = await User.findById(req.auth?.id);
				if (user === null) throw new Error('User not found');

				user.addHighScore(req.body.highscore)

				const saved = await user.save();
				wsServer.clients.forEach(client => client.send(JSON.stringify(req.body.highscore)));
				res.status(OK).send(saved);
			} catch (e) {
				res.status(BAD_REQUEST)
					.json({
						"message": `Something whent wrong - ${e}`
					});
				return;
			}
		} else {
			res.sendStatus(BAD_REQUEST)
		}
	}

	static GetHighScore = async (req: IRequest, res: Response) => {
		if (req.query.level) {
			try {
				const highscores: IHighscore[] = await User.aggregate([{
					$match: {
						$and: [{
								'highscore.level': {
									$eq: req.query.level
								}
							},
							{
								'highscore.time': {
									$gte: startOfDay(new Date()),
									$lte: endOfDay(new Date())
								}
							}
						]
					}
				}, {
					$unwind: '$highscore'
				}, {
					$match: {
						$and: [{
								'highscore.level': {
									$eq: req.query.level
								}
							},
							{
								'highscore.time': {
									$gt: startOfDay(new Date()),
									$lt: endOfDay(new Date())
								}
							}
						]
					}
				}, {
					$project: {
						score: '$highscore.score',
						level: '$highscore.level',
						time: '$highscore.time'
					}
				}]);
				res.status(OK).send(highscores);
			} catch (e) {
				res.status(BAD_REQUEST)
					.json({
						"message": `Something whent wrong - ${e}`
					});
				return;
			}
		} else {
			res.sendStatus(BAD_REQUEST);
		}
	}
}