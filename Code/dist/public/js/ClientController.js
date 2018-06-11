"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClientController = /** @class */ (function () {
    function ClientController(socket) {
        this._socket = socket;
        this.registerEvents();
    }
    ClientController.prototype.registerEvents = function () {
        var btns = $("button");
        btns.click(this.handleInput);
        // $(document.body).keyup(this.handleInput);
    };
    ClientController.prototype.registerCommands = function () {
    };
    ClientController.prototype.handleInput = function (ev) {
        var component = ev.target;
        console.log("button pressed: ", component.id);
        // command execute
        switch (component.id) {
            case "btnColorFirst":
                this._model.settings().colorFirst = !this._model.settings().colorFirst;
                break;
            case "btnOwnColor":
                this._model.settings().color = !this._model.settings().color;
                break;
            case "btnSettingsDone":
                console.log("am I reaching the call?");
                this.settingsDone();
                break;
            default:
                console.log("This is the default switch-statement");
        }
    };
    ClientController.prototype.turnFinished = function () {
        // disable control
        this._socket.emit("turn finished");
    };
    ClientController.prototype.settingsDone = function () {
        console.log("sending settings to server");
        this._socket.emit("settings", this._model.settings());
    };
    return ClientController;
}());
exports.ClientController = ClientController;
//# sourceMappingURL=ClientController.js.map