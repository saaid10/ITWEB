"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Users_1 = __importDefault(require("./Users"));
const Auth_1 = __importDefault(require("./Auth"));
const express_jwt_1 = __importDefault(require("express-jwt"));
const auth = express_jwt_1.default({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    requestProperty: 'auth'
});
// Init router and path
const router = express_1.Router();
// Add sub-routes
router.use('/users', auth, Users_1.default);
router.use('/auth', Auth_1.default);
// Export the base-router
exports.default = router;
