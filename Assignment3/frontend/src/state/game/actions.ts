import * as constants from "./constants";
import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory("GameSettingActions");


export const SetNBackAction = actionCreator<{nBack: number}>(constants.SET_N_BACK);