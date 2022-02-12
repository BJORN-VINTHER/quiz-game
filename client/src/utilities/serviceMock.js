import { getIp } from "./utilities";

class ServiceMock {

    constructor() {
        this.init();
    }

    sleep(ms) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }

    async init() {
        this.ip = await getIp();
    }

    async createGame() {
        await this.sleep(500);
        return 4892;
    }

    async getLobby(gameId) {
        await this.sleep(500);
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
}

export const serviceMock = new ServiceMock();