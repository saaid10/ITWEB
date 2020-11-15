import {Request, Response} from "express";
import {IUser, IWorkout, IWorkoutProgram, Workout, WorkoutProgram, User} from "@models/user";
import {AuthTokenInfo, IRequest} from "@shared/constants";
import {BAD_REQUEST, OK, UNAUTHORIZED} from "http-status-codes";
import logger from "@shared/Logger";
import jwt from "express-jwt";
import jsonwebtoken from 'jsonwebtoken'
import {auth} from "@shared/functions";


export default class programsController {
    static getPrograms = async (req: IRequest, res: Response) => {
        try {
            const demoUser: IUser | null =
                await User.findOne({username: 'publicUser'});

            let demoPrograms: IWorkoutProgram[];
            if (demoUser === null) {
                demoPrograms = [];
            } else {
                demoPrograms = demoUser.workoutPrograms;
            }

            if (!req.headers.authorization) {
                res.status(OK).send(demoPrograms);
                return;
            }

            const usertoken = req.headers.authorization;
            const token = usertoken.split(' ');
            const decoded: AuthTokenInfo = jsonwebtoken.verify(token[1], process.env.JWT_SECRET as string) as AuthTokenInfo;
            const personalUser: IUser | null = await User.findById(decoded.id);

            let personalPrograms: IWorkoutProgram[];

            if (personalUser === null) {
                personalPrograms = [];
            } else {
                personalPrograms = personalUser.workoutPrograms;
            }

            const array = demoPrograms.concat(personalPrograms);
            res.status(OK).send(array);

        } catch (e) {
            res.status(UNAUTHORIZED)
                .json({"message": `Something when wrong - ${e}`});
            return;
        }


    }

    static addNewProgram = async (req: IRequest, res: Response) => {
        if (req.auth && req.body.program) {
            try {
                const user = await User.findById(req.auth.id);
                if (user === null) throw new Error('User not found');

                user.addWorkoutProgram(req.body.program);
                const saved = await user.save();
                res.status(OK).send(saved);
            } catch (e) {
                res.status(BAD_REQUEST)
                    .json({"message": `Something when wrong - ${e}`});
                return;
            }
        }
    }

    static getProgram = async (req: Request, res: Response) => {

    }

    static updateProgram = async (req: Request, res: Response) => {

    }

    static deleteProgram = async (req: Request, res: Response) => {

    }

}
