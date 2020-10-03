const mongoose = require('mongoose');
const workoutUserColl = mongoose.model('User');

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

        var user = await workoutUserColl.findById(req.session.passport.user)        
        
        var program = user.workoutPrograms.find((program)=>program._id == req.params.programid)

        console.log(program)
        
        

        const workout = new Workout();
        workout.exercise = req.body.exercise;
        workout.description = req.body.description;
        workout.set = req.body.set;
        workout.repsOrTime = req.body.repsOrTime;

        program.addWorkout(workout);

        //const workoutProgram = program;
        //workoutProgram.addWorkout(workout);
        //user.addWorkoutProgram(workoutProgram);

        await workoutUserColl.updateOne({ username: user.username }, user)
 
        res.redirect('/');
    } catch (e) {
        res.send(e);
    }
};

/* POST add exercise to workout */





