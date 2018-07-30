"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ServerController = /** @class */ (function () {
    function ServerController(model, p1, p2) {
        this._playersFiguresReady = 0;
        this._model = model;
        this._p1 = p1;
        this._p2 = p2;
    }
    ServerController.prototype.registerMsgListeners = function () {
        if ((this._p1 === undefined) || (this._p2 === undefined)) {
            throw new Error("controller got not sockets provided.");
        }
        // this._p1.on("input", this.inputP1ToModel.bind(this));
        this._p1.once("settings", this.settingsToModel.bind(this));
        // this._p2.on("input", this.inputP2ToModel.bind(this));
        this._p1.on("handedFiguresOut", this.figuresHandedOut.bind(this));
        this._p2.on("handedFiguresOut", this.figuresHandedOut.bind(this));
        this._p1.on("turnFinished", this.onFinishedTurn.bind(this));
    };
    ServerController.prototype.removeMsgListeners = function () {
        this._p1.removeAllListeners();
        this._p2.removeAllListeners();
    };
    ServerController.prototype.model = function () {
        return this._model;
    };
    ServerController.prototype.inputP1ToModel = function (input) {
        console.log("passing the input event from p1 to the model: " + input);
    };
    ServerController.prototype.inputP2ToModel = function (input) {
        console.log("passing the input event from p2 to the model: " + input);
    };
    ServerController.prototype.figuresHandedOut = function () {
        // start game in giving control to one player
        this._playersFiguresReady++;
        if (this._playersFiguresReady === 2)
            this._model.startTurns();
    };
    ServerController.prototype.settingsToModel = function (settings) {
        console.log("passing the settings event to the model: " + settings.colorFirst + " " + settings.color);
        this._model.setSettings(settings);
    };
    ServerController.prototype.onFinishedTurn = function () {
    };
    return ServerController;
}());
exports.ServerController = ServerController;
//# sourceMappingURL=ServerController.js.map