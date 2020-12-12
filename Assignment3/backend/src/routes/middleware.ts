import jwt from "express-jwt";
import {check} from "express-validator";

export const authRequired = jwt({
    secret: process.env.JWT_SECRET as string,
    algorithms: ['HS256'],
    requestProperty: 'auth',
    credentialsRequired: true
});

export const authCredentialsNotRequired = jwt({
    secret: process.env.JWT_SECRET as string,
    algorithms: ['HS256'],
    requestProperty: 'auth',
    credentialsRequired: false
});

export const registrationChecker = [
    check('username')
        .isLength({min: 6})
        .withMessage('Please enter a username'),
    check('password')
        .isLength({min: 6})
        .withMessage('Please enter a password'),
    check('confirmPassword')
        .isLength({min: 6})
        .withMessage('Please confirm password')
        .custom((value, {req}) => {
            if (!value || value !== req.body.password) {
                throw new Error('Passwords does not match');
            } else {
                return value;
            }
        }),
];

export const loginChecker = [
    check('username')
        .isLength({min: 1})
        .withMessage('Please enter a username'),
    check('password')
        .isLength({min: 1})
        .withMessage('Please enter a password'),
];
