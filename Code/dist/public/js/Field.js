"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Field = /** @class */ (function () {
    function Field(x, y, c, cf, p, f) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (c === void 0) { c = 0; }
        if (cf === void 0) { cf = false; }
        if (p === void 0) { p = false; }
        if (f === void 0) { f = false; }
        this.x = x;
        this.y = y;
        this.color = c;
        this.w = Field.SCL;
        this.hasPower = p;
        this.hasFigure = f;
        this.isChangeField = cf;
    }
    Field.prototype.setColor = function (c) {
        this.color = c;
    };
    Field.prototype.getMesh = function () {
        return this.geo;
    };
    Field.SCL = 60;
    return Field;
}());
//# sourceMappingURL=Field.js.map