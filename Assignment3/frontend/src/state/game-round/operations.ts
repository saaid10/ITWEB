import { Dispatch } from "redux";
import { GetRandomLetter, GetRandomNumber } from "../../utils/random-generator";
import { AddGameRoundAction, ClearGameRoundsAction } from "./actions";
import { GameRound } from "./types";


export const AddGameRoundOperation = () => {
    const round: GameRound = {
        Xpossition: GetRandomNumber(3),
        Ypossition: GetRandomNumber(3),
        Letter: GetRandomLetter()
    }
    var msg = new SpeechSynthesisUtterance(round.Letter);
    window.speechSynthesis.speak(msg);
    return (dispach: Dispatch) => dispach(AddGameRoundAction({ gameRound: round }));
}


export const ClearGameRoundsOperation = () => {
    return (dispatch: Dispatch) => dispatch(ClearGameRoundsAction());
}