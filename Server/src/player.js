const { Subject } = require('rxjs');

export class player {
    playerID;
    socket;
    userName;
    answerSubmitted = new Subject();
    startNextRoundRequested = new Subject();
    showFinalResultsRequested = new Subject();

    constructor(socket, userName) {
        this.socket = socket;
        this.userName = userName;

        socket.on("submitAnswer", answer => {
            this.answerSubmitted.next(answer);
        });

        socket.on("startNextRound", () => {
            this.startNextRoundRequested.next();
        });

        socket.on("showFinalResuts", () => {
            this.showFinalResultsRequested.next();
        })
    }
}