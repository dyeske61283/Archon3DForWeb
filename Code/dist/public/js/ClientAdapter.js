"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClientAdapter = /** @class */ (function () {
    function ClientAdapter(socket) {
        this._socket = socket;
    }
    ClientAdapter.prototype.registerListeners = function () {
        this._socket.on("boardUpdate", this.boardUpdate);
    };
    ClientAdapter.prototype.boardUpdate = function (info) {
        console.log("Got updated BoardInfo: " + info);
    };
    ClientAdapter.prototype.settingsUpdate = function (info) {
        console.log("Got updated SettingsInfo: " + info);
    };
    ClientAdapter.prototype.playerUpdate = function (info) {
        console.log("Got updated PlayerInfo" + info);
    };
    return ClientAdapter;
}());
exports.ClientAdapter = ClientAdapter;
//# sourceMappingURL=ClientAdapter.js.map