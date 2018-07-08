"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CursorView = /** @class */ (function () {
    function CursorView(info) {
        this.SCALE = 5;
        this.color = 0xDDDD00;
        this._info = info;
    }
    CursorView.prototype.buildViewObject = function () {
        var cursorGeo = new THREE.RingBufferGeometry(0.6 * this.SCALE, 0.706 * this.SCALE, 4);
        cursorGeo.rotateZ(Math.PI / 4);
        var cursorMaterial = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, color: this.color, transparent: true });
        var cursor = new THREE.Mesh(cursorGeo, cursorMaterial);
        cursor.position.z += 0.01;
        this._viewObject = cursor;
    };
    CursorView.prototype.update = function () {
        var material = this._viewObject.material;
        this._info.enabled ? material.color.setHex(this.color) : material.color.setHex(0xEDEDED);
        this._viewObject.position.set(this._info.pos["0"] * this.SCALE, this._info.pos["1"] * this.SCALE, this._viewObject.position.z);
    };
    CursorView.prototype.getViewComponent = function () {
        return this._viewObject;
    };
    CursorView.prototype.getInfoObject = function () {
        return this._info;
    };
    CursorView.prototype.updateInfo = function (infoObject) {
        this._info = infoObject;
        this.update();
    };
    return CursorView;
}());
exports.CursorView = CursorView;
//# sourceMappingURL=CursorView.js.map