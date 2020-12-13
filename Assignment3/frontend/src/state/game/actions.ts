import * as constants from "./constants";
import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory("GameSettingActions");


export const SetNBackAction = actionCreator<{nBack: number}>(constants.SET_N_BACK);
export const SetIsRunningAction = actionCreator<{isRunning: boolean}>(constants.SET_IS_RUNNING);
export const AddToSameLetterAction = actionCreator<{amountToAdd: number}>(constants.ADD_TO_SAME_LETTER);
export const AddToSameLocationAction = actionCreator<{amountToAdd: number}>(constants.ADD_TO_SAME_LOCATION);
export const ClearScoreAction = actionCreator(constants.CLEAR_SCORE);