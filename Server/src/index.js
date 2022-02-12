const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { game } = require("./game");
const { player } = require("./player");
const { makeID } = require("./utilities");
const { db } = require("./db");
const { environment } = require("./environment");

const app = express();
const httpServer = createServer(app);
export const io = new Server(httpServer, { /* options */ });
export const db = new db();
export const environment = new environment();

const activeGames = []; // List of game

io.on("connection", (socket) => {
    socket.send('ConnectionEstablished');
    socket.on('SocketAPITest', (testMessage) => {
        socket.send('TestMessageReceived', testMessage);
    })
    return;
    const { inviteCode, userName, asHost } = socket.handshake.query;
    const game = activeGames.find(g => g.inviteCode === inviteCode);
    if (asHost && game.hostIP !== socket.remoteAddress)
        throw new Error('Tried connecting as host, but the IP did not match');
    game.addPlayer(new player(socket, userName), asHost);
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
    const newGame = new game(req.socket.remoteAddress, inviteCode);
    this.activeGames.push(newGame);
    res.status(200).send({inviteCode: inviteCode});
});

// Join game

// Rejoin game

// Start next round

// 

app.get('ProofOfConceptGetTest', (req, res) => {
    res.status(200).send('All good');
});

app.post('ProofOfConceptPostTest', (req, res) => {
    res.status(200).send('Received ' + req.body);
})