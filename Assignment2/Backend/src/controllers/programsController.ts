import { Response} from "express";
import {IUser,  IWorkoutProgram, User} from "@models/user";
import {IRequest} from "@shared/constants";
import StatusCodes from "http-status-codes";
const {BAD_REQUEST, OK, UNAUTHORIZED} = StatusCodes


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

            if (!req.auth) {
                res.status(OK).json({"workoutPrograms": demoPrograms});
                return;
            }

            const personalUser: IUser | null = await User.findById(req.auth.id);

            let personalPrograms: IWorkoutProgram[];

            if (personalUser === null) {
                personalPrograms = [];
            } else {
                personalPrograms = personalUser.workoutPrograms;
            }

            const array = demoPrograms.concat(personalPrograms);
            res.status(OK).json({"workoutPrograms": array});

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

                delete req.body.program._id // Let db set id

                user.addWorkoutProgram(req.body.program);
                const saved = await user.save();
                res.status(OK).send(saved);
            } catch (e) {
                res.status(BAD_REQUEST)
                    .json({"message": `Something when wrong - ${e}`});
                return;
            }
        } else {
            res.sendStatus(BAD_REQUEST);
        }
    }

    static getProgram = async (req: IRequest, res: Response) => {
        if (req.params.programId) {
            try {
                const demoUser = await User.findOne({username: 'publicUser'})
                let demoProgram;
                if (demoUser !== null) {
                    demoProgram = demoUser.workoutPrograms
                        .find((program) => program._id.toString() === req.params.programId.toString());
                }
                if (demoProgram) {
                    res.status(OK).json({"workoutProgram": demoProgram});
                    return;
                }

                if (!req.auth) throw new Error('Trying to get personal data, without being logged in');

                const personalUser = await User.findById(req.auth.id);
                if (personalUser === null) throw new Error('User does not exist');
                const personalProgram = personalUser.workoutPrograms
                    .find((program) => program._id.toString() === req.params.programId.toString())

                if (!personalProgram) throw new Error('Program not found');

                res.status(OK).json({"workoutProgram": personalProgram});
            } catch (e) {
                res.status(BAD_REQUEST)
                    .json({"message": `Something when wrong - ${e}`});
                return;
            }
        } else {
            res.sendStatus(BAD_REQUEST);
        }
    }

    static updateProgram = async (req: IRequest, res: Response) => {
        if (!req.body.program || !req.params.programId) res.sendStatus(BAD_REQUEST);
        try {
            const user = await User.findById(req.auth?.id);
            if (!user) throw new Error('User not found');

            const program: IWorkoutProgram | undefined =
                user.workoutPrograms.find((program) => program._id.toString() === req.params.programId.toString());
            if (!program) throw new Error('Program not found');

            program.name = req.body.program.name;
            program.workouts = req.body.program.workouts;

            const savedUser = await user.save();
            res.status(OK).json({"user": savedUser});
        } catch (e) {
            res.status(BAD_REQUEST)
                .json({"message": `Something when wrong - ${e}`});
            return;
        }
    }

    static deleteProgram = async (req: IRequest, res: Response) => {
        if (!req.params.programId) res.sendStatus(BAD_REQUEST);
        try {
            const user = await User.findById(req.auth?.id);
            if (!user) throw new Error('User not found');

            user.workoutPrograms.find((program) => program._id.toString() === req.params.programId.toString())?.remove();
            const savedUser = await user.save();
            res.status(OK).json({"user": savedUser});
        } catch (e) {
            res.status(BAD_REQUEST)
                .json({"message": `Something when wrong - ${e}`});
            return;
        }
    }

}
