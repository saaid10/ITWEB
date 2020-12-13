import { Dispatch } from "redux";
import { AddToSameLetterAction, AddToSameLocationAction, ClearScoreAction, SetIsRunningAction, SetNBackAction } from "./actions";

export const SetNBackOperation = (n: number) => {
    return (dispatch: Dispatch) => dispatch(SetNBackAction({ nBack: n }));
}

export const SetIsRunningOperation = (isRunning: boolean) => {
    return (dispatch: Dispatch) => dispatch(SetIsRunningAction({ isRunning }));
}

export const AddToCorrectLocationOperation = (amountToAdd: number) => {
    return (dispatch: Dispatch) => dispatch(AddToSameLocationAction({ amountToAdd }));
}

export const AddToCorrectLetterOperation = (amountToAdd: number) => {
    return (dispatch: Dispatch) => dispatch(AddToSameLetterAction({ amountToAdd }));
}

export const ClearScoreOperation = () => {
    return (dispatch: Dispatch) => dispatch(ClearScoreAction());
}