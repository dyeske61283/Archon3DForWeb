"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameServer = /** @class */ (function () {
    function GameServer() {
        this.turns = 0;
        this.colorIndex = 3;
        this.colorDir = 1;
    }
    Object.defineProperty(GameServer.prototype, "Socket", {
        set: function (socket) {
            this.socket = socket;
        },
        enumerable: true,
        configurable: true
    });
    GameServer.prototype.nextTurn = function (socket) {
        this.turns++;
        console.log("executing next Turn: " + this.turns);
        if ((this.turns % 2) === 0) {
            console.log("sending color change event");
            socket.emit("colorChange", this.colorIndex);
            if (this.colorIndex == 5) {
                this.colorDir = -1;
            }
            if (this.colorIndex == 0) {
                this.colorDir = 1;
            }
            this.colorIndex += this.colorDir;
        }
    };
    return GameServer;
}());
exports.GameServer = GameServer;
//# sourceMappingURL=GameServer.js.map