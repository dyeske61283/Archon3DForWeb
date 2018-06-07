"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ServerController_1 = require("./implementations/ServerController");
var ServerAdapter_1 = require("./implementations/ServerAdapter");
var GameModel_1 = require("./implementations/GameModel");
var Fabrik = /** @class */ (function () {
    function Fabrik() {
    }
    Fabrik.createServerController = function (model, p1, p2) {
        return new ServerController_1.ServerController(model, p1, p2);
    };
    Fabrik.createServerAdapter = function (model, p1, p2, server) {
        return new ServerAdapter_1.ServerAdapter(server, p1, p2, model);
    };
    Fabrik.createModel = function () {
        return new GameModel_1.GameModel();
    };
    return Fabrik;
}());
exports.Fabrik = Fabrik;
//# sourceMappingURL=serverFabrik.js.map