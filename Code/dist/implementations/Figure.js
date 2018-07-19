"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Figure = /** @class */ (function () {
    function Figure(info) {
        this._info = info;
    }
    Figure.prototype.move = function (x, y) {
        // if range small enough
        // and no figures in the way in case of ground figures
        // move figure
    };
    Figure.prototype.getInfo = function () {
        return this._info;
    };
    Figure.prototype.getActionInfo = function () {
        return this._info.actionInfo;
    };
    Figure.prototype.updateHealth = function () {
        // if standing on powerfield
        // increase health if injured
    };
    Figure.prototype.isDead = function () {
        return this._info.actionInfo.BaseHP === 0.0;
    };
    return Figure;
}());
exports.Figure = Figure;
//# sourceMappingURL=Figure.js.map