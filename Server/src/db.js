import { environment } from '.';
const Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;

export class db {
    config;

    constructor() {
        this.config = {  
            server: 'quiz-game.database.windows.net',
            authentication: {
                type: 'default',
                options: {
                    userName: environment.dbUserName,
                    password: environment.dbPassword
                }
            },
            options: {
                // If you are on Microsoft Azure, you need encryption:
                encrypt: true,
                database: 'quiz-game'
            }
        };  
    }

    async addGame(guid, invitationCode, hostIP) {
        return new Promise<string>((resolve) => {
            let gameID;

            const connection = new Connection(config);
            const request = new Request("INSERT quiz-game.Game (GameGUID, InvitationCode, HostPlayerIP, CreationTime) OUTPUT INSERTED.ID VALUES (@GameGUID, @InvitationCode, @HostIP, CURRENT_TIMESTAMP);", function(err) { 
                if (err) {  
                    console.log(err);
                }  
            });
            request.addParameter('GameGUID', TYPES.NVarChar, guid);
            request.addParameter('InvitationCode', TYPES.NVarChar, invitationCode);
            request.addParameter('HostIP', TYPES.NVarChar, hostIP);
            request.on('row', function(columns) {
                gameID = columns[0].value;
            });
    
            request.on("requestCompleted", function (rowCount, more) {
                connection.close();
                resolve(gameID);
            });
            connection.execSql(request);
        });
    }

    addPlayer(gameID, userName, IP) {
        return new Promise<string>((resolve) => {
            let playerID;

            const connection = new Connection(config);
            const request = new Request("INSERT quiz-game.Player (GameID, UserName, IP) OUTPUT INSERTED.ID VALUES (@GameID, @UserName, @IP);", function(err) { 
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
    
            request.on("requestCompleted", function (rowCount, more) {
                connection.close();
                resolve(playerID);
            });
            connection.execSql(request);
        });
    }

    executeStatement() {
        const connection = new Connection(config);
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
        const connection = new Connection(config);
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