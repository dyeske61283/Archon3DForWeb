"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Board = /** @class */ (function () {
    function Board(scale, maxFields) {
        this.materialIndex = 0;
        this.materials = [new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide }),
            new THREE.MeshBasicMaterial({ color: 0x005000, side: THREE.DoubleSide }),
            new THREE.MeshBasicMaterial({ color: 0x008C00, side: THREE.DoubleSide }),
            new THREE.MeshBasicMaterial({ color: 0x00B400, side: THREE.DoubleSide }),
            new THREE.MeshBasicMaterial({ color: 0x00DC00, side: THREE.DoubleSide }),
            new THREE.MeshBasicMaterial({ color: 0xFFFFFF, side: THREE.DoubleSide })];
        this.SCALE = scale;
        this.MAX_FIELDS = maxFields;
        this.init();
        this.initPowerFields();
    }
    Board.prototype.init = function () {
        this.boardGeo = new THREE.PlaneGeometry(this.SCALE * this.MAX_FIELDS, this.SCALE * this.MAX_FIELDS, this.MAX_FIELDS, this.MAX_FIELDS);
        this.faces = this.boardGeo.faces.length;
        this.materialIndex = 3;
        var offset = 4 * 2 * this.MAX_FIELDS;
        for (var i = 0; i < 18; i += 2) {
            this.boardGeo.faces[i + offset].materialIndex = this.boardGeo.faces[i + 1 + offset].materialIndex = this.materialIndex;
        }
        offset = 26;
        for (var i = 0; i < 126; i += 18) {
            this.boardGeo.faces[i + offset].materialIndex = this.boardGeo.faces[i + 1 + offset].materialIndex = this.materialIndex;
        }
        offset = 6;
        var offsetMax = 160;
        var index = 0;
        for (var i = 0; i < 8; i += 2) {
            index = i * 9 - i + offset;
            this.boardGeo.faces[index].materialIndex = this.boardGeo.faces[index + 1].materialIndex = this.materialIndex;
            this.boardGeo.faces[offsetMax - index].materialIndex = this.boardGeo.faces[offsetMax - index + 1].materialIndex = this.materialIndex;
        }
        offset = 10;
        offsetMax = 90;
        for (var i = 0; i < 4; i++) {
            index = offset + i * 20;
            this.boardGeo.faces[index].materialIndex = this.boardGeo.faces[index + 1].materialIndex = this.materialIndex;
            index = offsetMax + i * 20;
            this.boardGeo.faces[index].materialIndex = this.boardGeo.faces[index + 1].materialIndex = this.materialIndex;
        }
        // color the rest of the tiles black and white
        this.materialIndex = this.materials.length - 1;
        var n = 0;
        for (var i = 0; i < this.faces; i += 2) {
            if (this.boardGeo.faces[i].materialIndex != 3) {
                this.boardGeo.faces[i].materialIndex = this.boardGeo.faces[i + 1].materialIndex = this.materialIndex;
                n++;
                if ((n >= 10 && (n - 10) % 6 != 0) || n < 10 || n > 40) {
                    if (this.materialIndex == 0) {
                        this.materialIndex = this.materials.length - 1;
                    }
                    else {
                        this.materialIndex = 0;
                    }
                }
            }
        }
        // reset the index for the changing tiles
        this.materialIndex = this.boardGeo.faces[6].materialIndex;
        // add board to the scene
        this.boardMesh = new THREE.Mesh(this.boardGeo, new THREE.MeshFaceMaterial(this.materials));
        this.boardMesh.rotateZ(-Math.PI / 2);
    };
    Board.prototype.initPowerFields = function () {
        this.powerFields = new THREE.Group();
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
        var powerMeshMid = new THREE.Mesh(powerboardGeo, powerMaterial);
        powerMeshMid.position.set(0, 0, 0.00);
        var powerMeshTop = new THREE.Mesh(powerboardGeo, powerMaterial);
        powerMeshTop.position.set(0, 20, 0.00);
        var powerMeshBot = new THREE.Mesh(powerboardGeo, powerMaterial);
        powerMeshBot.position.set(0, -20, 0.00);
        var powerMeshLeft = new THREE.Mesh(powerboardGeo, powerMaterial);
        powerMeshLeft.position.set(-20, 0, 0.00);
        var powerMeshRight = new THREE.Mesh(powerboardGeo, powerMaterial);
        powerMeshRight.position.set(20, 0, 0.00);
        // grouping the powerfields (good for animating them later on)
        this.powerFields.add(powerMeshBot);
        this.powerFields.add(powerMeshLeft);
        this.powerFields.add(powerMeshMid);
        this.powerFields.add(powerMeshRight);
        this.powerFields.add(powerMeshTop);
    };
    Board.prototype.getFieldPosition = function (indexX, indexY) {
        var tmpX = indexX * this.SCALE - (this.MAX_FIELDS - 1) * this.SCALE / 2;
        var tmpY = indexY * this.SCALE - (this.MAX_FIELDS - 1) * this.SCALE / 2;
        return [tmpX, tmpY];
    };
    Board.prototype.getMesh = function () {
        return this.boardMesh;
    };
    Board.prototype.getGroup = function () {
        return this.powerFields;
    };
    Board.prototype.setColor = function (index) {
    };
    return Board;
}());
exports.Board = Board;
//# sourceMappingURL=Board.js.map