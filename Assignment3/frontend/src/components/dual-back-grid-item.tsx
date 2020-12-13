import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { letterViewTimeSeconds } from "../constants";
import { GameRound } from "../state/game-round/types";
import { AppState } from "../state/store";

type Props = {
    x: number;
    y: number;
}

export const DualBackGridItem = (props: Props) => {
    const gameList: GameRound[] = useSelector((state: AppState) => state.gameRoundsReducer.rounds);
    const round: GameRound = gameList[gameList.length - 1];

    const roundLetter: string | undefined = (round && round.Xpossition === props.x && round.Ypossition === props.y) ? round.Letter : undefined;

    const [showLetter, setShowLetter] = useState(false);

    useEffect(() => {
        if (roundLetter) {
            setShowLetter(true);
            setTimeout(() => { setShowLetter(false); }, letterViewTimeSeconds * 1000);
        }
    }, [round, roundLetter])

    return (
        <div className={"grid-item " + ((roundLetter && showLetter) ? "active-letter" : "letter")}>
            {roundLetter && showLetter &&
                <h1>{roundLetter}</h1>
            }
        </div>
    )

}


