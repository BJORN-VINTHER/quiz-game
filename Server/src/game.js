const io = require('./index');
const { GameState, PlayerAnswer } = require("./gameState");

const { v4: uuidv4 } = require('uuid');

class Game {
    gameGuid = uuidv4();
    gameID;
    players = [];
    hostIP;
    inviteCode;
    creationTime;
    gameState = new GameState();
    currentRoundPreviouslyPlayedPlayerIDs = [];

    constructor(hostIP, inviteCode) {
        this.hostIP = hostIP;
        this.inviteCode = inviteCode;
    }

    addPlayer(player, asHost) {
        this.players.push(player);
        player.socket.join(this.gameGuid); // Join the game socketIO room to enable broadcasting
        player.answerSubmitted.subscribe((answer) => this.onAnswerSubmitted(answer, player));
        if (asHost) {
            player.startNextRoundRequested.subscribe(() => this.onStartNextRoundRequested());
            player.showFinalResultsRequested.subscribe(() => this.showFinalResultsRequested());
        }
    }

    onAnswerSubmitted(answer, player) {
        if (this.gameState.stateEnum !== 2)
            throw new Error('Invalid state to submit answer. State is ' + this.gameState.stateEnum);
        if (this.gameState.answers.some(a => a.playerID === player.playerID))
            throw new Error('Answer already received for player ' + player.playerID);

        const playerAnswer = new PlayerAnswer();
        playerAnswer.playerID = player.playerID;
        playerAnswer.playerName = player.userName;
        playerAnswer.answerIndex = this.gameState.choices.indexOf(answer);
        playerAnswer.answerText = answer;
        this.gameState.answers.push(playerAnswer);
        if (this.gameState.answers.length === this.players.length)
            this.endTurn();
    }

    endTurn() {
        io.to(this.gameID).emit('roundResultReady', this.gameState.getRoundResult()); // Emit round result
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

    onStartNextRoundRequested() {
        io.to(this.gameID).emit('startingNewRound', {timerSeconds: 5});
        setTimeout(() => this.startTurn(), 5000);
    }

    startTurn() {
        const chosenPlayer = this.players.find(p => !this.currentRoundPreviouslyPlayedPlayerIDs.includes(p.playerID));
        this.gameState.currentTurnPlayerID = chosenPlayer.playerID;
        this.gameState.currentTurnPlayerName = chosenPlayer.userName;
        this.gameState.stateEnum = 2;
        io.to(this.gameID).emit("roundQuestionReady", this.gameState.getRoundQuestion());
    }

    endGame() {
        this.gameState.stateEnum = 4;
        const host = this.players.find(p => p.socket.remoteAddress === this.hostIP);
        host.socket.send('gameEnded');
    }

    showFinalResultsRequested() {
        if (this.gameState.stateEnum !== 4)
            throw new Error('Invalid state to request final result');
    }
}

module.exports = Game;
