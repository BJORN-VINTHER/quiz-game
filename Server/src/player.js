const { Subject } = require('rxjs');

class Player {
    playerID;
    socket;
    userName;
    answerSubmitted = new Subject();
    startNextRoundRequested = new Subject();
    showFinalResultsRequested = new Subject();

    constructor(socket, userName) {
        this.socket = socket;
        this.userName = userName;

        socket.on("submitAnswer", answerIndex => {
            this.answerSubmitted.next(answerIndex);
        });

        socket.on("startNextRound", delayMilliseconds => {
            this.startNextRoundRequested.next(delayMilliseconds);
        });

        socket.on("showFinalResuts", () => {
            this.showFinalResultsRequested.next();
        })
    }
}

module.exports = Player;