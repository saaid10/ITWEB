import { Button, Slider } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { secondsBetweenLetters } from '../constants';
import { AddGameRoundOperation, ClearGameRoundsOperation } from '../state/game-round/operations';
import { SetNBackOperation } from '../state/game/operations';
import { AppState } from '../state/store';
import { getRoundsLeft } from '../utils/rounds';
import { DualBackGrid } from './dual-back-grid';


export function DualNBack() {
    const dispatch = useDispatch()
    useSelector((state: AppState) => state.gameRoundsReducer.rounds);   //Only here to update EffectHook
    const nBack: number = useSelector((state: AppState) => state.gameSettingsReducer.nBack);

    const [running, setRunning] = useState(false);

    const setNBack = (e: React.ChangeEvent<{}>, n: number | number[]) => {
        if (typeof n === "number") {
            SetNBackOperation(n)(dispatch);
        }
    }

    const newGame = () => {
        setRunning(true);
    }


    const clearGame = () => {
        setRunning(false);
        ClearGameRoundsOperation()(dispatch);
    }

    useEffect(() => {
        if (getRoundsLeft() === 0)
            clearGame();

        const interval = setInterval(() => {
            if (running)
                AddGameRoundOperation()(dispatch);
        }, secondsBetweenLetters * 1000);

        if (!running)
            clearInterval(interval);
        return () => clearInterval(interval);
    });

    return (
        <div className="center">
            <h1>Welcome to DualBallzBack</h1>

            <div className="grid-container-3">
                <div className="flex-row">
                    <p className="margin-right-10px"> Set N-back:</p>
                    <div className="width-50px padding-top-5px">
                        <Slider
                            defaultValue={1}
                            min={1}
                            max={10}
                            value={nBack}
                            onChange={setNBack}
                            aria-labelledby="discrete-slider"
                            valueLabelDisplay="auto"
                            disabled={running}
                        />
                    </div>
                </div>
                <Button
                    variant="contained"
                    onClick={running ? clearGame : newGame}
                    color={running ? "secondary" : "default"}
                >
                    {running ? "Stop Game" : "New Game"}
                </Button>

                <p hidden={!running}>Rounds left: {getRoundsLeft()}</p>

            </div>
            <br />

            <DualBackGrid />
        </div>
    );
}
