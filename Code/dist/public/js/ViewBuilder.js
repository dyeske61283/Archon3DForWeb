"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CursorView_1 = require("./CursorView");
var BoardView_1 = require("./BoardView");
var PawnView_1 = require("./PawnView");
var ViewBuilder = /** @class */ (function () {
    function ViewBuilder() {
    }
    ViewBuilder.prototype.buildWhiteFigures = function () {
        if (this._model && this._model._whiteFigures.length > 0) {
            var tmp_1 = [];
            this._model._whiteFigures.forEach(function (value, index) {
                tmp_1.push(new PawnView_1.PawnView(value));
            });
            return tmp_1;
        }
        else {
            console.log("Somehow the model is not filled inside the ViewBuilder..");
        }
    };
    ViewBuilder.prototype.buildBlackFigures = function () {
        if (this._model && this._model._blackFigures.length > 0) {
            var tmp_2 = [];
            this._model._blackFigures.forEach(function (value, index) {
                tmp_2.push(new PawnView_1.PawnView(value));
            });
            return tmp_2;
        }
        else {
            console.log("Somehow the model is not filled inside the ViewBuilder..");
        }
    };
    ViewBuilder.prototype.buildBoard = function () {
        return new BoardView_1.BoardView(this._model._board);
    };
    ViewBuilder.prototype.buildFightingBoard = function () {
        throw new Error("Method not implemented.");
    };
    ViewBuilder.prototype.buildCursor = function (cursor) {
        return new CursorView_1.CursorView(cursor);
    };
    ViewBuilder.prototype.injectModel = function (model) {
        this._model = model;
    };
    return ViewBuilder;
}());
exports.ViewBuilder = ViewBuilder;
//# sourceMappingURL=ViewBuilder.js.map