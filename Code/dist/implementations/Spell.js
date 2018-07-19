"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Spell = /** @class */ (function () {
    function Spell() {
    }
    Spell.prototype.injectAction = function (action) {
        this._info.action = action;
    };
    Spell.prototype.getInfo = function () {
        return this._info;
    };
    return Spell;
}());
exports.Spell = Spell;
//# sourceMappingURL=Spell.js.map