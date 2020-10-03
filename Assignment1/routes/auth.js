const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')
const {check} = require('express-validator');
const passport = require('passport');

const postHandler = [
    check('username')
        .isLength({min: 1})
        .withMessage('Please enter a username'),
    check('password')
        .isLength({min: 1})
        .withMessage('Please enter a password'),
];

router.get('/registration', authController.getRegistrationPage);

router.post('/registration', postHandler, authController.registerUser);

router.get('/login', authController.getLoginPage);
router.post('/login', postHandler, passport.authenticate('local', { successReturnToOrRedirect: '/', failureRedirect: '/auth/login' }));

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
})

module.exports = router;