"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HighScoreController_1 = __importDefault(require("@controllers/HighScoreController"));
const express_1 = require("express");
const middleware_1 = require("./middleware");
const router = express_1.Router();
router
    .route('/')
    .get(middleware_1.authCredentialsNotRequired, HighScoreController_1.default.GetHighScore)
    .post(middleware_1.authRequired, HighScoreController_1.default.NewHighScore);
exports.default = router;
