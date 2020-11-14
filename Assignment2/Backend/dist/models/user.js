"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workout = exports.WorkoutProgram = exports.User = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const jwt = __importStar(require("jsonwebtoken"));
const bcrypt = __importStar(require("bcrypt"));
const saltRounds = 10;
const workoutSchema = new mongoose_1.Schema({
    exercise: String,
    description: String,
    set: Number,
    repsOrTime: String
});
const workoutProgramSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    workouts: [workoutSchema]
});
workoutProgramSchema.methods.addWorkout = function (workout) {
    this.workouts.push(workout);
};
const userSchema = new mongoose_1.Schema({
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
userSchema.methods.addWorkoutProgram = function (workoutProgram) {
    this.workoutPrograms.push(workoutProgram);
};
userSchema.methods.setPassword = function (password) {
    this.password = bcrypt.hashSync(password, saltRounds);
};
userSchema.methods.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};
userSchema.methods.generateJwt = function () {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 7); // Use 1 hour for better security
    return jwt.sign({
        id: this._id,
        username: this.username,
        exp: parseInt(String(expiry.getTime() / 1000)),
    }, process.env.JWT_SECRET); // DO NOT KEEP YOUR SECRET IN THE CODE!
};
// export default mongoose.model<IUser>('User', userSchema);
const Workout = mongoose_1.default.model('workout', workoutSchema);
exports.Workout = Workout;
const WorkoutProgram = mongoose_1.default.model('workoutProgram', workoutProgramSchema);
exports.WorkoutProgram = WorkoutProgram;
const User = mongoose_1.default.model("User", userSchema);
exports.User = User;
