const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const Player = require("./player");
const { makeID, getIPFromHttp } = require("./utilities");
const Db = require("./db");
const Game = require("./game");

const app = express();
const httpServer = createServer(app);

// Global variables
const io = new Server(httpServer, { /* options */ });
const db = new Db();
module.exports = { io, db };

const activeGames = []; // List of game

io.on("connection", (socket) => {
    console.log('Server connected');
    socket.emit('ConnectionEstablished', 'testtt');
    socket.on('SocketAPITest', (testMessage) => {
        console.log('Server: Received SocketAPITest. Sending TestMessageReceived');
        socket.emit('TestMessageReceived', testMessage);
    })
    return;
    const { inviteCode, userName, asHost } = socket.handshake.query;
    const game = activeGames.find(g => g.inviteCode === inviteCode);
    if (asHost && game.hostIP !== socket.remoteAddress)
        throw new Error('Tried connecting as host, but the IP did not match');
    game.addPlayer(new Player(socket, userName), asHost);
});

httpServer.listen(3000);

app.use(express.json());

app.get('/test', (req, res) => {
    console.log('Body', req.body);
    const { myString } = req.body;
    res.status(200).send('All good! ' + myString);
});

app.post('/hostNewGame', (req, res) => {
    const inviteCode = makeID(6);
    const newGame = new Game(req.socket.remoteAddress, inviteCode);
    this.activeGames.push(newGame);
    res.status(200).send({inviteCode: inviteCode});
});

// Join game

// Rejoin game

// Start next round

// 

app.get('/ProofOfConceptGetTest', (req, res) => {
    res.status(200).send('All good');
});

app.post('/ProofOfConceptPostTest', (req, res) => {
    res.status(200).send('Received ' + req.body);
});

app.post('/AddGameTest', async (req, res) => {
    console.log('Connected');
    const { v4: uuidv4 } = require('uuid');
    console.log('Adding game');
    const gameID = await db.addGame(uuidv4(), makeID(6), getIPFromHttp(req));
    console.log('Added game with ID ', gameID);
    const game = await db.getGame(gameID);
    console.log('Found Game ', game);
    res.status(200).send({GameID: gameID});
});

app.post('/AddPlayerTest', async (req, res) => {
    const { userName, } = req.body;
});

app.get('/SocketIOTest', (req, res) => {
    console.log('Testing initiated');
    const ioClient = require('socket.io-client');
    console.log('Connecting');
    const socket = ioClient.connect('http://localhost:3000');
    socket.on('connect', () => {
        console.log('Client connected');
    });
    socket.on('ConnectionEstablished', () => {
        console.log('Client: Received ConnectionEstablished. Sending socketAPITest');
        socket.emit("SocketAPITest", 'Testing testing');
    })
    socket.on('TestMessageReceived', (message) => {
        console.log("Client: TestMessageReceived: ", message);
        res.sendStatus(200);
    });
    socket.onAny((message1) => {
        console.log('Client: Received this ', message1);
    });
});