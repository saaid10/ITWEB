import { Button, Slider } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { secondsBetweenLetters } from '../constants';
import { AddGameRoundOperation, ClearGameRoundsOperation } from '../state/game-round/operations';
import { GameRound } from '../state/game-round/types';
import { ClearScoreOperation, SetIsRunningOperation, SetNBackOperation } from '../state/game/operations';
import { AddNewHighScoreOperation } from '../state/highscore/operations';
import { highScore } from '../state/highscore/types';
import { AppState } from '../state/store';
import { getRoundsLeft } from '../utils/rounds';
import { DualBackGrid } from './dual-back-grid';


export function DualNBack() {
    const dispatch = useDispatch();
    const rounds: GameRound[] = useSelector((state: AppState) => state.gameRoundsReducer.rounds);   //Only here to update EffectHook
    const isRunning: boolean = useSelector((state: AppState) => state.gameSettingsReducer.gameSettings.isRunning);
    const nBack: number = useSelector((state: AppState) => state.gameSettingsReducer.gameSettings.nBack);
    const numberOfCorrectLocation: number = useSelector((state: AppState) => state.gameSettingsReducer.currentGameScore.correctSameLocation);
    const numberOfCorrectLetter: number = useSelector((state: AppState) => state.gameSettingsReducer.currentGameScore.correctSameLetter);

    const setNBack = (e: React.ChangeEvent<{}>, n: number | number[]) => {
        if (typeof n === "number") {
            SetNBackOperation(n)(dispatch);
        }
    }

    const newGame = () => {
        ClearScoreOperation()(dispatch);
        SetIsRunningOperation(true)(dispatch);
    }


    const clearGame = () => {
        SetIsRunningOperation(false)(dispatch);
        ClearGameRoundsOperation()(dispatch);
    }

    const postScore = async () => {
        (await AddNewHighScoreOperation())(dispatch);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (getRoundsLeft() === 0) {
                postScore();
                clearGame();
            }
            if (isRunning)
                AddGameRoundOperation()(dispatch);

        }, secondsBetweenLetters * 1000);

        if (!isRunning)
            clearInterval(interval);
        return () => clearInterval(interval);
    }, [rounds, isRunning]);

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
                            disabled={isRunning}
                        />
                    </div>
                </div>
                <Button
                    variant="contained"
                    onClick={isRunning ? clearGame : newGame}
                    color={isRunning ? "secondary" : "default"}
                >
                    {isRunning ? "Stop Game" : "New Game"}
                </Button>

                <div>
                    <p hidden={!isRunning}>Rounds left: {getRoundsLeft()}</p>
                    <p hidden={isRunning}>Correct by letter: {numberOfCorrectLocation}</p>
                    <p hidden={isRunning}>Correct by location: {numberOfCorrectLetter}</p>
                </div>
            </div>
            <br />

            <DualBackGrid />
        </div>
    );
}
