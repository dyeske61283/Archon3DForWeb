"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var THREE = require("three");
var BoardView = /** @class */ (function () {
    function BoardView(board) {
        this.SCALE = 5;
        this.MAX_FIELDS = 9;
        this._info = board;
        this._materials = [];
        this._materials.push(new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide }));
        this._materials.push(new THREE.MeshBasicMaterial({ color: 0x005000, side: THREE.DoubleSide }));
        this._materials.push(new THREE.MeshBasicMaterial({ color: 0x008C00, side: THREE.DoubleSide }));
        this._materials.push(new THREE.MeshBasicMaterial({ color: 0x00B400, side: THREE.DoubleSide }));
        this._materials.push(new THREE.MeshBasicMaterial({ color: 0x00DC00, side: THREE.DoubleSide }));
        this._materials.push(new THREE.MeshBasicMaterial({ color: 0xFFFFFF, side: THREE.DoubleSide }));
        this.initView();
        this.initPowerFields();
        this._boardView = new THREE.Group();
        this._boardView.add(this._obj);
        this._boardView.add(this._powerFields);
    }
    BoardView.prototype.getViewComponent = function () {
        return this._boardView;
    };
    BoardView.prototype.getInfoObject = function () {
        return this._info;
    };
    BoardView.prototype.updateInfo = function (infoObject) {
        this._info = infoObject;
        this.update();
    };
    BoardView.prototype.update = function () {
        var _this = this;
        this._info.fields.forEach(function (value, index) {
            value.forEach(function (val, i) {
                _this._boardGeo.faces[(2 * _this.MAX_FIELDS * index) + (2 * i)].materialIndex = _this._boardGeo.faces[(2 * _this.MAX_FIELDS * index) + (2 * i) + 1].materialIndex = val.color;
            });
        });
    };
    BoardView.prototype.initView = function () {
        console.log(this._info.fields);
        this._boardGeo = new THREE.PlaneGeometry(this.SCALE * this.MAX_FIELDS, this.SCALE * this.MAX_FIELDS, this.MAX_FIELDS, this.MAX_FIELDS);
        this.update();
        this._boardGeo.sortFacesByMaterialIndex();
        this._obj = new THREE.Mesh(this._boardGeo, this._materials);
    };
    BoardView.prototype.initPowerFields = function () {
        var _this = this;
        this._powerFields = new THREE.Group();
        var powerboardGeo = new THREE.Geometry();
        var powerRing = new THREE.RingGeometry(1.9, 2.4, 8);
        var ringMesh = new THREE.Mesh(powerRing);
        var powerCircle = new THREE.CircleGeometry(0.75, 8);
        var circleMesh = new THREE.Mesh(powerCircle);
        ringMesh.updateMatrix();
        circleMesh.updateMatrix();
        powerboardGeo.mergeMesh(ringMesh);
        powerboardGeo.mergeMesh(circleMesh);
        var powerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide, });
        powerMaterial.depthTest = false;
        this._info.fields.forEach(function (value, index) {
            value.forEach(function (val, i) {
                if (val.isPowerfield) {
                    var powerMesh = new THREE.Mesh(powerboardGeo, powerMaterial);
                    var posX = val.x * _this.SCALE - 4 * _this.SCALE;
                    var posY = val.y * _this.SCALE - 4 * _this.SCALE;
                    powerMesh.position.set(posX, posY, 0.00);
                    _this._powerFields.add(powerMesh);
                }
            });
        });
    };
    return BoardView;
}());
exports.BoardView = BoardView;
//# sourceMappingURL=BoardView.js.map