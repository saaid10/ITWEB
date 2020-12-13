import * as constants from "./constants";
import actionCreatorFactory from 'typescript-fsa';
import { highScore } from "./types";
const actionCreator = actionCreatorFactory("HighScores");


export const AddNewScoreAction = actionCreator<{highScore: highScore}>(constants.ADD_NEW_HIGHSCORE);
export const GetHighScoresAction = actionCreator.async<undefined, {highScores: highScore[]}>(constants.GET_HIGHSCORES);
