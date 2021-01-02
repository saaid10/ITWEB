import { Dispatch } from "redux";
import store from "../..";
import { AccessToken } from "../../constants";
import { AddNewScoreAction, GetHighScoresAction } from "./actions";
import { highScore } from "./types";

export const GetHighSCoresOperation = async () => {
    const nBack = store.getState().gameSettingsReducer.gameSettings.nBack;

    const response = await fetch(`/api/highscore?level=${nBack}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    }).then(response => response.json())
        .then(data => data as highScore[])
        .then(highScores => {
            highScores.forEach(highscore => {
                highscore.time = new Date(highscore.time);
            })
            return highScores;
        });

    return (dispatch: Dispatch) => dispatch(GetHighScoresAction.done({
        params: undefined, result: { highScores: response }
    }));
}

export const AddNewHighScoreOperation = (highScore: highScore) => {
    return (dispatch: Dispatch) => dispatch(AddNewScoreAction({ highScore:highScore }));
}


export const AddNewHighScore = async () => {
    const game = store.getState().gameSettingsReducer;
    const highScore: highScore = {
        score: (game.currentGameScore.correctSameLetter + game.currentGameScore.correctSameLocation) * game.gameSettings.nBack,
        level: game.gameSettings.nBack,
        time: new Date(),
    };

    const scoreToPost = {
        highscore: highScore
    }

    await fetch(`/api/highscore`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + window.localStorage.getItem(AccessToken),
        },
        body: JSON.stringify(scoreToPost),
    })
}
