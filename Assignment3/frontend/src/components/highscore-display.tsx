import {
    makeStyles,
    Paper,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { highScore } from "../state/highscore/types";
import { AppState } from "../state/store";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },

    tableContainer: {
        width: 'fit-content',
        margin: 'auto',
    }
});

export function HighscoreDisplay() {
    const classes = useStyles();
    const nBack: number = useSelector((state: AppState) => state.gameSettingsReducer.gameSettings.nBack);
    const highscores: highScore[] = [
        { level: 1, score: 300, time: new Date() },
        { level: 2, score: 400, time: new Date() },
        { level: 3, score: 500, time: new Date() }
    ]

    return (
        <div className={classes.tableContainer}>
            <h2>Here you can see the highscores of other users, on the same level as you ({nBack})</h2>
            <TableContainer component={Paper} className={classes.tableContainer}>
                <table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Level</TableCell>
                            <TableCell>Score</TableCell>
                            <TableCell>Time</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {highscores.map((highscore) => (
                            <TableRow>
                                <TableCell component="th" scope="row">{highscore.level}</TableCell>
                                <TableCell>{highscore.score}</TableCell>
                                <TableCell>{highscore.time}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </table>
            </TableContainer>
        </div>
    )
}
