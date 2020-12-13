import store from ".."
import { gameLength } from "../constants"

export const getRoundsLeft = (): number => {
    const state = store.getState();
    return gameLength + state.gameSettingsReducer.gameSettings.nBack - state.gameRoundsReducer.rounds.length;
}