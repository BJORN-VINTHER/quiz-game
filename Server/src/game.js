const { io, db } = require('./index');
const { GameState, PlayerAnswer, PlayerScore } = require("./gameState");

const { v4: uuidv4 } = require('uuid');
const { shuffleArray } = require('./utilities');

class Game {
    gameGuid = uuidv4();
    gameID;
    players = [];
    hostIP;
    host;
    inviteCode;
    creationTime;
    gameState = new GameState();
    questions;
    currentRoundPreviouslyPlayedPlayerIDs = [];
    currentQuestionOrderIndex = 0;

    constructor(hostIP, inviteCode) {
        this.hostIP = hostIP;
        this.inviteCode = inviteCode;
        this.questions = db.getQuestions();
    }

    addPlayer(player, asHost) {
        if (this.players.some(p => p.playerID === player.playerID))
            this.onPlayerRejoined();
        else {
            this.players.push(player);
            this.playerScores.push(new PlayerScore(player.playerID, player.userName));
        }
        player.socket.join(this.gameGuid); // Join the game socketIO room to enable broadcasting
        player.answerSubmitted.subscribe((answerIndex) => this.onAnswerSubmitted(answerIndex, player));
        if (asHost) {
            this.host = player
            player.startNextRoundRequested.subscribe(delayMilliseconds => this.onStartNextRoundRequested(delayMilliseconds));
            player.showFinalResultsRequested.subscribe(() => this.showFinalResultsRequested());
        }
    }

    onPlayerRejoined() {
        io.to(this.gameID).emit('gameStateUpdated', this.gameState.getUiGameState());
    }

    onAnswerSubmitted(answerIndex, player) {
        if (this.gameState.stateEnum !== 2)
            throw new Error('Invalid state to submit answer. State is ' + this.gameState.stateEnum);
        if (this.gameState.answers.some(a => a.playerID === player.playerID))
            throw new Error('Answer already received for player ' + player.playerID);

        const playerAnswer = new PlayerAnswer();
        playerAnswer.playerID = player.playerID;
        playerAnswer.playerName = player.userName;
        playerAnswer.answerIndex = answerIndex;
        playerAnswer.answerText = this.gameState.choices[answerIndex];
        this.gameState.answers.push(playerAnswer);
        if (this.gameState.answers.length === this.players.length)
            this.endTurn();
    }

    endTurn() {
        io.to(this.gameID).emit('turnResultReady', this.gameState.getTurnResult()); // Emit round result
        const correctAnswerIndex = this.gameState.answers.find(a => a.playerID === this.gameState.currentTurnPlayerID);
        for (const answer of this.gameState.answers.filter(p => p.playerID !== this.gameState.currentTurnPlayerID))
            if (answer.answerIndex === correctAnswerIndex)
                this.gameState.playerScores.find(p => p.playerID === answer.playerID).score += 100;
        setTimeout(() => io.to(this.gameID).emit('gameStateUpdated', this.gameState.getUiGameState()), 3000); // Emit updated score and round state

        this.currentRoundPreviouslyPlayedPlayerIDs.push(this.gameState.currentTurnPlayerID);
        this.gameState.stateEnum = 3;
        if (this.currentRoundPreviouslyPlayedPlayerIDs.length === this.players.length) {
            if (this.gameState.currentRound !== this.gameState.maxRounds) {
                this.gameState.currentRound++;
                this.currentRoundPreviouslyPlayedPlayerIDs = [];
            }
            else
                this.endGame();
        }
    }

    onStartNextRoundRequested(delayMilliseconds) {
        // io.to(this.gameID).emit('startingNewRound', {timerSeconds: 5});
        this.startTurn();
        setTimeout(() => this.sendAnswerOptions(), delayMilliseconds ?? 3000);
    }

    startTurn() {
        this.gameState.maxRounds = Math.floor(this.questions.length / this.players.length);
        shuffleArray(this.players);
        const chosenPlayer = this.players.find(p => !this.currentRoundPreviouslyPlayedPlayerIDs.includes(p.playerID));
        this.gameState.currentTurnPlayerID = chosenPlayer.playerID;
        this.gameState.currentTurnPlayerName = chosenPlayer.userName;
        this.gameState.stateEnum = 2;
        const question = questions[this.currentQuestionOrderIndex];
        this.gameState.questionText = question.answerText;
        this.gameState.choices = [question.option1, question.option2, question.option3, question.option4];
        io.to(this.gameID).emit("roundQuestionReady", this.gameState.getRoundQuestion());
        this.currentQuestionOrderIndex++;
    }

    sendAnswerOptions() {
        io.to(this.gameID).emit("roundAnswerChoicesReady", this.gameState.getRoundAnswerChoices());
    }

    endGame() {
        this.gameState.stateEnum = 4;
        this.host.socket.emit('gameEnded');
    }

    showFinalResultsRequested() {
        if (this.gameState.stateEnum !== 4)
            throw new Error('Invalid state to request final result');
        this.endGame();
    }
}

module.exports = Game;
