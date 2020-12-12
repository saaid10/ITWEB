import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddGameRoundOperation } from '../state/game-round/operations';
import { GameRound } from '../state/game-round/types';
import { AppState } from "../state/store";
import { GetRandomLetter, GetRandomNumber } from "../utils/random-generator"


export function DualNBack() {
    const GameList: GameRound[] = useSelector((state: AppState) => state.gameRoundsReducer.rounds);
    const dispatch = useDispatch()

    const AddGameRound = () => {
        const X: number = GetRandomNumber(3);
        const Y: number = GetRandomNumber(3);
        const letter: string = GetRandomLetter();

        const round: GameRound = { Xpossition: X, Ypossition: Y, Letter: letter }
        AddGameRoundOperation(round)(dispatch);
    }


    const PrintGameState = (): JSX.Element[] => {
        return GameList.map(round => {
            return (<div>
                <p>Xpossition: {round.Xpossition}</p>
                <p>Ypossition: {round.Ypossition}</p>
                <p>Letter: {round.Letter}</p>
            </div>);
        })
    }
    console.log(GameList)
    return (
        <div>
            <button onClick={AddGameRound}>AddRandomRound</button>

            <h1>Hello, mac swagger</h1>

            <p>Game states: {PrintGameState()} </p>
        </div>
    );
}
