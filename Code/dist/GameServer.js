"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PlayerInfo_1 = require("./PlayerInfo");
var overlayMessages_1 = require("./overlayMessages");
var GameServer = /** @class */ (function () {
    function GameServer(socketServer) {
        this.players = [];
        this.playerConnections = 0;
        this.maxPlayers = 2;
        this.turns = 0;
        this.gameReady = false;
        this.colorIndex = 3;
        this.colorDir = 1;
        this.messagePlayer = undefined;
        this.openMessages = false;
        this.messages = new overlayMessages_1.OverlayMessages();
        this.messagePlayer = [];
        this.socketServer = socketServer;
        this.socketServer.on("connection", this.newPlayerConnected);
    }
    GameServer.prototype.whoGoesFirst = function (p) {
        this.players[p].goesFirst = true;
    };
    GameServer.prototype.setColorForPlayer = function (p, c) {
        this.players[p].figureColor = c;
    };
    GameServer.prototype.sendMessage = function (type, socket) {
        var msg = this.messages.getMessageByType(type);
        if (msg !== "") {
            socket.emit("playerMsg", msg);
        }
    };
    GameServer.prototype.newPlayerConnected = function (socket) {
        var _this = this;
        var msg;
        if (this.playerConnections === this.maxPlayers) {
            // reject
            msg = overlayMessages_1.MsgTypes.TooManyPlayers;
        }
        else {
            this.players[this.playerConnections] = new PlayerInfo_1.PlayerInfo(socket.id);
            socket.on("disconnect", function () {
                if (_this.playerConnections === 2) {
                    if (socket.id === _this.players[1].socketId) {
                        _this.players.splice(1, 1);
                        _this.players[0].message = overlayMessages_1.MsgTypes.Player2Disconnected;
                    }
                    else {
                        _this.players.splice(0, 1, _this.players[1]);
                        _this.players.splice(1, 1);
                        _this.players[0].message = overlayMessages_1.MsgTypes.Player1Disconnected;
                    }
                    _this.openMessages = true;
                }
                else {
                    _this.players.splice(0, 1);
                }
                if (_this.openMessages) {
                    _this.sendMessage(_this.players[0].message, _this.socketServer.sockets.connected[_this.players[0].socketId]);
                }
            });
            if (this.playerConnections === 1) {
                this.players[this.playerConnections].message = overlayMessages_1.MsgTypes.Player1Connected;
                msg = overlayMessages_1.MsgTypes.Player1Connected;
            }
            else {
                this.players[0].message = overlayMessages_1.MsgTypes.MakeSettings;
                msg = overlayMessages_1.MsgTypes.Player2Connected;
                this.openMessages = true;
            }
            this.playerConnections++;
        }
        this.sendMessage(msg, socket);
        if (this.openMessages) {
            this.sendMessage(this.players[0].message, this.socketServer.sockets.connected[this.players[0].socketId]);
        }
    };
    GameServer.prototype.initGame = function () {
    };
    GameServer.prototype.updateSettings = function (goingFirst, color) {
        this.whoGoesFirst(goingFirst);
        this.setColorForPlayer(goingFirst, color);
        this.setColorForPlayer(1 - goingFirst, !color);
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