
import HighScoreController from "@controllers/HighScoreController";
import {Router} from "express";
import { authCredentialsNotRequired, authRequired } from "./middleware";

const router: Router = Router();

router
    .route('/')
    .get(authCredentialsNotRequired, HighScoreController.GetHighScore)
    .post(authRequired, HighScoreController.NewHighScore)

export default router;