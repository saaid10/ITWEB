const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')
const {check} = require('express-validator');
const passport = require('passport');

router.get('/registration', authController.getRegistrationPage);

router.post('/registration',
    [
        check('username')
            .isLength({min: 1})
            .withMessage('Please enter a username'),
        check('password')
            .isLength({min: 1})
            .withMessage('Please enter a password'),
    ], authController.registerUser);

router.get('/login', authController.getLoginPage);
router.post('/login', passport.authenticate('local', { successReturnToOrRedirect: '/', failureRedirect: '/auth/login' }));

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
})

module.exports = router;