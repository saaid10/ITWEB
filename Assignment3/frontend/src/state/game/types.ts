export type Gamesettings = {
    nBack: number;
    isRunning: boolean;
}

export type currentGameScore = {
    correctSameLocation: number;
    correctSameLetter: number;
}

export  type Game = {
    gameSettings: Gamesettings;
    currentGameScore: currentGameScore; 
}