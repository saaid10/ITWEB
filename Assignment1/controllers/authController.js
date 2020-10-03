const {validationResult} = require('express-validator');
const mongoose = require('mongoose');
const userColl = mongoose.model('User');
const User = require('../models/user').User;
const WorkoutProgram = require('../models/user').WorkoutProgram;
const Workout = require('../models/user').Workout;
require('bcrypt');

const addDemoWorkoutProgramToUser = function (user) {
    const workout = new Workout();
    workout.exercise = "Demo Exercise: Squat";
    workout.description = "Stand with your feet spread shoulderwidth apart. Lower your body as far as you can by pushing your hips back and bending your knees. Pause, and then slowly push yourself back to the starting position."
    workout.set = 3;
    workout.repsOrTime = "20";
    const workoutProgram = new WorkoutProgram();
    workoutProgram.addWorkout(workout);
    user.addWorkoutProgram(workoutProgram);
}

module.exports.getRegistrationPage = function (req, res) {
    res.render('registration', {title: 'Registration Page'});
}

module.exports.registerUser = async function (req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const user = new User();
            user.username = req.body.username;
            user.setPassword(req.body.password);

            addDemoWorkoutProgramToUser(user);

            await userColl.create(user);
            res.redirect('/');
        } catch (e) {
            res.render('registration', {
                title: 'Registration Page',
                errors: [{msg: 'A user with that username already exists, please pick a new one'}],
                data: req.body,
            });
        }
    } else {
        res.render('registration', {
            title: 'Registration Page',
            errors: errors.array(),
            data: req.body,
        });
    }
}

module.exports.getLoginPage = function (req, res) {
    res.render('login', {title: 'Login Page'});
}