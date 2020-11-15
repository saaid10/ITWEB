import {Request, Response} from 'express';
import logger from "@shared/Logger";
import StatusCodes from "http-status-codes";
import {IUser, IWorkout, IWorkoutProgram, Workout, WorkoutProgram, User} from "@models/user";
import {Result, validationResult} from "express-validator";

const {BAD_REQUEST, CONFLICT, OK, UNAUTHORIZED} = StatusCodes


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
    workout.set = 3;
    workout.repsOrTime = "20";
    const workoutProgram: IWorkoutProgram = new WorkoutProgram();
    workoutProgram.name = "Demo Workout Program";
    workoutProgram.addWorkout(workout);
    user.addWorkoutProgram(workoutProgram);
}

export default class authController {

    static registration = async (req: Request, res: Response) => {
        const errors: Result = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(BAD_REQUEST).send(errors.array());
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

    static login = async (req: Request, res: Response) => {
        const errors: Result = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(UNAUTHORIZED).send(errors.array());
            return;
        }
        const {username, password} = req.body;
        try {
            // Check if username and password are set
            if (!(username && password)) {
                throw new Error('No username or password provided')
            }

            const userFromDB: IUser | null = await User.findOne({username: username});

            // Check if user is found in DB
            if (userFromDB === null) throw new Error('User does not exist');

            // Check if password is correct
            if (!userFromDB.validatePassword(password)) throw new Error('Wrong password');

            // All OK - Login success
            res.status(OK).send({"token": userFromDB.generateJwt()});
        } catch (e: any) {
            res.status(UNAUTHORIZED)
                .json({"message": `Something when wrong with user: ${username as string} - ${e}`});
            return;
        }
    }
}
