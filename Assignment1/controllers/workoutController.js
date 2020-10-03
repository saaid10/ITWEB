const mongoose = require('mongoose');
const workoutUserColl = mongoose.model('User');

const Workout = require('../models/user').Workout;

/* GET add workout form */
module.exports.addWorkoutForm = function(req, res) {
    res.render('workout-add', { title: 'Add Workout'});
};

/* POST add workout form */
module.exports.addWorkout = async function(req, res) {
    try{

        var user = await workoutUserColl.findById(req.session.passport.user)        
        
        var program = user.workoutPrograms.find((program) => program._id.toString() === req.params.programid.toString())

        const workout = new Workout();
        workout.exercise = req.body.exercise;
        workout.description = req.body.description;
        workout.set = req.body.set;
        workout.repsOrTime = req.body.repsOrTime;

        program.addWorkout(workout);

        await workoutUserColl.updateOne({ username: user.username }, user)
 
        res.redirect('/program/' + program._id);
    } catch (e) {
        res.send(e);
    }
};





