"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middleware_1 = require("./middleware");
const AuthController_1 = require("@controllers/AuthController");
const router = express_1.Router();
/******************************************************************************
 *                      Login User - "POST /api/auth/login"
 ******************************************************************************/
router.post('/login', middleware_1.loginChecker, AuthController_1.AuthController.login);
/******************************************************************************
 *                      Registration - "GET /api/auth/registration"
 ******************************************************************************/
router.get('/registration', middleware_1.registrationChecker, AuthController_1.AuthController.registration);
/******************************************************************************
 *                                 Export Router
 ******************************************************************************/
exports.default = router;
