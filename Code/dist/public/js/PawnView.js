"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var THREE = require("three");
var PawnView = /** @class */ (function () {
    function PawnView(info) {
        this.SCALE = 5;
        this._info = info;
        this.initViewObject();
    }
    PawnView.prototype.initViewObject = function () {
        var box = new THREE.BoxGeometry(3, 3, 3);
        var figureGeo = new THREE.CylinderGeometry(1, 2, 0.000);
        figureGeo.rotateX(Math.PI / 2);
        box.rotateZ(Math.PI / 4);
        box.rotateY(Math.PI / 4);
        this._figureMaterial = new THREE.MeshNormalMaterial();
        this._obj = new THREE.Mesh(box, this._figureMaterial);
        this._obj.position.set(-0.3, 0, 2.5);
        this._obj.updateMatrix();
        figureGeo.mergeMesh(this._obj);
        this._obj = new THREE.Mesh(figureGeo, this._figureMaterial);
        this._obj.position.set(this._info.pos["0"] * this.SCALE - 20, this._info.pos["1"] * this.SCALE - 20, 0.000);
    };
    PawnView.prototype.getInfoObject = function () {
        return this._info;
    };
    PawnView.prototype.updateInfo = function (infoObject) {
        this._info = infoObject;
        this.update();
    };
    PawnView.prototype.update = function () {
        this._info.pos;
    };
    PawnView.prototype.getViewComponent = function () {
        return this._obj;
    };
    PawnView.prototype.clone = function () {
        return this._obj.clone();
    };
    return PawnView;
}());
exports.PawnView = PawnView;
//# sourceMappingURL=PawnView.js.map