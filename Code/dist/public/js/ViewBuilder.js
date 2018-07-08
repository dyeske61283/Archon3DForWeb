"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CursorView_1 = require("./CursorView");
var ViewBuilder = /** @class */ (function () {
    function ViewBuilder() {
    }
    ViewBuilder.prototype.buildBackground = function () {
        return undefined;
    };
    ViewBuilder.prototype.buildWhiteFigures = function (figures) {
        throw new Error("Method not implemented.");
    };
    ViewBuilder.prototype.buildBlackFigures = function (figures) {
        throw new Error("Method not implemented.");
    };
    ViewBuilder.prototype.buildScene = function () {
        return undefined;
    };
    ViewBuilder.prototype.buildBoard = function (board) {
        return undefined;
    };
    ViewBuilder.prototype.buildFightingBoard = function (aBoard) {
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