const { Subject } = require('rxjs');

export class player {
    playerID;
    socket;
    userName;
    answerSubmitted = new Subject();

    constructor(socket, userName) {
        this.socket = socket;
        this.userName = userName;

        socket.on("submitAnswer", answer => {
            this.answerSubmitted.next(answer);
        });
    }
}