"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PlayerInfo_1 = require("./PlayerInfo");
var overlayMessages_1 = require("./overlayMessages");
var GameServer = /** @class */ (function () {
    function GameServer() {
        this.players = [];
        this.playerConnections = 0;
        this.maxPlayers = 2;
        this.turns = 0;
        this.colorIndex = 3;
        this.colorDir = 1;
    }
    GameServer.prototype.whoGoesFirst = function (p) {
        throw new Error("Method not implemented.");
    };
    GameServer.prototype.setColorForPlayer = function (p, c) {
        throw new Error("Method not implemented.");
    };
    GameServer.prototype.nextAction = function () {
    };
    GameServer.prototype.newPlayerConnected = function (socketId) {
        if (this.playerConnections < this.maxPlayers) {
            for (var i = 0; i < this.maxPlayers; i++) {
                if (this.players[i] === undefined) {
                    this.players[this.playerConnections] = new PlayerInfo_1.PlayerInfo(socketId);
                }
            }
            this.playerConnections++;
        }
        else {
            return overlayMessages_1.MsgTypes.TooManyPlayers;
        }
        switch (this.playerConnections) {
            case 1:
                return overlayMessages_1.MsgTypes.Player1Connected;
            case 2:
                return overlayMessages_1.MsgTypes.Player2Connected;
            default:
                return overlayMessages_1.MsgTypes.TooManyPlayers;
        }
    };
    GameServer.prototype.playerDisconnected = function (socketId) {
        for (var i = 0; i < this.maxPlayers; i++) {
            if (this.players[i] !== undefined && this.players[i].socketId === socketId) {
                this.playerConnections--;
                this.players[i] = undefined;
                if (i === 0) {
                    return overlayMessages_1.MsgTypes.Player1Disconnected;
                }
                else {
                    return overlayMessages_1.MsgTypes.Player2Disconnected;
                }
            }
        }
        return undefined;
    };
    GameServer.prototype.initGame = function () {
    };
    GameServer.prototype.allowSettings = function (n) {
    };
    GameServer.prototype.giveControlToPlayer = function (n) {
    };
    GameServer.prototype.resetGame = function () {
    };
    return GameServer;
}());
exports.GameServer = GameServer;
//# sourceMappingURL=GameServer.js.map