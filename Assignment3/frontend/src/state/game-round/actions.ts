import * as constants from "./constants";
import { GameRound } from "./types";
import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory("GameRoundActions");


export const AddGameRoundAction = actionCreator<{gameRound: GameRound}>(constants.ADD_GAME_ROUNDS);
export const ClearGameRoundsAction = actionCreator(constants.CLEAR_GAME_ROUNDS);