
import HighScoreController from "@controllers/HighScoreController";
import {Router} from "express";
import { authRequired } from "./middleware";

const router: Router = Router();

router
    .route('/')
    .post(authRequired, HighScoreController.NewHighScore)

export default router;