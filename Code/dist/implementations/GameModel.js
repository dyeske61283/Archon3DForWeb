"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Board_1 = require("./Board");
var Player_1 = require("./Player");
var GameModel = /** @class */ (function () {
    function GameModel(builder) {
        this._builder = builder;
        this.init();
    }
    GameModel.prototype.players = function () {
        return [this._Players[0].getInfo(), this._Players[1].getInfo()];
    };
    GameModel.prototype.settings = function () {
        return this._settings;
    };
    GameModel.prototype.board = function () {
        return this._Board.getInfo();
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
        var tmp = [];
        this._Spells.forEach(function (value) {
            tmp.push(value.getInfo());
        });
        return tmp;
    };
    GameModel.prototype.elementals = function () {
        return this._elementals;
    };
    GameModel.prototype.defeatedWhiteFigures = function () {
        return this._defeatedFiguresWhite;
    };
    GameModel.prototype.setSettings = function (settings) {
        console.log("setSettings called with: " + JSON.stringify(settings));
        this._settings = settings;
        this.notify(this._settings, "settingsChanged");
        // update board tiles
        this._Board.placeSettings(settings);
        this.notify(this._Board.getInfo(), "boardChanged");
        // update PlayerInfo
        if (settings.color) {
            this._Players[0].placeSettings(settings, this._whiteFigures);
            settings.color = !settings.color;
            this._Players[1].placeSettings(settings, this._blackFigures);
        }
        else {
            this._Players[0].placeSettings(settings, this._blackFigures);
            settings.color = !settings.color;
            this._Players[1].placeSettings(settings, this._whiteFigures);
        }
        this.setPlayer(this._Players[0].getInfo(), 0);
        this.setPlayer(this._Players[1].getInfo(), 1);
        // show board, start rendering loop
        // hand out figures
        this.notify(undefined, "handOutFigures");
    };
    GameModel.prototype.setPlayer = function (p, index) {
        // console.log("setPlayer called with: " + JSON.stringify(p) + " and " + index);
        this._players[index] = p;
        this.notify(this._players[index], "playerChanged" + index);
    };
    GameModel.prototype.startTurns = function () {
        console.log("startTurns called");
        this.notify(undefined, "startTurn");
    };
    GameModel.prototype.turnChange = function () {
        var p1 = this._Players[0].getInfo();
        var p2 = this._Players[1].getInfo();
        var first = p1.figureColor === this._settings.colorFirst;
        if (p1.hasControl) {
            this._Players[0].deactivateControl();
            this._Players[1].activateControl();
        }
        else {
            this._Players[0].activateControl();
            this._Players[1].deactivateControl();
        }
        // check for board update
        if (p1.hasControl === first) {
            this._Board.changeColor();
            this.notify(this._board, "boardChanged");
        }
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
        var _this = this;
        this._players = [];
        this._observers = [];
        this._defeatedFiguresBlack = [];
        this._defeatedFiguresWhite = [];
        this._Spells = [];
        this._settings = this._builder.buildSettings();
        this._board = this._builder.buildBoard();
        this._Board = new Board_1.Board(this._board);
        this._actionField = this._builder.buildActionBoard();
        this._players.push(this._builder.buildPlayer());
        this._players.push(this._builder.buildPlayer());
        this._Players = [new Player_1.Player(this._players[0]), new Player_1.Player(this._players[1])];
        this._blackFigures = this._builder.buildFigureBlack();
        this._blackFigures.forEach(function (value) {
            value.field = _this._Board.getFieldByIndex(value.pos[0], value.pos[1]);
        });
        this._whiteFigures = this._builder.buildFiguresWhite();
        this._whiteFigures.forEach(function (value) {
            value.field = _this._Board.getFieldByIndex(value.pos[0], value.pos[1]);
        });
        this._elementals = this._builder.buildElementals();
    };
    return GameModel;
}());
exports.GameModel = GameModel;
//# sourceMappingURL=GameModel.js.map