"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ServerAdapter = /** @class */ (function () {
    function ServerAdapter(server, p1, p2, model) {
        this._players = [p1, p2];
        this._model = model;
        this._sendServer = server;
        this._sendServer.sockets.emit("PlayersReady");
        this._players[0].emit("doSettings");
    }
    ServerAdapter.prototype.model = function () {
        return this._model;
    };
    ServerAdapter.prototype.sendData = function (data, event, index) {
        this._players[index].emit(event, data);
    };
    ServerAdapter.prototype.broadcastData = function (data, event) {
        this._sendServer.emit(event, data);
    };
    ServerAdapter.prototype.onNotify = function (entity, event) {
        this.broadcastData(entity, event);
    };
    return ServerAdapter;
}());
exports.ServerAdapter = ServerAdapter;
//# sourceMappingURL=ServerAdapter.js.map