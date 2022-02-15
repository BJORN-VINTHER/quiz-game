const { io } = require('./index.js');
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

    // Host subscriptions
    startNextRoundSubscription;
    showFinalResultsSubscription;

    constructor(hostIP, inviteCode) {
        this.hostIP = hostIP;
        this.inviteCode = inviteCode;
        const Db = require('./db');
        const db = Db.createNew();
        db.getQuestions().then(q => this.questions = q);
    }

    addPlayer(player, asHost) {
        if (!asHost && !this.players.some(p => p.playerID === player.playerID)) {
            console.log('Adding player ', player.userName);
            this.players.push(player);
            this.gameState.playerScores.push(new PlayerScore(player.playerID, player.userName));
        }
        
        player.socket.join(this.gameGuid); // Join the game socketIO room to enable broadcasting
        player.answerSubmitted.subscribe((answerIndex) => this.onAnswerSubmitted(answerIndex, player));
        if (asHost) {
            this.host = player;
            console.log('Host joined');
            if (!!this.startNextRoundSubscription)
                this.startNextRoundSubscription.unsubscribe();
            this.startNextRoundSubscription = player.startNextRoundRequested.subscribe(delayMilliseconds => this.onStartNextRoundRequested(delayMilliseconds));
            if (!!this.showFinalResultsSubscription)
                this.showFinalResultsSubscription.unsubscribe();
            this.showFinalResultsRequested = player.showFinalResultsRequested.subscribe(() => this.showFinalResultsRequested());
        }
        this.broadcastGameStateUpdated();
    }

    broadcastGameStateUpdated() {
        console.log('Broadcasting gamestate to room ', this.gameGuid);
        const { io } = require('./index.js');
        io.to(this.gameGuid).emit('gameStateUpdated', this.gameState.getUiGameState());
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
        console.log('Server: Answer choices and index ', answerIndex, this.gameState.choices);
        playerAnswer.answerText = this.gameState.choices[answerIndex];
        console.log('Server: pushing player answer ', playerAnswer);
        this.gameState.answers.push(playerAnswer);
        if (this.gameState.answers.length === this.players.length)
            this.endTurn();
    }

    endTurn() {
        console.log('Server: ending turn');
        const { io } = require('./index.js');
        io.to(this.gameGuid).emit('turnResultReady', this.gameState.getTurnResult()); // Emit round result
        const correctAnswerIndex = this.gameState.answers.find(a => a.playerID === this.gameState.currentTurnPlayerID);
        for (const answer of this.gameState.answers.filter(p => p.playerID !== this.gameState.currentTurnPlayerID))
            if (answer.answerIndex === correctAnswerIndex)
                this.gameState.playerScores.find(p => p.playerID === answer.playerID).score += 100;
        setTimeout(() => io.to(this.gameGuid).emit('gameStateUpdated', this.gameState.getUiGameState()), 3000); // Emit updated score and round state

        this.currentRoundPreviouslyPlayedPlayerIDs.push(this.gameState.currentTurnPlayerID);
        this.gameState.answers = [];
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
        if (this.gameState.stateEnum !== 1 && this.gameState.stateEnum !== 3)
            throw new Error('Invalid game state to request new round ' + this.gameState.stateEnum);
        console.log('Server: Starting next round');
        // io.to(this.gameID).emit('startingNewRound', {timerSeconds: 5});
        this.startTurn();
        setTimeout(() => this.sendAnswerOptions(), delayMilliseconds ?? 3000);
    }

    startTurn() {
        const { io } = require('./index.js');
        this.gameState.maxRounds = Math.floor(this.questions.length / this.players.length);
        console.log('Current round and max ', this.gameState.currentRound, this.gameState.maxRounds);
        shuffleArray(this.players);
        const chosenPlayer = this.players.find(p => !this.currentRoundPreviouslyPlayedPlayerIDs.includes(p.playerID));
        this.gameState.currentTurnPlayerID = chosenPlayer.playerID;
        this.gameState.currentTurnPlayerName = chosenPlayer.userName;
        this.gameState.stateEnum = 2;
        const question = this.questions[this.currentQuestionOrderIndex];
        console.log('Reading question ', question, this.currentQuestionOrderIndex);
        this.gameState.questionText = question.text;
        this.gameState.choices = [question.option1, question.option2, question.option3, question.option4];
        console.log('Server: Setting state choices ', this.gameState.choices);
        io.to(this.gameGuid).emit("roundQuestionReady", this.gameState.getRoundQuestion());
        console.log('Server: emitted round question');
        this.currentQuestionOrderIndex++;
    }

    sendAnswerOptions() {
        const { io } = require('./index.js');
        io.to(this.gameGuid).emit("roundAnswerChoicesReady", this.gameState.getRoundAnswerChoices());
    }

    endGame() {
        this.gameState.stateEnum = 4;
        this.host.socket.emit('gameEnded');
    }

    showFinalResultsRequested() {
        this.endGame();
    }
}

module.exports = Game;
