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
const http_status_codes_1 = require("http-status-codes");
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
            res.status(OK).send(saved);
        }
        catch (e) {
            res.status(BAD_REQUEST)
                .json({ "message": `Something whent wrong - ${e}` });
            return;
        }
    }
    else {
        res.sendStatus(BAD_REQUEST);
    }
});
