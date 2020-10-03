const mongoose = require('mongoose');
const workoutUserColl = mongoose.model('User');

//const workoutWorkoutColl = mongoose.model('workout');
//const workoutProgramColl = mongoose.model('workoutProgram');

const User = require('../models/user').User;
const WorkoutProgram = require('../models/user').WorkoutProgram;
const Workout = require('../models/user').Workout;

/* GET add workout form */
module.exports.addWorkoutForm = function(req, res) {
    res.render('workout-add', { title: 'Add Workout'});
};

/* POST add workout form */
module.exports.addWorkout = async function(req, res) {
    try{
        var user = await workoutUserColl.findOne({username: req.body.username});
        
        const workout = new Workout();
        workout.exercise = "MegaSquat";

        const workoutProgram = new WorkoutProgram();
        workoutProgram.workouts.push(workout);
        user.addWorkoutProgram(workoutProgram);

        await workoutUserColl.updateOne({ username: req.body.username }, user)
        
        res.send("User Updated");
    } catch (e) {
        res.send(e);
    }
};



