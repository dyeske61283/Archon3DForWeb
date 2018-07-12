"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Colors_1 = require("../informationmodel/Colors");
var Board = /** @class */ (function () {
    function Board(info) {
        this._direction = 1;
        this._info = info;
    }
    Board.prototype.placeSettings = function (info) {
        info.colorFirst ? this._direction = -1 : this._direction = 1;
        var color = info.colorFirst ? Colors_1.Colors.notsolightgray : Colors_1.Colors.lightgray;
        this._info.fields.forEach(function (value, index) {
            value.forEach(function (v, i) {
                if (v.changeable) {
                    v.color = color;
                }
            });
        });
    };
    Board.prototype.changeColor = function (dirChange) {
        var _this = this;
        if (dirChange || this._info.fields[4][4].color === Colors_1.Colors.black || this._info.fields[4][4].color === Colors_1.Colors.white) {
            this._direction *= -1;
        }
        this._info.fields.forEach(function (value, index) {
            value.forEach(function (v, i) {
                if (v.changeable) {
                    v.color += _this._direction;
                }
            });
        });
    };
    Board.prototype.activate = function () {
        this._info.isActive = true;
    };
    Board.prototype.deactivate = function () {
        this._info.isActive = false;
    };
    Board.prototype.getInfo = function () {
        return this._info;
    };
    return Board;
}());
exports.Board = Board;
//# sourceMappingURL=Board.js.map