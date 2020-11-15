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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("@models/user");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const { BAD_REQUEST, OK, UNAUTHORIZED } = http_status_codes_1.default;
class programsController {
}
exports.default = programsController;
programsController.getPrograms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const demoUser = yield user_1.User.findOne({ username: 'publicUser' });
        let demoPrograms;
        if (demoUser === null) {
            demoPrograms = [];
        }
        else {
            demoPrograms = demoUser.workoutPrograms;
        }
        if (!req.auth) {
            res.status(OK).json({ "workoutPrograms": demoPrograms });
            return;
        }
        const personalUser = yield user_1.User.findById(req.auth.id);
        let personalPrograms;
        if (personalUser === null) {
            personalPrograms = [];
        }
        else {
            personalPrograms = personalUser.workoutPrograms;
        }
        const array = demoPrograms.concat(personalPrograms);
        res.status(OK).json({ "workoutPrograms": array });
    }
    catch (e) {
        res.status(UNAUTHORIZED)
            .json({ "message": `Something when wrong - ${e}` });
        return;
    }
});
programsController.addNewProgram = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.auth && req.body.program) {
        try {
            const user = yield user_1.User.findById(req.auth.id);
            if (user === null)
                throw new Error('User not found');
            user.addWorkoutProgram(req.body.program);
            const saved = yield user.save();
            res.status(OK).send(saved);
        }
        catch (e) {
            res.status(BAD_REQUEST)
                .json({ "message": `Something when wrong - ${e}` });
            return;
        }
    }
    else {
        res.sendStatus(BAD_REQUEST);
    }
});
programsController.getProgram = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.params.programId) {
        try {
            const demoUser = yield user_1.User.findOne({ username: 'publicUser' });
            let demoProgram;
            if (demoUser !== null) {
                demoProgram = demoUser.workoutPrograms
                    .find((program) => program._id.toString() === req.params.programId.toString());
            }
            if (demoProgram) {
                res.status(OK).json({ "workoutProgram": demoProgram });
                return;
            }
            if (!req.auth)
                throw new Error('Trying to get personal data, without being logged in');
            const personalUser = yield user_1.User.findById(req.auth.id);
            if (personalUser === null)
                throw new Error('User does not exist');
            const personalProgram = personalUser.workoutPrograms
                .find((program) => program._id.toString() === req.params.programId.toString());
            if (!personalProgram)
                throw new Error('Program not found');
            res.status(OK).json({ "workoutProgram": personalProgram });
        }
        catch (e) {
            res.status(BAD_REQUEST)
                .json({ "message": `Something when wrong - ${e}` });
            return;
        }
    }
    else {
        res.sendStatus(BAD_REQUEST);
    }
});
programsController.updateProgram = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!req.body.program || !req.params.programId)
        res.sendStatus(BAD_REQUEST);
    try {
        const user = yield user_1.User.findById((_a = req.auth) === null || _a === void 0 ? void 0 : _a.id);
        if (!user)
            throw new Error('User not found');
        const program = user.workoutPrograms.find((program) => program._id.toString() === req.params.programId.toString());
        if (!program)
            throw new Error('Program not found');
        program.name = req.body.program.name;
        program.workouts = req.body.program.workouts;
        const savedUser = yield user.save();
        res.status(OK).json({ "user": savedUser });
    }
    catch (e) {
        res.status(BAD_REQUEST)
            .json({ "message": `Something when wrong - ${e}` });
        return;
    }
});
programsController.deleteProgram = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    if (!req.params.programId)
        res.sendStatus(BAD_REQUEST);
    try {
        const user = yield user_1.User.findById((_b = req.auth) === null || _b === void 0 ? void 0 : _b.id);
        if (!user)
            throw new Error('User not found');
        (_c = user.workoutPrograms.find((program) => program._id.toString() === req.params.programId.toString())) === null || _c === void 0 ? void 0 : _c.remove();
        const savedUser = yield user.save();
        res.status(OK).json({ "user": savedUser });
    }
    catch (e) {
        res.status(BAD_REQUEST)
            .json({ "message": `Something when wrong - ${e}` });
        return;
    }
});
