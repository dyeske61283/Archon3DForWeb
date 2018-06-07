"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameModel = /** @class */ (function () {
    function GameModel() {
        this._players = [];
        this._observers = [];
        this._settings = { color: false, colorFirst: false };
    }
    GameModel.prototype.players = function () {
        return this._players;
    };
    GameModel.prototype.settings = function () {
        return this._settings;
    };
    GameModel.prototype.setSettings = function (settings) {
        this._settings = settings;
        this.notify(this._settings, "settingsChanged");
    };
    GameModel.prototype.setPlayer = function (p, index) {
        this._players[index] = p;
        this.notify(this._players[index], "playerChanged");
    };
    GameModel.prototype.addObserver = function (o) {
        this._observers.push(o);
    };
    GameModel.prototype.removeObserver = function (o) {
        this._observers = this._observers.filter(function (item) { return item !== o; });
    };
    GameModel.prototype.notify = function (entity, event) {
        this._observers.forEach(function (item) { return item.onNotify(entity, event); });
    };
    return GameModel;
}());
exports.GameModel = GameModel;
//# sourceMappingURL=GameModel.js.map