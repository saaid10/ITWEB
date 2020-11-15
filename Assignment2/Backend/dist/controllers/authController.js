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
const Logger_1 = __importDefault(require("@shared/Logger"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const user_1 = require("@models/user");
const express_validator_1 = require("express-validator");
const { BAD_REQUEST, CONFLICT, OK, UNAUTHORIZED } = http_status_codes_1.default;
class responseToken {
    constructor(token) {
        this.token = token;
    }
}
function addDemoWorkoutProgramToUser(user) {
    const workout = new user_1.Workout();
    workout.exercise = "Demo Exercise: Squat";
    workout.description = "Stand with your feet spread shoulderwidth apart. Lower your body as far as you can by pushing your hips back and bending your knees. Pause, and then slowly push yourself back to the starting position.";
    workout.set = 3;
    workout.repsOrTime = "20";
    const workoutProgram = new user_1.WorkoutProgram();
    workoutProgram.name = "Demo Workout Program";
    workoutProgram.addWorkout(workout);
    user.addWorkoutProgram(workoutProgram);
}
class authController {
}
exports.default = authController;
authController.registration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        res.status(BAD_REQUEST).send(errors.array());
        return;
    }
    try {
        const user = new user_1.User();
        user.username = req.body.username;
        user.setPassword(req.body.password);
        addDemoWorkoutProgramToUser(user);
        yield user_1.User.create(user);
        res.send(new responseToken(user.generateJwt()));
    }
    catch (e) {
        Logger_1.default.err(e);
        res.status(CONFLICT).json({ "message": "Username already exists" });
        return;
    }
});
authController.login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        res.status(UNAUTHORIZED).send(errors.array());
        return;
    }
    const { username, password } = req.body;
    try {
        // Check if username and password are set
        if (!(username && password)) {
            throw new Error('No username or password provided');
        }
        const userFromDB = yield user_1.User.findOne({ username: username });
        // Check if user is found in DB
        if (userFromDB === null)
            throw new Error('User does not exist');
        // Check if password is correct
        if (!userFromDB.validatePassword(password))
            throw new Error('Wrong password');
        // All OK - Login success
        res.status(OK).send({ "token": userFromDB.generateJwt() });
    }
    catch (e) {
        res.status(UNAUTHORIZED)
            .json({ "message": `Something when wrong with user: ${username} - ${e}` });
        return;
    }
});
