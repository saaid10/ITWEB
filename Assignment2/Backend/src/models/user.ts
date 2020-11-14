import mongoose, {Schema, Document} from 'mongoose';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

const saltRounds = 10;

export interface IWorkout extends Document {
    exercise: string;
    description: string;
    sets: number;
    repsOrTime: string;
}

const workoutSchema = new Schema({
    exercise: String,
    description: String,
    set: Number,
    repsOrTime: String
});


export interface IWorkoutProgram extends Document {
    name: string;
    workouts: IWorkout[];

    addWorkout(workout: IWorkout): void;
}

const workoutProgramSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    workouts: [workoutSchema]
});

workoutProgramSchema.methods.addWorkout = function (workout: IWorkout): void {
    this.workouts.push(workout);
};

export interface IUser extends Document {
    username: string;
    password: string;
    workoutPrograms: IWorkoutProgram[];

    addWorkoutProgram(workoutProgram: IWorkoutProgram): void;

    setPassword(password: string): void;

    validatePassword(password: string): boolean;

    generateJwt(): string;
}

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    workoutPrograms: [workoutProgramSchema]
});

userSchema.methods.addWorkoutProgram = function (workoutProgram: IWorkoutProgram): void {
    this.workoutPrograms.push(workoutProgram);
};

userSchema.methods.setPassword = function (password: string): void {
    this.password = bcrypt.hashSync(password, saltRounds);
};

userSchema.methods.validatePassword = function (password: string): boolean {
    return bcrypt.compareSync(password, this.password);
}

userSchema.methods.generateJwt = function (): string {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 7); // Use 1 hour for better security

    return jwt.sign({
        id: this._id,
        username: this.username,
        exp: parseInt(String(expiry.getTime() / 1000)), // as Unix time in seconds
    }, process.env.JWT_SECRET as string); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

// export default mongoose.model<IUser>('User', userSchema);
const Workout = mongoose.model<IWorkout>('workout', workoutSchema);
const WorkoutProgram = mongoose.model<IWorkoutProgram>('workoutProgram', workoutProgramSchema);
const User = mongoose.model<IUser>("User", userSchema);
export {User}
export {WorkoutProgram}
export {Workout}
