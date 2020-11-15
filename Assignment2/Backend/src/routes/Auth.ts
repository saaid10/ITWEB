import {Router} from 'express';
import authController from '@controllers/authController';
import { check } from 'express-validator';


const router = Router();


const registrationChecker = [
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

const loginChecker = [
    check('username')
        .isLength({min: 1})
        .withMessage('Please enter a username'),
    check('password')
        .isLength({min: 1})
        .withMessage('Please enter a password'),
];

router.post('/registration', registrationChecker, authController.registration)
router.post('/login', loginChecker, authController.login)

export default router;
