const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const Player = require("./player");
const { makeID, getIPFromHttp } = require("./utilities");
const Db = require("./db");
const Game = require("./game");
const cors = require('cors')
const path = require('path');
const app = express();
app.use(express.json());

// view engine setup and add default page (mostly used for debugging deploy issues)
var indexRouter = require('../routes/index');
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');
app.use('/', indexRouter);
app.use(cors());



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
module.exports = { io };

const activeGames = []; // List of game

io.on("connection", async (socket) => {
    console.log('Server connected with socket ');
    socket.on('socketAPITest', (testMessage) => {
        console.log('Server: Received socketAPITest. Sending TestMessageReceived');
        socket.emit('testMessageReceived', testMessage);
    });
    const { inviteCode, ip } = socket.handshake.query; // userName
    console.log('Server: Connected with these args ', inviteCode, ip);
    const game = activeGames.find(g => g.inviteCode === inviteCode);
    if (!!game) {
        console.log('Server: Found game');
        /*let player = await db.getPlayerByIP(socket, ip ?? socket.remoteAddress, game.gameID);
        if (!player?.playerID) {
            const playerID = await db.addPlayer(game.gameID, userName, ip ?? socket.remoteAddress);
            console.log('Added player to db with id ', playerID);
            player = new Player(socket, userName);
            player.playerID = playerID;
        }
        else
            player.socket = socket;*/
        const asHost = game.hostIP === (ip ?? socket.remoteAddress);
        if (asHost) {
            const player = new Player(socket, 'Bjørn Vinther', ip);
            game.addPlayer(player, asHost);
        } else {
            const player = await db.getPlayerByIP(socket, ip ?? socket.remoteAddress, game.gameID);
            if (!game.players.some(p => p.playerID === player.playerID))
                game.addPlayer(player, false);
        }
    } else
        console.log('No game found with invite code ', inviteCode);
});

app.get('/test', (req, res) => {
    console.log('Body', req.body);
    const { myString } = req.body;
    res.status(200).send('All good! ' + myString);
});

app.post('/hostNewGame', async (req, res) => {
    const inviteCode = makeID(6);
    let { ip } = req.body;
    ip = ip || getIPFromHttp(req);
    const newGame = new Game(ip, inviteCode);
    const gameID = await db.addGame(newGame.gameGuid, inviteCode, ip);
    newGame.gameID = gameID;
    console.log('Created game with gameID ', gameID);
    activeGames.push(newGame);
    res.status(200).send({ inviteCode: inviteCode });
});

app.post('/getGameState', (req, res) => {
    const { inviteCode } = req.body;
    const game = activeGames.find(g => g.inviteCode === inviteCode);
    console.log('Found game ', game, inviteCode);
    return game.getGameStateSnapshot();
});

app.post('/joinGame', async (req, res) => {
    const { inviteCode, userName, ip } = req.body;
    const game = activeGames.find(g => g.inviteCode === inviteCode);
    if (!!game) {
        console.log('Adding player with username ', userName);
        await db.addPlayer(game.gameID, userName, ip ?? socket.remoteAddress);
        game.notifyPlayerJoined(userName, ip);
        /*console.log('Added player to db with id ', playerID);
        const player = new Player(socket, userName);
        player.playerID = playerID;
        game.addPlayer(player, false);*/
    } else
        console.log('No game found with invite code ', inviteCode);
    res.sendStatus(200);
});

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
    const socket = ioClient.connect('http://localhost:4000');
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

app.get('/testGameFlow', async (req, res) => {
    console.log('Testing game flow');
    const axios = require('axios');
    const port = process.env.PORT || 4000;

    const result = await axios.post('http://localhost:'+port+'/hostNewGame', {
        ip: '123.456.78.89'
    });
    const inviteCode = result.data.inviteCode;
    console.log('Hosted game with invite code ', inviteCode);

    const hostIoClient = require('socket.io-client');
    const hostSocket = hostIoClient.connect('http://localhost:'+port+'?inviteCode='+inviteCode+'&ip=123.456.78.89'); // &userName=test123
    hostSocket.on('connect', () => {
        console.log('Host connected');
    });
    hostSocket.on('gameStateUpdated', (state) => {
        console.log('Host received this game state update ', state);
    });
    let playerCount = 1;
    hostSocket.on('playerJoined', (player) => {
        console.log('Host: Player joined! ', player);
        playerCount++;
        if (playerCount === 4) {
            console.log('Host starting round');
            setTimeout(() => hostSocket.emit('startNextRound', 3000), 2000);
        }
    })
    hostSocket.on('roundQuestionReady', question => {
        console.log('Host: Round question ready ', question);
    });
    hostSocket.on('roundAnswerChoicesReady ', choices => {
        console.log('Host: Round answer choices ready ', choices);
    });
    let counter = 0;
    let gameEnded = false;
    hostSocket.on('turnResultReady', result => {
        console.log('Host: received turn results ', result);
        counter++;
        if (counter === 16) {
            hostSocket.emit('showFinalResuts');
        } else if (!gameEnded) {
            hostSocket.emit('startNextRound', 3000);
        }
    });
    hostSocket.on('gameEnded', () => {
        console.log('Host: game ended');
        this.gameEnded = true;
    });

    const userNames = ['randomUser123', 'funnyGuy1337', 'basementDweller42', 'test'];
    const ips = ['1234', '5678', '9876', '5412'];
    for (let i=0; i<4; i++) {
        await axios.post('http://localhost:'+port+'/joinGame', {
            inviteCode: inviteCode,
            userName: userNames[i],
            ip: ips[i]
        });
        const ioClient = require('socket.io-client');
        const socket = ioClient.connect('http://localhost:'+4000+'?inviteCode='+inviteCode+'&ip='+ips[i]); // +'&userName='+userNames[i]
        socket.on('connect', () => {
            console.log('Player connected with user name ', userNames[i]);
        });
        socket.on('playerJoined', (player) => {
            console.log(userNames[i] + ' player joined ', player);
        });
        socket.on('roundQuestionReady', question => {
            console.log(userNames[i] + ' received question ' + question);
            const answerIndex = Math.floor(Math.random() * 4);
            socket.emit('submitAnswer', answerIndex);
        });
        socket.on('roundAnswerChoicesReady', () => {
            
            console.log(userNames[i] + ' answered ' + answerIndex);
        });
    }
});