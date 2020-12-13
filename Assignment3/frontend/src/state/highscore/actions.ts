import * as constants from "./constants";
import actionCreatorFactory from 'typescript-fsa';
import { highScore } from "./types";
const actionCreator = actionCreatorFactory("HighScores");


export const SetLatestHighSCoreAction = actionCreator<{highScore: highScore}>(constants.SET_LATEST_USER_SCORE);
export const GetHighScoresAction = actionCreator.async<undefined, {highScores: highScore[]}>(constants.GET_HIGHSCORES);
