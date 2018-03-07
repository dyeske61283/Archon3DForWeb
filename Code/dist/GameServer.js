"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PlayerInfo_1 = require("./PlayerInfo");
var GameServer = /** @class */ (function () {
    function GameServer() {
        this.playerConnections = 0;
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
        if (this.playerConnections > 1) {
            this.players[this.playerConnections] = new PlayerInfo_1.PlayerInfo(socketId);
            this.playerConnections++;
        }
        switch (this.playerConnections) {
            case 1:
                return "Player1";
            case 2:
                return "Player2";
            default:
                return "TooManyPlayers";
        }
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