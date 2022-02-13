import { getIp, httpGet, httpPost } from "./utilities";
import IoClient from "socket.io-client";

class Service {
    constructor() {
    }

    async init() {
        console.log('Initializing service');
        this.ip = getIp();
        
    }

    connect() {
        console.log('Connecting to Socket');
        const socket = IoClient.connect("https://quiz-game-api.azurewebsites.net");
        socket.on('connect', () => {
            console.log('SocketIO connection established');
            socket.emit('socketAPITest')
        })
        return socket;
    }

    async serverTest() {
        const result = await httpGet("http://localhost:4000/proofOfConceptGetTest"); // https://quiz-game-api.azurewebsites.net/proofOfConceptGetTest
        console.log('Server result ', result);
        return result;
    }

    async createGame() {
        console.log("Called create game - " + this.ip);
        return 4892;
    }

    async sampleGet() {
        return httpGet("https://jsonplaceholder.typicode.com/todos/1");
    }

    async samplePost() {
        const item = {
            title: "foo",
            body: "bar",
            userId: 1,
        };
        return httpPost("https://jsonplaceholder.typicode.com/posts", item);
    }

}

export const service = new Service();