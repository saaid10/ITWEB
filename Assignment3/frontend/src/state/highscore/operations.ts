import { Dispatch } from "redux";
import { SetLatestHighSCoreAction, GetHighScoresAction } from "./actions";
import { highScore } from "./types";

export const GetHighSCoresOperation = async () => {
    return (dispatch: Dispatch) => dispatch(GetHighScoresAction.started(undefined));
}

export const SetLatestHighSCoreOperation = (highScore: highScore) => {
    return (dispatch: Dispatch) => dispatch(SetLatestHighSCoreAction({ highScore }));
}

