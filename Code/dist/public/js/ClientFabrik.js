"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClientAdapter_1 = require("./ClientAdapter");
var ClientController_1 = require("./ClientController");
var ViewBuilder_1 = require("./ViewBuilder");
var ClientFabrik = /** @class */ (function () {
    function ClientFabrik() {
    }
    ClientFabrik.prototype.createClientAdapter = function (socket) {
        return new ClientAdapter_1.ClientAdapter(socket);
    };
    ClientFabrik.prototype.createClientController = function (socket) {
        return new ClientController_1.ClientController(socket);
    };
    ClientFabrik.prototype.createViewBuilder = function () {
        return new ViewBuilder_1.ViewBuilder();
    };
    return ClientFabrik;
}());
exports.ClientFabrik = ClientFabrik;
//# sourceMappingURL=ClientFabrik.js.map