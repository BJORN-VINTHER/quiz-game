import { getIp, httpGet, httpPost } from "./utilities";

export const service = new Service();

class Service {


    constructor() {
    }

    async init() {
        this.ip = getIp()
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