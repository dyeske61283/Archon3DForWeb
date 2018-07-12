"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Player = /** @class */ (function () {
    function Player(info) {
        this._info = info;
    }
    Player.prototype.placeSettings = function (settings, figures) {
        this._info.figureColor = settings.color;
        this._info.hasControl = settings.color === settings.colorFirst;
        this._info.figures = figures;
    };
    Player.prototype.checkForLoss = function () {
        return this._info.figures.length === 0;
    };
    Player.prototype.activateControl = function () {
        this._info.hasControl = true;
    };
    Player.prototype.deactivateControl = function () {
        this._info.hasControl = false;
    };
    Player.prototype.getInfo = function () {
        return this._info;
    };
    Player.prototype.injectSocket = function (socket) {
        this._info.socket = socket;
    };
    return Player;
}());
exports.Player = Player;
//# sourceMappingURL=Player.js.map