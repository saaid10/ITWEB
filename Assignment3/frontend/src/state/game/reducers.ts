import * as actions from "./actions";
import { Action } from "redux";
import { isType } from 'typescript-fsa';
import { Gamesettings } from "./types";


export const initialGameSettings: Gamesettings = {
    nBack: 1,
};


export function gameSettingsReducer(state: typeof initialGameSettings = initialGameSettings, action: Action): typeof initialGameSettings {
    if (isType(action, actions.SetNBackAction)) {
        return {
            ...state, nBack: action.payload.nBack 
        }
    }

    return state;
}