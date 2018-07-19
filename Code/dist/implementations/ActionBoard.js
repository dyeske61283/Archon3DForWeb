"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ActionBoard = /** @class */ (function () {
    function ActionBoard(info) {
        this._info = info;
    }
    ActionBoard.prototype.activate = function () {
        this._info.isActive = true;
    };
    ActionBoard.prototype.deactivate = function () {
        this._info.isActive = false;
    };
    ActionBoard.prototype.setFigures = function (fig1, fig2) {
        this._info.figure1 = fig1.actionInfo;
        this._info.figure2 = fig2.actionInfo;
        this._info.hp1 = this._info.figure1.BaseHP + this._info.figure1.HPBonus;
        this._info.hp2 = this._info.figure2.BaseHP + this._info.figure2.HPBonus;
    };
    ActionBoard.prototype.updatePlants = function () {
    };
    return ActionBoard;
}());
exports.ActionBoard = ActionBoard;
//# sourceMappingURL=ActionBoard.js.map