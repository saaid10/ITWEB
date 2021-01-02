import * as actions from "./actions";
import { Action } from "redux";
import { isType } from 'typescript-fsa';
import { highScoreReducerContent } from "./types";
import {AddNewScoreAction} from "./actions";


export const initialHighScore: highScoreReducerContent = {
    highScores: []
};


export function highScoreReducer(state: typeof initialHighScore = initialHighScore, action: Action): typeof initialHighScore {
    if (isType(action, AddNewScoreAction)) {
        console.log("highScoreReducer: AddNewScoreAction");
        return {
            ...state, highScores: [...state.highScores, action.payload.highScore]
        }
    }

    if (isType(action, actions.GetHighScoresAction.done)) {
        return {
            ...state, highScores: action.payload.result.highScores
        }
    }

    return state;
}
