"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Cursor = /** @class */ (function () {
    function Cursor() {
    }
    Cursor.prototype.move = function (x, y) {
        this._info.pos["0"] += x;
        this._info.pos["1"] += y;
    };
    Cursor.prototype.control = function (enable) {
        this._info.enabled = enable;
    };
    return Cursor;
}());
exports.Cursor = Cursor;
//# sourceMappingURL=Cursor.js.map