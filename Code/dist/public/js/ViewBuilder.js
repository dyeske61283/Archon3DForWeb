"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CursorView_1 = require("./CursorView");
var BoardView_1 = require("./BoardView");
var THREE = require("three");
var ViewBuilder = /** @class */ (function () {
    function ViewBuilder() {
    }
    ViewBuilder.prototype.buildWhiteFigures = function () {
        throw new Error("Method not implemented.");
    };
    ViewBuilder.prototype.buildBlackFigures = function () {
        throw new Error("Method not implemented.");
    };
    ViewBuilder.prototype.buildScene = function () {
        return new THREE.Scene();
    };
    ViewBuilder.prototype.buildBoard = function () {
        return new BoardView_1.BoardView(this._model._board);
    };
    ViewBuilder.prototype.buildFightingBoard = function () {
        return undefined;
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