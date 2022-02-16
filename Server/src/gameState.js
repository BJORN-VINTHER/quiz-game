class GameState {
    stateEnum = 1; // 1: Waiting to start. 2: Awaiting answers. 3: Awaiting new round. 4: Game finished.
    currentRound = 1; // number
    maxRounds; // number
    currentQuestionIndex; // number
    questionsCount; // number
    questionText; // String
    choices; // List of strings
    currentTurnPlayerID; // number
    currentTurnPlayerIP; // string
    currentTurnPlayerName; // String
    answers = []; // List of playerAnswer
    playerScores = []; // List of playerScore

    getUiGameState(inviteCode, hostIP) {
        return {
            inviteCode: inviteCode,
            currentQuestion: this.currentRound,
            totalQuestions: this.questionsCount,
            playerScores: this.playerScores,
            host: hostIP,
        };
    }

    getRoundQuestion() {
        return {
            index: this.currentQuestionIndex,
            questionText: this.questionText,
            playerIP: this.currentTurnPlayerIP,
            currentTurnPlayerName: this.currentTurnPlayerName,
            choices: this.choices
        };
    }

    getRoundAnswerChoices() {
        return {
            choices: this.choices
        }
    }

    getTurnResult(correctAnswerIndex) {
        return {
            questionText: this.questionText,
            currentTurnPlayerIP: this.currentTurnPlayerIP,
            currentTurnPlayerName: this.currentTurnPlayerName,
            answers: this.answers.map(a => ({playerIP: a.playerIP, playerName: a.playerName, answer: a.answerText})),
            correctAnswerIndex: correctAnswerIndex,
            // scores
        };
    }
}

class PlayerAnswer {
    playerID;
    playerIP;
    playerName;
    answerIndex;
    answerText;
}

class PlayerScore {
    playerIP;
    playerName;
    score = 0;

    constructor(ip, name) {
        this.playerIP = ip;
        this.playerName = name;
    }
}

module.exports = {
    GameState,
    PlayerAnswer,
    PlayerScore
}