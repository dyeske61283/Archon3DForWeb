"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("events");
var Cursor = /** @class */ (function (_super) {
    __extends(Cursor, _super);
    function Cursor(info) {
        var _this = _super.call(this) || this;
        _this._info = info;
        return _this;
    }
    Cursor.prototype.move = function (x, y) {
        this._info.pos["0"] += x;
        this._info.pos["1"] += y;
    };
    Cursor.prototype.control = function (enable) {
        this._info.enabled = enable;
    };
    Cursor.prototype.info = function () {
        return this._info;
    };
    Cursor.prototype.injectModelInfo = function (model) {
        this._info.board = model._board;
    };
    Cursor.prototype.injectFigures = function (figures) {
        this._info.figures = figures;
    };
    Cursor.prototype.action = function () {
        var _this = this;
        // got a figure selected
        if (this._info.selectedFigure) {
            // if this is the same field and the magician got selected
            // bring up spell list
            switch (this._info.selectedFigure.name) {
                case "Sorceress":
                case "Wizard":
                    this.emit("showSpells");
                    break;
                default:
                    this._info.selectedFigure;
            }
            // if it is a regular figure, check
            // possible movement and move the figure
        }
        // selected a spell => cast it aka send telegram to server
        // no figure selected and the current field has a Figure => select Figure
        if (!this._info.selectedFigure) {
            this._info.figures.forEach(function (value) {
                if (value.pos === _this._info.pos) {
                    _this._info.selectedFigure = value;
                }
            });
        }
    };
    return Cursor;
}(events_1.EventEmitter));
exports.Cursor = Cursor;
//# sourceMappingURL=Cursor.js.map