"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Client = /** @class */ (function () {
    function Client(fabrik, socket) {
        this._adapter = fabrik.createClientAdapter(socket);
        this._controller = fabrik.createClientController(socket);
        this._viewBuilder = fabrik.createViewBuilder();
    }
    Client.prototype.getAdapter = function () {
        return this._adapter;
    };
    Client.prototype.getController = function () {
        return this._controller;
    };
    Client.prototype.getScene = function () {
    };
    return Client;
}());
exports.Client = Client;
//# sourceMappingURL=Client.js.map