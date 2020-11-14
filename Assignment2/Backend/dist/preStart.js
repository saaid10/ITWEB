"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
// Set the env file
const result2 = dotenv_1.default.config({
    path: `./env/development.env`,
});
if (result2.error) {
    throw result2.error;
}
