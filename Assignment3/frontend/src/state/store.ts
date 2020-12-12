import { combineReducers } from 'redux';
import { gameRoundsReducer } from './game-round/reducers';

const reducerArray = {
    gameRoundsReducer
}


const store = combineReducers({
    ...reducerArray
})


export type coreAppState = {
    [K in keyof typeof reducerArray]: ReturnType<typeof reducerArray[K]>;
}

export type AppState = coreAppState;

export default store;