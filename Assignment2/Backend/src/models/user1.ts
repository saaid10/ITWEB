import mongoose, {Schema, Document} from 'mongoose';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

const saltRounds = 10;

export interface workout extends Document{
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

export interface workoutProgram extends Document{
    name: string;
    workouts: [workout];
}

const workoutProgramSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    workouts: [workoutSchema]
});

export interface IUser extends Document{
    username: string;
    password: string;
    workoutPrograms: workoutProgram[];
    addWorkoutProgram(workoutProgram: workoutProgram): void;
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

userSchema.methods.addWorkoutProgram = function (workoutProgram: workoutProgram) {
    this.workoutPrograms.push(workoutProgram);
};

userSchema.methods.setPassword = function (password: string) {
    this.password = bcrypt.hashSync(password, saltRounds);
};

userSchema.methods.validatePassword = function (password: string)  {
    return bcrypt.compareSync(password, this.password);
}

userSchema.methods.generateJwt = function () {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 7); // Use 1 hour for better security

    return jwt.sign({
        id: this._id,
        username: this.username,
        exp: parseInt(String(expiry.getTime() / 1000)), // as Unix time in seconds
    }, process.env.JWT_SECRET as string); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

export default mongoose.model<IUser>('User', userSchema);
