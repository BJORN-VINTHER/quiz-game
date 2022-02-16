const { Subject } = require('rxjs');

class Player {
    playerID;
    playerIP;
    socket;
    userName;
    answerSubmitted = new Subject();
    startNextRoundRequested = new Subject();
    showFinalResultsRequested = new Subject();

    constructor(socket, userName, ip) {
        this.socket = socket;
        this.userName = userName;
        this.playerIP = ip;

        socket.on("submitAnswer", answerIndex => {
            this.answerSubmitted.next(answerIndex);
        });

        socket.on("startNextRound", delayMilliseconds => {
            this.startNextRoundRequested.next(delayMilliseconds);
        });

        socket.on("showFinalResult", () => {
            this.showFinalResultsRequested.next();
        });
    }
}

module.exports = Player;