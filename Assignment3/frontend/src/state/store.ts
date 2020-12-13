import { combineReducers } from 'redux';
import { gameRoundsReducer } from './game-round/reducers';
import { gameSettingsReducer } from './game/reducers';
import { authReducer } from './auth/reducers';

const reducerArray = {
    gameRoundsReducer,
    gameSettingsReducer,
    authReducer,
}


const store = combineReducers({
    ...reducerArray
})


export type coreAppState = {
    [K in keyof typeof reducerArray]: ReturnType<typeof reducerArray[K]>;
}

export type AppState = coreAppState;

export default store;