"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClientController = /** @class */ (function () {
    function ClientController(socket) {
        this._socket = socket;
    }
    ClientController.prototype.registerEvents = function () {
        throw new Error("Method not implemented.");
    };
    ClientController.prototype.registerCommands = function () {
        $(document.body).keyup(this.handleInput);
    };
    ClientController.prototype.handleInput = function () {
    };
    ClientController.prototype.turnFinished = function () {
        // disable control
        this._socket.emit("turn finished");
    };
    return ClientController;
}());
exports.ClientController = ClientController;
//# sourceMappingURL=ClientController.js.map