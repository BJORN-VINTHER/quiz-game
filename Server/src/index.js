const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const Player = require("./player");
const { makeID, getIPFromHttp } = require("./utilities");
const Db = require("./db");
const Game = require("./game");
var path = require('path');
const app = express();
app.use(express.json());

// view engine setup and add default page (mostly used for debugging deploy issues)
var indexRouter = require('../routes/index');
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');
app.use('/', indexRouter);




app.get('/test', (req, res) => {
    res.send('HTTP response with Hello!');
});

// Listen to the App Engine-specified port, or 8080 otherwise
const httpServer = createServer(app);
const PORT = process.env.PORT || 4000;
app.set('port', PORT);
httpServer.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});

// Global variables
const io = new Server(httpServer, { cors: { origin: '*'} });
const db = new Db();
module.exports = { io, db };

const activeGames = []; // List of game

io.on("connection", async (socket) => {
    console.log('Server connected with socket ', socket);
    socket.on('socketAPITest', (testMessage) => {
        console.log('Server: Received socketAPITest. Sending TestMessageReceived');
        socket.emit('testMessageReceived', testMessage);
    });
    const { inviteCode, userName, asHost } = socket.handshake.query;
    const game = activeGames.find(g => g.inviteCode === inviteCode);
    if (asHost && game.hostIP !== socket.remoteAddress)
        throw new Error('Tried connecting as host, but the IP did not match. Got: ' + socket.remoteAddress);
    if (!!game) {
        let player = await db.getPlayerByIP(socket.remoteAddress, game.GameID);
        if (!player) {
            const playerID = db.addPlayer(game.gameID, userName, socket.remoteAddress);
            player = new Player(socket, userName);
            player.playerID = playerID;
        }
        else
            player.socket = socket;
        game.addPlayer(player, asHost);
    }
    else
        console.log('No game found with invite code ', inviteCode);
});

app.get('/test', (req, res) => {
    console.log('Body', req.body);
    const { myString } = req.body;
    res.status(200).send('All good! ' + myString);
});

app.post('/hostNewGame', async (req, res) => {
    const inviteCode = makeID(6);
    const ip = getIPFromHttp(req);
    const newGame = new Game(ip, inviteCode);
    const gameID = await db.addGame(newGame.gameGuid, inviteCode, ip);
    newGame.gameID = gameID;
    this.activeGames.push(newGame);
    res.status(200).send({ inviteCode: inviteCode });
});

// Join game

// Rejoin game



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
    res.status(200).send({ GameID: gameID });
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