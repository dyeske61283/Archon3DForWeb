"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PlayerInfo = /** @class */ (function () {
    function PlayerInfo(socketId) {
        this.message = -1;
        if (arguments.length > 0) {
            this.socketId = socketId;
        }
        else {
            this.socketId = "";
        }
        this.hasControl = false;
    }
    PlayerInfo.prototype.giveControl = function (value) {
        this.hasControl = value;
    };
    PlayerInfo.prototype.isConnected = function () {
        return this.socketId !== "";
    };
    return PlayerInfo;
}());
exports.PlayerInfo = PlayerInfo;
//# sourceMappingURL=PlayerInfo.js.map