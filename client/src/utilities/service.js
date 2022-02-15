import { getIp, httpGet, httpPost } from "./utilities";
import io from "socket.io-client";

class Service {

    constructor() {
        this.init();
    }

    async init() {
        console.log('Initializing service');
        //this.baseUrl = "https://quiz-game.azurewebsites.net";
        this.baseUrl = "http://localhost:4000"
        this.ip = await getIp();
    }

    //#region http endpoints
    async httpTest() {
        console.log('calling service');
        const result = await httpGet(this.baseUrl + "/test");
        console.log("service reponded with: " + result);
        return result;
    }

    async createGame() {
        const gameId = await httpPost(this.baseUrl + "/hostNewGame");
        console.log("Created game: " + gameId);
        return gameId;
    }
    //#endregion

    //#region socket
    connect() {
        console.log('Connecting to socket...');
        const socket = io.connect(this.baseUrl);
        socket.on('connect', () => {
            console.log('Connection established');
        })
        socket.on("connect_error", (err) => {
            console.log(`failed to connect due to ${err.message} \n ${err.stack}`);
        });
        return new ServiceSocket(socket);
    }
    //#endregion
}

class ServiceSocket {

    constructor(socket) {
        this.onPlayerJoinedCallback = null;
        this.socket = socket;
    }

    onPlayerJoined(callback) {
        this.socket.on("", callback);
    }
}

export const service = new Service();