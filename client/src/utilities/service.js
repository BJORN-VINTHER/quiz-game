import { getIp, httpPost } from "./utilities";
import io from "socket.io-client";

class Service {

    constructor() {
        this.init();
    }

    async init() {
        console.log('Initializing service');
        // this.baseUrl = "https://quiz-game.azurewebsites.net";
        this.baseUrl = "http://localhost:4000";
        this.ip = await getIp();
        console.log('IP is: ' + this.ip);
        this.io = null;
    }

    //#region http endpoints
    async httpTest() {
        const gameId = await httpPost(this.baseUrl + "/hostNewGame", { ip: this.ip });
        console.log("Created game: " + gameId);
        return gameId;
    }

    async createGame() {
        const { inviteCode } = await httpPost(this.baseUrl + "/hostNewGame", { ip: this.ip });
        console.log("Created game: " + inviteCode);
        return inviteCode;
    }

    async joinGame(gameId, userName, ip) {
        const body = {
            inviteCode: gameId,
            userName: userName,
            ip: ip
        }
        await httpPost(this.baseUrl + "/joinGame", body);
        console.log("Joined game: " + gameId);
        return gameId;
    }

    async getGameState(gameId) {
        const state = await httpPost(this.baseUrl + "/getGameState", { inviteCode: gameId });
        console.log("Game state", state);
        return state;
    }
    //#endregion

    //#region socket
    async connect(gameId) {
        return new Promise((resolve, reject) => {
            if (!this.io) {
                console.log('Connecting to socket...');
                const socket = io.connect(this.baseUrl + `?inviteCode=${gameId}&ip=${this.ip}`);
                socket.on('connect', () => {
                    console.log('Connection established');
                    resolve();
                })
                socket.on("connect_error", (err) => {
                    console.log(`BURN! ${err.message} \n ${err.stack}`);
                    reject();
                });
                this.io = new ServiceSocket(socket);
            }
            resolve();
        });
    }
    //#endregion
}

class ServiceSocket {

    constructor(io, ip) {
        this.ip = ip;
        this.io = io;
    }

    nextQuestion(duration) {
        this.io.emit("startNextRound", duration)
    }

    submitAnswer(index) {
        this.io.emit("submitAnswer", index)
    }

    // showFinalResult() {
    //     this.io.emit("showFinalResult")
    // }

    onQuestionStart(callback) {
        this.io.on("roundQuestionReady", callback);
    }

    onQuestionComplete(callback) {
        this.io.on("turnResultReady", callback);
    }

    onPlayerJoined(callback) {
        this.io.on("playerJoined", callback);
    }
}

export const service = new Service();