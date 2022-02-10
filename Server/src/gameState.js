export class gameState {
    stateEnum; // 1: Waiting to start. 2: Awaiting answers. 3: Awaiting new round. 4: Game finished.
    currentRound; // number
    maxRounds; // number
    questionText; // String
    choices; // List of strings
    currentTurnPlayerID; // number
    currentTurnPlayerName; // String
    answers = []; // List of playerAnswer
    playerScores; // List of playerScore

    getUiGameState() {
        return {
            currentRound: this.currentRound,
            maxRound: this.maxRounds,
            playerScores: this.playerScores.map(p => ({player: p.playerName, score: p.score}))
        };
    }

    getRoundQuestion() {
        return {
            questionText: this.questionText,
            currentTurnPlayerID: this.currentTurnPlayerID,
            currentTurnPlayerName: this.currentTurnPlayerName,
            choices: this.choices
        };
    }

    getRoundResult() {
        return {
            questionText: this.questionText,
            currentTurnPlayerID: this.currentTurnPlayerID,
            currentTurnPlayerName: this.currentTurnPlayerName,
            answers: this.answers.map(a => ({player: a.playerName, answer: a.answerText})),
        };
    }
}

export class playerAnswer {
    playerID;
    playerName;
    answerIndex;
    answerText;
}

export class playerScore {
    playerID;
    playerName;
    score;
}