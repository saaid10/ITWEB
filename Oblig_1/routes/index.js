const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator');

router.get('/', (req, res) => {
    res.render('form', {title: 'Registration form'});
});

router.post('/',
    [
        check('name')
            .isLength({ min:1 })
            .withMessage('Plean enter a name'),
        check('email')
            .isLength({min:1})
            .withMessage('Plean enter an email'),
    ],
    (req, res) => {
        const errors = validationResult(req);
        if(errors.isEmpty()) {
            res.send('Registration Successful');
        }
        else {
            res.render('form', {
                title: 'Registration form',
                errors: errors.array(),
                data: req.body,
            });
        }
    }
);

module.exports = router;