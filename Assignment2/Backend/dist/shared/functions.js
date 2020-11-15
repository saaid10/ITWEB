"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authCredentialsNotRequired = exports.auth = exports.getRandomInt = exports.pErr = void 0;
const Logger_1 = __importDefault(require("./Logger"));
const express_jwt_1 = __importDefault(require("express-jwt"));
exports.pErr = (err) => {
    if (err) {
        Logger_1.default.err(err);
    }
};
exports.getRandomInt = () => {
    return Math.floor(Math.random() * 1000000000000);
};
exports.auth = express_jwt_1.default({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    requestProperty: 'auth'
});
exports.authCredentialsNotRequired = express_jwt_1.default({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    requestProperty: 'auth',
    credentialsRequired: false
});
