import * as actions from "./actions";
import { Action } from "redux";
import { isType } from 'typescript-fsa';
import { GameRounds } from "./types";


export const initialGameState: GameRounds = {
    rounds: [],
};


export function gameRoundsReducer(state: typeof initialGameState = initialGameState, action: Action): typeof initialGameState {
    if (isType(action, actions.AddGameRoundAction)) {
        return {
            ...state, rounds: [...state.rounds, action.payload.gameRound]
        }
    }

    if (isType(action, actions.ClearGameRoundsAction)) {
        return {
            ...state, rounds: []
        }
    }


    return state;
}