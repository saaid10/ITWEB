"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = __importDefault(require("@controllers/authController"));
const router = express_1.Router();
const express_validator_1 = require("express-validator");
const registrationChecker = [
    express_validator_1.check('username')
        .isLength({ min: 1 })
        .withMessage('Please enter a username'),
    express_validator_1.check('password')
        .isLength({ min: 1 })
        .withMessage('Please enter a password'),
    express_validator_1.check('confirmPassword')
        .isLength({ min: 1 })
        .withMessage('Please confirm password')
        .custom((value, { req }) => {
        if (!value || value !== req.body.password) {
            throw new Error('Passwords does not match');
        }
        else {
            return value;
        }
    }),
];
const loginChecker = [
    express_validator_1.check('username')
        .isLength({ min: 1 })
        .withMessage('Please enter a username'),
    express_validator_1.check('password')
        .isLength({ min: 1 })
        .withMessage('Please enter a password'),
];
router.post('/registration', registrationChecker, authController_1.default.registration);
router.post('/login', loginChecker, authController_1.default.login);
exports.default = router;
