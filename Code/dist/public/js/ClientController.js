"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClientController = /** @class */ (function () {
    function ClientController(socket) {
        this._socket = socket;
        this.registerEvents();
    }
    ClientController.prototype.registerEvents = function () {
        $("button").click(this.handleInput);
        $(document.body).keyup(this.handleInput);
    };
    ClientController.prototype.registerCommands = function () {
    };
    ClientController.prototype.handleInput = function (ev) {
        var component = ev.target;
        console.log("button {0} pressed!", component);
        // command execute
    };
    ClientController.prototype.turnFinished = function () {
        // disable control
        this._socket.emit("turn finished");
    };
    ClientController.prototype.settingsDone = function (ev) {
        this._socket.emit("settingsDone", this._model.settings);
    };
    return ClientController;
}());
exports.ClientController = ClientController;
//# sourceMappingURL=ClientController.js.map