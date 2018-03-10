"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PlayerInfo = /** @class */ (function () {
    function PlayerInfo(socketId) {
        this.socketId = socketId;
        this.hasControl = false;
    }
    PlayerInfo.prototype.giveControl = function (value) {
        this.hasControl = value;
    };
    // send msg to player()
    PlayerInfo.prototype.sendMsgToPlayer = function (msg) {
    };
    return PlayerInfo;
}());
exports.PlayerInfo = PlayerInfo;
//# sourceMappingURL=PlayerInfo.js.map