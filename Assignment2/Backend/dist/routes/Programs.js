"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const programsController_1 = __importDefault(require("@controllers/programsController"));
const functions_1 = require("@shared/functions");
const router = express_1.Router();
router
    .route('/') // api/programs
    .get(functions_1.authCredentialsNotRequired, programsController_1.default.getPrograms)
    .post(functions_1.auth, programsController_1.default.addNewProgram);
router
    .route('/:programId') // api/programs/69
    .get(functions_1.authCredentialsNotRequired, programsController_1.default.getProgram)
    .put(functions_1.auth, programsController_1.default.updateProgram)
    .delete(functions_1.auth, programsController_1.default.deleteProgram);
exports.default = router;
