import * as actions from "./actions";
import { Action } from "redux";
import { isType } from 'typescript-fsa';
import { Game } from "./types";


export const initialGameSettings: Game = {
    gameSettings: {
        nBack: 1,
        isRunning: false,
    },
    currentGameScore: {
        correctSameLocation: 0,
        correctSameLetter: 0,
    },

};


export function gameSettingsReducer(state: typeof initialGameSettings = initialGameSettings, action: Action): typeof initialGameSettings {
    if (isType(action, actions.SetNBackAction)) {
        return {
            ...state, gameSettings: {
                ...state.gameSettings, nBack: action.payload.nBack
            }
        }
    }

    if (isType(action, actions.SetIsRunningAction)) {
        return {
            ...state, gameSettings: {
                ...state.gameSettings, isRunning: action.payload.isRunning
            }
        }
    }

    if (isType(action, actions.AddToSameLetterAction)) {
        return {
            ...state, currentGameScore: {
                ...state.currentGameScore, correctSameLetter: state.currentGameScore.correctSameLetter + action.payload.amountToAdd
            }
        }
    }

    if (isType(action, actions.AddToSameLocationAction)) {
        return {
            ...state, currentGameScore: {
                ...state.currentGameScore, correctSameLocation: state.currentGameScore.correctSameLocation += action.payload.amountToAdd
            }
        }
    }

    if (isType(action, actions.ClearScoreAction)) {
        return {
            ...state, currentGameScore: {
                ...state.currentGameScore,
                correctSameLocation: 0,
                correctSameLetter: 0
            }
        }
    }

    return state;
}