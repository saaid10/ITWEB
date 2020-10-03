const mongoose = require('mongoose');
const programUserColl = mongoose.model('User');

const User = require('../models/user').User;
const WorkoutProgram = require('../models/user').WorkoutProgram;
const Workout = require('../models/user').Workout;

/* GET add workout form */
module.exports.addProgramForm = function(req, res) {
    res.render('program-add', { title: 'Add Program'});
};

/* POST add workout form */
module.exports.addProgram = async function(req, res) {
    try{
        var user = await programUserColl.findById(req.session.passport.user)

        const workoutProgram = new WorkoutProgram();
        workoutProgram.name = req.body.programName;
        
        user.addWorkoutProgram(workoutProgram);

        await programUserColl.updateOne({ username: user.username }, user)
 
        res.redirect('/');
    } catch (e) {
        res.send(e);
    }
};

/* POST add exercise to workout */





