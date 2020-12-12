"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginChecker = exports.registrationChecker = exports.authCredentialsNotRequired = exports.authRequired = void 0;
const express_jwt_1 = __importDefault(require("express-jwt"));
const express_validator_1 = require("express-validator");
exports.authRequired = express_jwt_1.default({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    requestProperty: 'auth',
    credentialsRequired: true
});
exports.authCredentialsNotRequired = express_jwt_1.default({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    requestProperty: 'auth',
    credentialsRequired: false
});
exports.registrationChecker = [
    express_validator_1.check('username')
        .isLength({ min: 6 })
        .withMessage('Please enter a username'),
    express_validator_1.check('password')
        .isLength({ min: 6 })
        .withMessage('Please enter a password'),
    express_validator_1.check('confirmPassword')
        .isLength({ min: 6 })
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
exports.loginChecker = [
    express_validator_1.check('username')
        .isLength({ min: 1 })
        .withMessage('Please enter a username'),
    express_validator_1.check('password')
        .isLength({ min: 1 })
        .withMessage('Please enter a password'),
];
