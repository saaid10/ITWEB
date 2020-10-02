const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const userColl = mongoose.model('User');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const {check, validationResult} = require('express-validator');

router.get('/', async (req, res) => {
    res.render('registration', {title: 'Registration form'});
});

router.post('/',
    [
        check('username')
            .isLength({min: 1})
            .withMessage('Please enter a username'),
        check('password')
            .isLength({min: 1})
            .withMessage('Please enter a password'),
    ], async (req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            try {
                bcrypt.hash(req.body.password, saltRounds).then(async (hash) => {
                    await userColl.create({username: req.body.username, password: hash});
                    res.send('Registration Successful');
                })
            } catch (e) {
                res.send("Error");
            }
        } else {
            res.render('registration', {
                title: 'Registration form',
                errors: errors.array(),
                data: req.body,
            });
        }
    }
);

module.exports = router;