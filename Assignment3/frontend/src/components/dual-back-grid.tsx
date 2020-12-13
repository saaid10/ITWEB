import { useDispatch, useSelector } from "react-redux";
import { GameRound } from "../state/game-round/types";
import { AddToCorrectLetterOperation, AddToCorrectLocationOperation } from "../state/game/operations";
import { AppState } from "../state/store";
import { DualBackGridItem } from "./dual-back-grid-item"
import "./dual-back.scss";


export const DualBackGrid = () => {
    const nBack: number = useSelector((state: AppState) => state.gameSettingsReducer.gameSettings.nBack);
    const isRunning: boolean = useSelector((state: AppState) => state.gameSettingsReducer.gameSettings.isRunning);
    const rounds: GameRound[] = useSelector((state: AppState) => state.gameRoundsReducer.rounds);
    const dispatch = useDispatch();


    const checkSameLocation = () => {
        if (!isRunning) return;
        if (rounds.length > nBack) {
            const curr: GameRound = rounds[rounds.length - 1];
            const last: GameRound = rounds[rounds.length - (nBack + 1)];


            if (curr.Xpossition === last.Xpossition && curr.Ypossition === last.Ypossition)
                return AddToCorrectLocationOperation(1)(dispatch);
        }

        return AddToCorrectLocationOperation(-1)(dispatch);
    }

    const checkSameLetter = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
        if (!isRunning) return;
        if (rounds.length > nBack) {
            const curr: string = rounds[rounds.length - 1].Letter;
            const last: string = rounds[rounds.length - (nBack + 1)].Letter;

            if (curr === last)
                return AddToCorrectLetterOperation(1)(dispatch);
        }

        return AddToCorrectLetterOperation(-1)(dispatch);
    }


    const gridGenerator = (): JSX.Element[] => {
        let gridItems: JSX.Element[] = [];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                gridItems.push(<DualBackGridItem x={i} y={j} key={"grid possition: " + i + j} />);
            }
        }
        return gridItems;
    }

    return (
        <div className="dual-back-grid-container" onClick={checkSameLocation} onContextMenu={checkSameLetter} >
            {gridGenerator()}
        </div>
    )
}