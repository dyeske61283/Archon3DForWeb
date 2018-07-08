"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClientAdapter_1 = require("./ClientAdapter");
var ClientController_1 = require("./ClientController");
var ViewBuilder_1 = require("./ViewBuilder");
var Cursor_1 = require("./Cursor");
var ClientFabrik = /** @class */ (function () {
    function ClientFabrik() {
    }
    ClientFabrik.prototype.createClientAdapter = function (socket, client) {
        return new ClientAdapter_1.ClientAdapter(socket, client);
    };
    ClientFabrik.prototype.createClientController = function (socket) {
        return new ClientController_1.ClientController(socket);
    };
    ClientFabrik.prototype.createCursor = function () {
        var cInfo = { pos: [5, 5], enabled: false, board: undefined, selectedFigure: undefined };
        return new Cursor_1.Cursor(cInfo);
    };
    ClientFabrik.prototype.createViewBuilder = function () {
        return new ViewBuilder_1.ViewBuilder();
    };
    return ClientFabrik;
}());
exports.ClientFabrik = ClientFabrik;
//# sourceMappingURL=ClientFabrik.js.map