const Game = require('./game');
const Environment = require('./environment');
const Player = require('./player');
const Question = require('./question');
const Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;

class Db {
    config;

    constructor() {
        this.config = {  
            server: 'quiz-game.database.windows.net',
            authentication: {
                type: 'default',
                options: {
                    userName: Environment.dbUserName,
                    password: Environment.dbPassword
                }
            },
            options: {
                // If you are on Microsoft Azure, you need encryption:
                encrypt: true,
                database: 'quiz-game'
            }
        };  
    }

    static createNew() {
        return new Db();
    }

    establishConnection(request) {
        const connection = new Connection(this.config);
        connection.on('connect', function(err) {  
            if (err)
                console.log('Connection error ', err);
            connection.execSql(request);
        });
        connection.connect();
        return connection;
    }

    async addGame(guid, invitationCode, hostIP) {
        return new Promise((resolve, reject) => {
            let gameID;
            const request = new Request("INSERT Game (GameGUID, InvitationCode, HostPlayerIP, CreationTime) OUTPUT INSERTED.ID VALUES (@GameGUID, @InvitationCode, @HostIP, CURRENT_TIMESTAMP);", function(err) { 
                if (err) {  
                    console.log(err);
                    reject(err);
                }  
            });
            request.addParameter('GameGUID', TYPES.NVarChar, guid);
            request.addParameter('InvitationCode', TYPES.NVarChar, invitationCode);
            request.addParameter('HostIP', TYPES.NVarChar, hostIP);
            request.on('row', function(columns) {
                gameID = columns[0].value;
            });
    
            const connection = this.establishConnection(request);
            request.on("requestCompleted", function (rowCount, more) {
                connection.close();
                resolve(gameID);
            });
        });
    }

    async getGame(gameID) {
        console.log('Getting game ', gameID);
        return new Promise((resolve, reject) => {
            const request = new Request("SELECT top(1) ID, InvitationCode, HostPlayerIP, CreationTime FROM Game WHERE ID = " + gameID, function(err) {  
                if (err) {  
                    console.log(err);
                    reject(err);
                }
            });
            const game = new Game(null, null);
            request.on('row', function(columns) {
                game.gameID = columns[0].value;
                game.inviteCode = columns[1].value;
                game.hostIP = columns[2].value;
                game.creationTime = columns[3].value;
            });
            const connection = this.establishConnection(request);
            request.on("requestCompleted", function (rowCount, more) {
                connection.close();
                resolve(game);
            });
        });
    }

    async getQuestions() {
        console.log('Getting questions');
        return new Promise((resolve, reject) => {
            const request = new Request("SELECT OrderIndex, Question, Option1, Option2, Option3, Option4 FROM Question ORDER BY OrderIndex", function(err) {  
                if (err) {  
                    console.log(err);
                    reject(err);
                }
            });
            const questions = [];
            request.on('row', function(columns) {
                const question = new Question();
                question.order = columns[0].value;
                question.text = columns[1].value;
                question.option1 = columns[2].value;
                question.option2 = columns[3].value;
                question.option3 = columns[4].value;
                question.option4 = columns[5].value;
                questions.push(question);
            });
            const connection = this.establishConnection(request);
            request.on("requestCompleted", function (rowCount, more) {
                connection.close();
                resolve(questions);
            });
        });
    }

    async addPlayer(gameID, userName, IP) {
        return new Promise((resolve) => {
            let playerID;

            const request = new Request("INSERT Player (GameID, UserName, IP) OUTPUT INSERTED.ID VALUES (@GameID, @UserName, @IP);", function(err) { 
                if (err) {  
                    console.log(err);
                }  
            });
            request.addParameter('GameID', TYPES.Int, gameID);
            request.addParameter('UserName', TYPES.NVarChar, userName);
            request.addParameter('IP', TYPES.NVarChar, IP);
            request.on('row', function(columns) {
                playerID = columns[0].value;
            });
    
            const connection = this.establishConnection(request);
            request.on("requestCompleted", function (rowCount, more) {
                connection.close();
                resolve(playerID);
            });
        });
    }

    async getPlayerByIP(socket, ip, gameID) {
        console.log('Getting player ', gameID, ip);
        return new Promise((resolve, reject) => {
            const request = new Request("SELECT top(1) ID, UserName FROM Player WHERE IP = '" + ip + "' AND GameID = " + gameID, function(err) {  
                if (err) {  
                    console.log(err);
                    reject(err);
                }
            });
            const player = new Player(socket, null, ip);
            request.on('row', function(columns) {
                player.playerID = columns[0].value;
                player.userName = columns[1].value;
            });
            const connection = this.establishConnection(request);
            request.on("requestCompleted", function (rowCount, more) {
                connection.close();
                resolve(player);
            });
        });
    }

    // Template boilerplate
    executeStatement() {
        const connection = new Connection(this.config);
        connection.on('connect', function(err) {  
            // If no error, then good to proceed.
            console.log("Connected");
        });
         connection.connect();
        const request = new Request("SELECT c.CustomerID, c.CompanyName,COUNT(soh.SalesOrderID) AS OrderCount FROM SalesLT.Customer AS c LEFT OUTER JOIN SalesLT.SalesOrderHeader AS soh ON c.CustomerID = soh.CustomerID GROUP BY c.CustomerID, c.CompanyName ORDER BY OrderCount DESC;", function(err) {  
            if (err) {  
                console.log(err);
            }  
        });  
        var result = "";  
        request.on('row', function(columns) {  
            columns.forEach(function(column) {  
              if (column.value === null) {  
                console.log('NULL');  
              } else {  
                result+= column.value + " ";  
              }  
            });  
            console.log(result);  
            result ="";  
        });  
  
        request.on('done', function(rowCount, more) {  
            console.log(rowCount + ' rows returned');  
        });  
        
        // Close the connection after the final event emitted by the request, after the callback passes
        request.on("requestCompleted", function (rowCount, more) {
            connection.close();
        });
        connection.execSql(request);  
    }

    executeStatement1() {  
        const connection = new Connection(this.config);
        connection.on('connect', function(err) {  
            // If no error, then good to proceed.
            console.log("Connected");
        });
        const request = new Request("INSERT SalesLT.Product (Name, ProductNumber, StandardCost, ListPrice, SellStartDate) OUTPUT INSERTED.ProductID VALUES (@Name, @Number, @Cost, @Price, CURRENT_TIMESTAMP);", function(err) {  
         if (err) {  
            console.log(err);}
        });  
        request.addParameter('Name', TYPES.NVarChar,'SQL Server Express 2014');  
        request.addParameter('Number', TYPES.NVarChar , 'SQLEXPRESS2014');  
        request.addParameter('Cost', TYPES.Int, 11);  
        request.addParameter('Price', TYPES.Int,11);  
        request.on('row', function(columns) {  
            columns.forEach(function(column) {  
              if (column.value === null) {  
                console.log('NULL');  
              } else {  
                console.log("Product id of inserted item is " + column.value);  
              }  
            });  
        });

        // Close the connection after the final event emitted by the request, after the callback passes
        request.on("requestCompleted", function (rowCount, more) {
            connection.close();
        });
        connection.execSql(request);
    }
}

module.exports = Db;