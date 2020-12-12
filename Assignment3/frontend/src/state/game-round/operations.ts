import { Dispatch } from "redux";
import { AddGameRoundAction } from "./actions";
import { GameRound } from "./types";


export const AddGameRoundOperation = (round: GameRound) => {
    return (dispach: Dispatch) => dispach(AddGameRoundAction({ gameRound: round }));
}