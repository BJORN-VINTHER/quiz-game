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

    async startGame(gameId) {
        await this.sleep(500);
        
    }

    async getGameState(gameId) {
        await this.sleep(500);
        return {
            gameId: gameId,
            host: this.ip,
            totalQuestions: 20,
            players: [
                {
                    ip: "100.000.000",
                    playerName: "Mr Robot",
                    points: 0
                },
                {
                    ip: "200.000.000",
                    playerName: "Sasha",
                    points: 0
                },
                {
                    ip: "300.000.000",
                    playerName: "McDonald-Man",
                    points: 0
                },
                {
                    ip: "400.000.000",
                    playerName: "Shubhanka",
                    points: 0
                },
                {
                    ip: "500.000.000",
                    playerName: "Germania",
                    points: 0
                },
                {
                    ip: "600.000.000",
                    playerName: "Sweet Gamer!",
                    points: 0
                },
                {
                    ip: "600.000.000",
                    playerName: "Obi wan Kenobi 5648",
                    points: 0
                },
            ]
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

export const serviceMock = new ServiceMock();