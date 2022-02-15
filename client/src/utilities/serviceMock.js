import { getIp, sleep, random } from "./utilities";
import { answers, players, questions } from "./mockData";

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
    connect() {
        return new ServiceSocket();
    }
    //#endregion



    async getGameState(gameId) {
        await sleep(500);
        return {
            gameId: gameId,
            host: this.ip,
            totalQuestions: 20,

        }
    }

    async nextQuestion(gameId) {
        await this.sleep(500);
        return {
            number: 0,
            text: "The goal of today's session is ______",
            assignedTo: "100.000.000",
            options: [
                "for us to have fun and learn something about each other.",
                "to make you debug my code.",
                "to use it as a basis for your performance review.",
                "to learn English."
            ]
        };
    }
}

class ServiceSocket {

    constructor() {
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

    async simulateLobby() {
        for (const player of players) {
            await sleep(random(100, 3000));
            this.onPlayerJoinedCallback(player);
        }
    }

    async simulateQuestion(i) {
        this.onQuestionStartCallback(questions[i]);

        await sleep(10000);

        this.onQuestionCompleteCallback({
            question: questions[i],
            answers: answers[i]
        });
    }
}

export const serviceMock = new ServiceMock();