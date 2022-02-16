import { getIp, sleep, random } from "./utilities";
import { gameStates, players, questions } from "./mockData";

class ServiceMock {

    constructor() {
        this.init();
    }

    async init() {
        this.ip = await getIp();
    }

    //#region http endpoints
    async createGame() {
        await sleep(500);
        return 4892;
    }
    //#endregion

    //#region socket
    async connect(gameId) {
        await sleep(200);

        const state = { ...gameStates[0] };
        state.gameId = gameId;
        return {
            io: new ServiceSocket(this.ip),
            gameState: state
        }
    }
    //#endregion
}

class ServiceSocket {

    constructor(ip) {
        this.ip;
        this.onPlayerJoinedCallback = null;
        this.onStartGameCallback = null;
        this.onQuestionStartCallback = null;
        this.onQuestionCompleteCallback = null;
    }

    nextQuestion(i) {
        this.onNextQuestionCallback(questions[i]);
    }

    onQuestionStart(callback) {
        this.onQuestionStartCallback = callback;
    }

    onQuestionComplete(callback) {
        this.onQuestionCompleteCallback = callback;
    }

    onStartGame(callback) {
        this.onStartGameCallback = callback;
    }

    onPlayerJoined(callback) {
        this.onPlayerJoinedCallback = callback;
    }

    joinGame(playerName) {
        if (this.onPlayerJoinedCallback) {
            this.onPlayerJoinedCallback({ ip: this.ip, playerName });
        }
    }

    async simulateLobby() {
        for (const player of players) {
            await sleep(random(100, 3000));
            this.onPlayerJoinedCallback(player);
        }
    }

    async simulateQuestion(i, timeout) {
        this.onQuestionStartCallback(questions[i]);

        await sleep(timeout);

        const answers = players.map(x => {
            return {
                ip: x.ip,
                playerName: x.playerName,
                answer: i === 0 ? 0 : random(0, 3)
            }
        })
        answers[5].answer = null;
        this.onQuestionCompleteCallback({
            question: questions[i],
            answers: answers
        });
    }
}

export const serviceMock = new ServiceMock();