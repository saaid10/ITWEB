const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    exercise: String,
    description: String,
    set: Number,
    repsOrTime: String
})
const workoutProgramSchema = new mongoose.Schema({
    workouts: [workoutSchema]
})

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
    console.log('HELLO FROM ADD WORKOUTPROGRAM')
    this.workoutPrograms.push(workoutProgram);
});

const Workout = mongoose.model('workout', workoutSchema);
const WorkoutProgram = mongoose.model('workoutProgram', workoutProgramSchema);
const User = mongoose.model("User", userSchema);
module.exports.User = User;
module.exports.WorkoutProgram = WorkoutProgram;
module.exports.Workout = Workout;

/*const mongoose = require('mongoose');

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
    training: {
        type: String
    },
    workoutProgram: [{
        workouts: [{
            exercise: String,
            description: String,
            set: Number,
            repsOrTime: String
        }]
    }]
});
mongoose.model("User", userSchema);
*/