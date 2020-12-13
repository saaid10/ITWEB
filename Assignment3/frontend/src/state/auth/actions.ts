import * as constants from "./constants";
import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory("AuthActions");

export const SetIsLoggedInAction = actionCreator<{isLoggedIn: boolean}>(constants.IS_LOGGED_IN);
