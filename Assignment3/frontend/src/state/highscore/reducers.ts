import * as actions from "./actions";
import { Action } from "redux";
import { isType } from 'typescript-fsa';
import { highScore, highScoreReducerContent } from "./types";


export const initialHighScore: highScoreReducerContent = {
    latestGameScore: undefined,
    highScores: []
};


export function highScoreReducer(state: typeof initialHighScore = initialHighScore, action: Action): typeof initialHighScore {
    if (isType(action, actions.SetLatestHighSCoreAction)) {
        return {
            ...state, latestGameScore: action.payload.highScore
        }
    }

    if (isType(action, actions.GetHighScoresAction.done)) {
        return {
            ...state, highScores: action.payload.result.highScores
        }
    }

    return state;
}