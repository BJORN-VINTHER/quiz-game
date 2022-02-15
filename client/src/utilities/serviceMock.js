import { getIp, sleep, random } from "./utilities";
import {players} from "./mockData";

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

    //#region simulations

    //#endregion


    async getLobby(gameId) {
        await sleep(500);
        return {
            gameId: gameId,
            host: this.ip,
            players: [
                {
                    ip: "100.000.000",
                    playerName: "Mr Robot",
                },
                {
                    ip: "200.000.000",
                    playerName: "Sasha",
                },
                {
                    ip: "300.000.000",
                    playerName: "McDonald-Man",
                },
                {
                    ip: "400.000.000",
                    playerName: "Shubhanka",
                },
                {
                    ip: "500.000.000",
                    playerName: "Germania",
                },
                {
                    ip: "600.000.000",
                    playerName: "Sweet Gamer!",
                },
                {
                    ip: "600.000.000",
                    playerName: "Obi wan Kenobi 5648",
                },
            ]
        }
    }



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
    }

    onPlayerJoined(callback) {
        this.onPlayerJoinedCallback = callback;
    }

    async simulateLobby() {
        for(const player of players) {
            await sleep(random(100, 3000));
            this.onPlayerJoinedCallback(player);
        }
    }
}

export const serviceMock = new ServiceMock();