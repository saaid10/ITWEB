import { Dispatch } from "redux";
import { SetNBackAction } from "./actions";

export const SetNBackOperation = (n: number) => {
    return (dispatch: Dispatch) => dispatch(SetNBackAction({ nBack: n }));
}