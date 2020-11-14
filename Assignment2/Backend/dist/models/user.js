"use strict";
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const workoutSchema = new mongoose.Schema({
    exercise: String,
    description: String,
    set: Number,
    repsOrTime: String
});
const workoutProgramSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    workouts: [workoutSchema]
});
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
const Workout = mongoose.model('workout', workoutSchema);
const WorkoutProgram = mongoose.model('workoutProgram', workoutProgramSchema);
const User = mongoose.model("User", userSchema);
module.exports.User = User;
module.exports.WorkoutProgram = WorkoutProgram;
module.exports.Workout = Workout;
