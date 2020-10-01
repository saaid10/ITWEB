const mongoose = require('mongoose');

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