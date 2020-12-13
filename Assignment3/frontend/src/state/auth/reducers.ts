import * as actions from "./actions";
import { Action } from "redux";
import { isType } from 'typescript-fsa';
import { authReducerContext } from "./types";


export const isLoggedIn: authReducerContext = {
    isLoggedIn: false,
};


export function authReducer(state: typeof isLoggedIn = isLoggedIn, action: Action): typeof isLoggedIn {
    if (isType(action, actions.SetIsLoggedInAction)) {
        return {
            ...state, isLoggedIn: action.payload.isLoggedIn
        }
    }



    return state;
}