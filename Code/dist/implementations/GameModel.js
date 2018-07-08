"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameModel = /** @class */ (function () {
    function GameModel(builder) {
        this._builder = builder;
        this.init();
    }
    GameModel.prototype.players = function () {
        return this._players;
    };
    GameModel.prototype.settings = function () {
        return this._settings;
    };
    GameModel.prototype.board = function () {
        return this._board;
    };
    GameModel.prototype.blackFigures = function () {
        return this._blackFigures;
    };
    GameModel.prototype.whiteFigures = function () {
        return this._whiteFigures;
    };
    GameModel.prototype.actionBoard = function () {
        return this._actionField;
    };
    GameModel.prototype.defeatedBlackFigures = function () {
        return this._defeatedFiguresBlack;
    };
    GameModel.prototype.spells = function () {
        return this._spells;
    };
    GameModel.prototype.elementals = function () {
        return this._elementals;
    };
    GameModel.prototype.defeatedWhiteFigures = function () {
        return this._defeatedFiguresWhite;
    };
    GameModel.prototype.setSettings = function (settings) {
        this._settings = settings;
        this.notify(this._settings, "settingsChanged");
        // update board tiles
        // update PlayerInfo
        // show board, start rendering loop
        // hand out figures
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
    GameModel.prototype.reset = function () {
        this.init();
    };
    GameModel.prototype.init = function () {
        this._players = [];
        this._observers = [];
        this._defeatedFiguresBlack = [];
        this._defeatedFiguresWhite = [];
        this._spells = [];
        this._settings = this._builder.buildSettings();
        this._board = this._builder.buildBoard();
        this._actionField = this._builder.buildActionBoard();
        this._players.push(this._builder.buildPlayer());
        this._players.push(this._builder.buildPlayer());
        this._blackFigures = this._builder.buildFigureBlack();
        this._whiteFigures = this._builder.buildFiguresWhite();
        this._elementals = this._builder.buildElementals();
    };
    return GameModel;
}());
exports.GameModel = GameModel;
//# sourceMappingURL=GameModel.js.map