import {
    makeStyles,
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
    const dispatch = useDispatch();

    const highscores = useSelector((state: AppState) => state.highScoreReducer.highScores)

    const getHighSCores = async() => {
        (await GetHighSCoresOperation())(dispatch);
    }
    useEffect(() => {
        getHighSCores();
    }, [])
    const classes = useStyles();
    const nBack: number = useSelector((state: AppState) => state.gameSettingsReducer.gameSettings.nBack);


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
                                <TableCell>{highscore.time.toLocaleDateString() + " " + highscore.time.toLocaleTimeString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </table>
            </TableContainer>
        </div>
    )
}
