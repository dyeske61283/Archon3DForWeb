"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Colors_1 = require("../informationmodel/Colors");
var fs_1 = require("fs");
var ModelBuilder = /** @class */ (function () {
    function ModelBuilder() {
    }
    ModelBuilder.prototype.buildBoard = function () {
        var maxFields = 9;
        var recentColor = Colors_1.Colors.lightgray;
        var _board = { isActive: false, fields: [] };
        for (var i = 0; i < maxFields; i++) {
            _board.fields[i] = [];
            for (var j = 0; j < maxFields; j++) {
                _board.fields[i][j] = { y: i, x: j, changeable: false, color: Colors_1.Colors.black, isPowerfield: false };
            }
        }
        // midle green lanes
        for (var j = 0; j < maxFields; j++) {
            _board.fields[j][4].changeable = true;
            _board.fields[j][4].color = recentColor;
            if (j > 0 && j < maxFields - 1) {
                _board.fields[4][j].color = recentColor;
                _board.fields[4][j].changeable = true;
            }
        }
        var z = 3;
        // other greens
        for (var i = 0; i < 4; i++) {
            _board.fields[z][i].color = recentColor;
            _board.fields[z][i].changeable = true;
            _board.fields[z][maxFields - i - 1].color = recentColor;
            _board.fields[z][maxFields - i - 1].changeable = true;
            _board.fields[maxFields - z - 1][i].color = recentColor;
            _board.fields[maxFields - z - 1][i].changeable = true;
            z--;
        }
        z = 3;
        for (var i = 0; i < 4; i++) {
            _board.fields[maxFields - i - 1][maxFields - z - 1].color = recentColor;
            _board.fields[maxFields - i - 1][maxFields - z - 1].changeable = true;
            z--;
        }
        recentColor = Colors_1.Colors.black;
        _board.fields.forEach(function (value, index) {
            value.forEach(function (value, index) {
                if (!value.changeable) {
                    value.color = recentColor;
                    if ((index !== 8 || value.y === 4) && !((value.y === 5) && (index === 7))) {
                        recentColor === Colors_1.Colors.black ? recentColor = Colors_1.Colors.white : recentColor = Colors_1.Colors.black;
                    }
                }
            });
        });
        _board.fields[0][4].isPowerfield = true;
        _board.fields[4][0].isPowerfield = true;
        _board.fields[4][4].isPowerfield = true;
        _board.fields[4][8].isPowerfield = true;
        _board.fields[8][4].isPowerfield = true;
        return _board;
    };
    ModelBuilder.prototype.buildSettings = function () {
        return { color: true, colorFirst: false };
    };
    ModelBuilder.prototype.buildFiguresWhite = function () {
        var figures;
        var actionInfos;
        actionInfos = [];
        figures = [];
        // read in json
        var content = fs_1.readFileSync("/Users/kevin/Projects/Bachelorarbeit/Archon3DForWeb/Code/src/informationmodel/WhiteFigureInfo.json", "UTF-8");
        var actionContent = fs_1.readFileSync("/Users/kevin/Projects/Bachelorarbeit/Archon3DForWeb/Code/src/informationmodel/WhiteActionFigureInfo.json", "UTF-8");
        // fill array with objects
        figures = JSON.parse(content.toString());
        actionInfos = JSON.parse(actionContent.toString());
        figures.forEach(function (value, index) {
            value.actionInfo = actionInfos[index];
        });
        return figures;
    };
    ModelBuilder.prototype.buildFigureBlack = function () {
        var figures;
        var actionInfos;
        actionInfos = [];
        figures = [];
        // read in json
        var content = fs_1.readFileSync("/Users/kevin/Projects/Bachelorarbeit/Archon3DForWeb/Code/src/informationmodel/BlackFigureInfo.json", "UTF-8");
        var actionContent = fs_1.readFileSync("/Users/kevin/Projects/Bachelorarbeit/Archon3DForWeb/Code/src/informationmodel/BlackActionFigureInfo.json", "UTF-8");
        // fill array with objects
        figures = JSON.parse(content.toString());
        actionInfos = JSON.parse(actionContent.toString());
        figures.forEach(function (value, index) {
            value.actionInfo = actionInfos[index];
        });
        return figures;
    };
    ModelBuilder.prototype.buildElementals = function () {
        var elementals;
        elementals = [];
        var content = fs_1.readFileSync("/Users/kevin/Projects/Bachelorarbeit/Archon3DForWeb/Code/src/informationmodel/ElementalInfo.json", "UTF-8");
        elementals = JSON.parse(content.toString());
        return elementals;
    };
    ModelBuilder.prototype.buildPlayer = function () {
        var player = { figureColor: undefined, figures: [], hasControl: undefined, socket: undefined };
        return player;
    };
    ModelBuilder.prototype.buildSpells = function () {
        throw new Error("not implemented function");
    };
    ModelBuilder.prototype.buildActionBoard = function () {
        var actionBoard = { isActive: false, hp1: 0, hp2: 0, hindernisse: [], figure1: undefined, figure2: undefined, maxHP: 25 };
        return actionBoard;
    };
    return ModelBuilder;
}());
exports.ModelBuilder = ModelBuilder;
//# sourceMappingURL=ModelBuilder.js.map