import { Dispatch } from "redux";
import store from "../..";
import { SetLatestHighSCoreAction, GetHighScoresAction } from "./actions";
import { highScore } from "./types";

export const GetHighSCoresOperation = async () => {
    const nBack = store.getState().gameSettingsReducer.gameSettings.nBack;

    const response = await fetch(`/api//highscore?level=${nBack}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    }).then(response => response.json())
        .then(data => data as highScore[])
        .then(highScores => {
            return highScores;
        });

    return (dispatch: Dispatch) => dispatch(GetHighScoresAction.done({
        params: undefined, result: { highScores: response }
    }));
}

export const SetLatestHighSCoreOperation = (highScore: highScore) => {
    return (dispatch: Dispatch) => dispatch(SetLatestHighSCoreAction({ highScore }));
}

