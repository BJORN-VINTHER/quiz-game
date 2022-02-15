class GameState {
    stateEnum; // 1: Waiting to start. 2: Awaiting answers. 3: Awaiting new round. 4: Game finished.
    currentRound; // number
    maxRounds; // number
    questionText; // String
    choices; // List of strings
    currentTurnPlayerID; // number
    currentTurnPlayerName; // String
    answers = []; // List of playerAnswer
    playerScores = []; // List of playerScore

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
        };
    }

    getRoundAnswerChoices() {
        return {
            choices: this.choices
        }
    }

    getTurnResult() {
        return {
            questionText: this.questionText,
            currentTurnPlayerID: this.currentTurnPlayerID,
            currentTurnPlayerName: this.currentTurnPlayerName,
            answers: this.answers.map(a => ({player: a.playerName, answer: a.answerText})),
        };
    }
}

class PlayerAnswer {
    playerID;
    playerName;
    answerIndex;
    answerText;
}

class PlayerScore {
    playerID;
    playerName;
    score = 0;

    constructor(id, name) {
        this.playerID = id;
        this.playerName = name;
    }
}

module.exports = {
    GameState,
    PlayerAnswer,
    PlayerScore
}