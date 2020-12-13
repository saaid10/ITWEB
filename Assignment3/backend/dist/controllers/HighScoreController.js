"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("@models/user");
const date_fns_1 = require("date-fns");
const http_status_codes_1 = require("http-status-codes");
const _index_1 = require("@index");
const { OK, UNAUTHORIZED, BAD_REQUEST, CONFLICT } = http_status_codes_1.StatusCodes;
class HighScoreController {
}
exports.default = HighScoreController;
HighScoreController.NewHighScore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (req.body.highscore) {
        try {
            const user = yield user_1.User.findById((_a = req.auth) === null || _a === void 0 ? void 0 : _a.id);
            if (user === null)
                throw new Error('User not found');
            user.addHighScore(req.body.highscore);
            const saved = yield user.save();
            _index_1.wsServer.clients.forEach((client) => client.send(JSON.stringify(req.body.highscore)));
            res.status(OK).send(saved);
        }
        catch (e) {
            res.status(BAD_REQUEST)
                .json({
                "message": `Something whent wrong - ${e}`
            });
            return;
        }
    }
    else {
        res.sendStatus(BAD_REQUEST);
    }
});
HighScoreController.GetHighScore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.query.level) {
        try {
            const highscores = yield user_1.User.aggregate([{
                    $match: {
                        $and: [{
                                'highscore.level': {
                                    $eq: Number(req.query.level)
                                }
                            },
                            {
                                'highscore.time': {
                                    $gte: date_fns_1.startOfDay(new Date()),
                                    $lte: date_fns_1.endOfDay(new Date())
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
                                    $eq: Number(req.query.level)
                                }
                            },
                            {
                                'highscore.time': {
                                    $gt: date_fns_1.startOfDay(new Date()),
                                    $lt: date_fns_1.endOfDay(new Date())
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
        }
        catch (e) {
            res.status(BAD_REQUEST)
                .json({
                "message": `Something whent wrong - ${e}`
            });
            return;
        }
    }
    else {
        res.sendStatus(BAD_REQUEST);
    }
});
