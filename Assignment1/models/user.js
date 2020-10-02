const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;


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

userSchema.method('setPassword', function (password) {
    this.password = bcrypt.hashSync(password, saltRounds);
});

userSchema.method('validatePassword', function (password) {
    return !!bcrypt.compareSync(password, this.password);
});

const User = mongoose.model("User", userSchema);
module.exports = User;