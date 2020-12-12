"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authCredentialsNotRequired = exports.authRequired = void 0;
const express_jwt_1 = __importDefault(require("express-jwt"));
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
