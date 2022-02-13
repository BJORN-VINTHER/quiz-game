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
    socket.on('socketAPITest', (testMessage) => {
        console.log('Server: Received socketAPITest. Sending TestMessageReceived');
        socket.emit('testMessageReceived', testMessage);
    });
    const { inviteCode, userName, asHost } = socket.handshake.query;
    const game = activeGames.find(g => g.inviteCode === inviteCode);
    if (asHost && game.hostIP !== socket.remoteAddress)
        throw new Error('Tried connecting as host, but the IP did not match');
    if (game)
        game.addPlayer(new Player(socket, userName), asHost);
    else
        console.log('No game found with invite code ', inviteCode);
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

app.get('/proofOfConceptGetTest', (req, res) => {
    res.status(200).send('All good');
});

app.post('/proofOfConceptPostTest', (req, res) => {
    res.status(200).send('Received ' + req.body);
});

app.post('/addGameTest', async (req, res) => {
    console.log('Connected');
    const { v4: uuidv4 } = require('uuid');
    console.log('Adding game');
    const gameID = await db.addGame(uuidv4(), makeID(6), getIPFromHttp(req));
    console.log('Added game with ID ', gameID);
    const game = await db.getGame(gameID);
    console.log('Found Game ', game);
    res.status(200).send({GameID: gameID});
});

app.post('/addPlayerTest', async (req, res) => {
    const { userName, } = req.body;
});

app.get('/socketIOTest', (req, res) => {
    console.log('Testing initiated');
    const ioClient = require('socket.io-client');
    console.log('Connecting');
    const socket = ioClient.connect('http://localhost:3000');
    socket.on('connect', () => {
        socket.emit("socketAPITest", 'Testing testing');
    });
    socket.on('testMessageReceived', (message) => {
        console.log("Client: testMessageReceived: ", message);
        res.sendStatus(200);
    });
    socket.onAny((message1) => {
        console.log('Client: Received this ', message1);
    });
});