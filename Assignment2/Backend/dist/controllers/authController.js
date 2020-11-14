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
const { BAD_REQUEST, CONFLICT } = http_status_codes_1.default;
const user_1 = require("@models/user");
class responseToken {
    constructor(token) {
        this.token = token;
    }
}
function addDemoWorkoutProgramToUser(user) {
    const workout = new user_1.Workout();
    workout.exercise = "Demo Exercise: Squat";
    workout.description = "Stand with your feet spread shoulderwidth apart. Lower your body as far as you can by pushing your hips back and bending your knees. Pause, and then slowly push yourself back to the starting position.";
    workout.sets = 3;
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
    if (!req.body.username || !req.body.password || !req.body.confirmPassword) {
        res.sendStatus(BAD_REQUEST);
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
