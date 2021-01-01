"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Highscore_1 = __importDefault(require("./Highscore"));
const express_1 = require("express");
const Auth_1 = __importDefault(require("./Auth"));
// Init router and path
const router = express_1.Router();
// Add sub-routes
router.use('/auth', Auth_1.default);
router.use('/highscore', Highscore_1.default);
// Export the base-router
exports.default = router;
