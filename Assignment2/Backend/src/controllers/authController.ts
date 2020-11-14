import {Request, Response, Router} from 'express';
import logger from "@shared/Logger";
import StatusCodes from "http-status-codes";
const {BAD_REQUEST, CONFLICT} = StatusCodes

import {IUser, IWorkout, IWorkoutProgram, Workout, WorkoutProgram, User} from "@models/user1";


class responseToken {
    public token: string;

    constructor(token: string) {
        this.token = token;
    }
}
function addDemoWorkoutProgramToUser(user: IUser) {
    const workout: IWorkout = new Workout();
    workout.exercise = "Demo Exercise: Squat";
    workout.description = "Stand with your feet spread shoulderwidth apart. Lower your body as far as you can by pushing your hips back and bending your knees. Pause, and then slowly push yourself back to the starting position."
    workout.sets = 3;
    workout.repsOrTime = "20";
    const workoutProgram: IWorkoutProgram = new WorkoutProgram();
    workoutProgram.name = "Demo Workout Program";
    workoutProgram.addWorkout(workout);
    user.addWorkoutProgram(workoutProgram);
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
            addDemoWorkoutProgramToUser(user);
            await User.create(user);
            res.send(new responseToken(user.generateJwt()));
        } catch (e) {
            logger.err(e)
            res.status(CONFLICT).json({"message": "Username already exists"})
            return;
        }
    }
}
