import {Router} from 'express';
import authController from '@controllers/authController';
const router = Router();

import { check } from 'express-validator';

const registrationHandler = [
    check('username')
        .isLength({min: 1})
        .withMessage('Please enter a username'),
    check('password')
        .isLength({min: 1})
        .withMessage('Please enter a password'),
    check('confirmPassword')
        .isLength({min: 1})
        .withMessage('Please confirm password')
        .custom((value, {req}) => {
            if (!value || value !== req.body.password) {
                throw new Error('Passwords does not match');
            } else {
                return value;
            }
        }),
];

router.post('/registration', registrationHandler, authController.registration)

export default router;
