const mongoose = require('mongoose');
//const bcrypt = require('bcrypt');
const saltRounds = 10;

import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

const workoutSchema = new mongoose.Schema({
    exercise: String,
    description: String,
    set: Number,
    repsOrTime: String
})
const workoutProgramSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    workouts: [workoutSchema]
})

workoutProgramSchema.method('addWorkout', function (workout) {
    this.workouts.push(workout);
});

workoutProgramSchema.method('addWorkout', function (workout) {
    this.workouts.push(workout);
});

const userSchema = new mongoose.Schema({
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

userSchema.method('addWorkoutProgram', function (workoutProgram) {
    this.workoutPrograms.push(workoutProgram);
});

userSchema.method('setPassword', function (password) {
    this.password = bcrypt.hashSync(password, saltRounds);
});

userSchema.method('validatePassword', function (password) {
    return !!bcrypt.compareSync(password, this.password);
});
userSchema.method('generateJwt', function () {
    let expiry = new Date();
    expiry.setDate(expiry.getDate() + 7); // Use 1 hour for better security

    return jwt.sign({
        _id: this._id,
        username: this.username,
        exp: parseInt(expiry.getTime() / 1000), // as Unix time in seconds
    }, process.env.JWT_SECRET); // DO NOT KEEP YOUR SECRET IN THE CODE!
});


const Workout = mongoose.model('workout', workoutSchema);
const WorkoutProgram = mongoose.model('workoutProgram', workoutProgramSchema);
const User = mongoose.model("User", userSchema);
module.exports.User = User;
module.exports.WorkoutProgram = WorkoutProgram;
module.exports.Workout = Workout;
