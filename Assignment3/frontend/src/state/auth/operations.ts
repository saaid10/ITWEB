import { Dispatch } from "redux";
import { SetIsLoggedInAction } from "./actions";

export const SetIsLoggedInOperation = (isLoggedIn: boolean) => {
    return (dispatch: Dispatch) => dispatch(SetIsLoggedInAction({ isLoggedIn }));
}

