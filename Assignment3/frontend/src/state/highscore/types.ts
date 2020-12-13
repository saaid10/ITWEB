
export type highScore = {
    level: number;
    name?: string;
    time: Date;
    score: number;
}

export type highScoreReducerContent = {
    highScores: highScore[],
}