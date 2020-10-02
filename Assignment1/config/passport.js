const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const userColl = mongoose.model('User');

passport.use(new LocalStrategy(
    function(username, password, done) {
        userColl.findOne({ username: username }, null, null, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            if (!user.validatePassword(password)) { return done(null, false); }
            return done(null, user);
        });
    }
));

passport.serializeUser(function(user, cb) {
    cb(null, user._id);
});
passport.deserializeUser(function(id, cb) {
    userColl.findById(id, null, null, function (err, user) {
        if (err) { return cb(err); }
        cb(null, user);
    });
});