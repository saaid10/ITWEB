"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const router = express_1.Router();
const { OK } = http_status_codes_1.default;
/******************************************************************************
 *                      Login User - "POST /api/auth/login"
 ******************************************************************************/
router.post('/login', (req, res) => {
    res.status(OK);
});
/******************************************************************************
 *                      Registration - "GET /api/auth/registration"
 ******************************************************************************/
router.get('/registration', (req, res) => {
    res.status(OK);
});
/******************************************************************************
 *                                 Export Router
 ******************************************************************************/
exports.default = router;
