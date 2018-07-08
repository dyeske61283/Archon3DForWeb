"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ServerController_1 = require("./implementations/ServerController");
var ServerAdapter_1 = require("./implementations/ServerAdapter");
var GameModel_1 = require("./implementations/GameModel");
var Fabrik = /** @class */ (function () {
    function Fabrik() {
    }
    Fabrik.createServerController = function (model) {
        if (this.readyToCreate())
            return new ServerController_1.ServerController(model, this._sockets[0], this._sockets[1]);
        return undefined;
    };
    Fabrik.createServerAdapter = function (model, server) {
        if (this.readyToCreate())
            return new ServerAdapter_1.ServerAdapter(server, this._sockets[0], this._sockets[1], model);
        else
            return undefined;
    };
    Fabrik.createModel = function (builder) {
        return new GameModel_1.GameModel(builder);
    };
    Fabrik.provideSocket = function (socket) {
        if (this._sockets.length < 2) {
            this._sockets.push(socket);
        }
    };
    Fabrik.readyToCreate = function () {
        return this._sockets.length === 2;
    };
    Fabrik.resetSockets = function () {
        this._sockets.length = 0;
    };
    Fabrik._sockets = [];
    return Fabrik;
}());
exports.Fabrik = Fabrik;
//# sourceMappingURL=serverFabrik.js.map