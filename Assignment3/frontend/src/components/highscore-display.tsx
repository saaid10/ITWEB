import {
    Paper,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetHighSCoresOperation } from "../state/highscore/operations";
import { AppState } from "../state/store";
import './highscore-display.scss';


export function HighscoreDisplay() {
    const dispatch = useDispatch();

    const highscores = useSelector((state: AppState) => state.highScoreReducer.highScores)

    const getHighScores = async () => {
        (await GetHighSCoresOperation())(dispatch);
    }
    useEffect(() => {
        getHighScores();
    }, [])
    const nBack: number = useSelector((state: AppState) => state.gameSettingsReducer.gameSettings.nBack);

    return (
        <div className="tableContainer">
            <h2>Here you can see the highscores of other users, on the same level as you ({nBack})</h2>
            <TableContainer component={Paper} className="tableContainer">
                <table className="table">
                    <TableHead>
                        <TableRow>
                            <TableCell className="item">Level</TableCell>
                            <TableCell className="item">Score</TableCell>
                            <TableCell className="item">Time</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {highscores.sort((a, b) => (a.score > b.score) ? -1 : 1).map((highscore) => (
                            <TableRow>
                                <TableCell className="item">{highscore.level}</TableCell>
                                <TableCell className="item">{highscore.score}</TableCell>
                                <TableCell className="item">{highscore.time.toLocaleDateString() + " " + highscore.time.toLocaleTimeString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </table>
            </TableContainer>
        </div>
    )
}
