import { getIp, httpPost } from "../utilities/utilities";
import { io, Socket } from "socket.io-client";
import { CreateGameResult, GameState, Player, PlayerScore, Question, QuestionResult } from "./serviceDataObjects";

class Service {
    // baseUrl = "https://quiz-game.azurewebsites.net";
    baseUrl = "http://localhost:4000";
    ip: string = null;
    io: ServiceSocket = null;

    constructor() {
        this.init();
    }

    async init() {
        console.log('Initializing service');
        this.ip = await getIp();
        console.log('IP is: ' + this.ip);
    }

    //#region http endpoints
    async httpTest() : Promise<string> {
        const gameId:string = await httpPost(this.baseUrl + "/hostNewGame", { ip: this.ip }) as string;
        console.log("Created game: " + gameId);
        return gameId;
    }

    async createGame() {
        const result = await httpPost(this.baseUrl + "/hostNewGame", { ip: this.ip }) as CreateGameResult;
        console.log("Created game: " + result.inviteCode);
        return result.inviteCode;
    }

    async joinGame(inviteCode: string, userName: string, ip: string) {
        const body = {
            inviteCode: inviteCode,
            userName: userName,
            ip: ip
        }
        await httpPost(this.baseUrl + "/joinGame", body);
        console.log("Joined game: " + inviteCode);
        return inviteCode;
    }
    
    async getGameState(inviteCode: string) {
        const state = await httpPost(this.baseUrl + "/getGameState", { inviteCode: inviteCode }) as GameState;
        console.log("Game state", state);
        return state;
    }
    //#endregion

    //#region socket
    async connect(inviteCode: string): Promise<ServiceSocket> {
        return new Promise((resolve, reject) => {
            if (!this.io) {
                console.log('Connecting to socket...');
                const socket = io(this.baseUrl + `?inviteCode=${inviteCode}&ip=${this.ip}`).connect();
                socket.on('connect', () => {
                    console.log('Connection established');
                    resolve(this.io);
                })
                socket.on("connect_error", (err) => {
                    console.log(`BURN! ${err.message} \n ${err.stack}`);
                    reject();
                });
                this.io = new ServiceSocket(socket);
            }
            resolve(this.io);
        });
    }
    //#endregion
}

class ServiceSocket {
    io: Socket;

    constructor(io: Socket) {
        this.io = io;
    }

    nextQuestion(duration: number) {
        this.io.emit("startNextRound", duration)
    }

    submitAnswer(index: number) {
        this.io.emit("submitAnswer", index)
    }

    // showFinalResult() {
    //     this.io.emit("showFinalResult")
    // }

    onQuestionStart(callback: (question: Question) => void) {
        this.io.on("roundQuestionReady", callback);
    }

    onQuestionComplete(callback: (question: QuestionResult) => void) {
        this.io.on("turnResultReady", callback);
    }

    onPlayerJoined(callback: (player: Player) => void) {
        this.io.on("playerJoined", callback);
    }
}

export const service = new Service();