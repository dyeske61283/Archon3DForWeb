"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Figure = /** @class */ (function () {
    function Figure(scale, maxFields) {
        this.SCALE = scale;
        this.MAX_FIELDS = maxFields;
        this.figureZ = 0.5;
        this.init();
        this.selected = false;
    }
    Figure.prototype.getMesh = function () {
        return this.figure;
    };
    Figure.prototype.init = function () {
        // add primitive figure
        var box = new THREE.BoxGeometry(3, 3, 3);
        this.figureGeo = new THREE.CylinderGeometry(1, 2, this.figureZ);
        this.figureGeo.rotateX(Math.PI / 2);
        box.rotateZ(Math.PI / 4);
        box.rotateY(Math.PI / 4);
        this.figureMaterial = new THREE.MeshNormalMaterial();
        this.figure = new THREE.Mesh(box, this.figureMaterial);
        this.figure.position.set(-0.3, 0, 2.5);
        this.figure.updateMatrix();
        this.figureGeo.mergeMesh(this.figure);
        this.figure = new THREE.Mesh(this.figureGeo, this.figureMaterial);
        this.figure.position.set(-20, -20, this.figureZ);
    };
    Figure.prototype.select = function () {
        this.figureMaterial.wireframe = true;
        this.selected = true;
    };
    Figure.prototype.deselect = function () {
        this.figureMaterial.wireframe = false;
        this.selected = false;
    };
    Figure.prototype.isSelected = function () {
        return this.selected;
    };
    Figure.prototype.setPositionWithCursor = function (cursor) {
        if (this.selected) {
            this.figure.position.set(cursor.getMesh().position.x, cursor.getMesh().position.y, this.figureZ);
        }
    };
    Figure.prototype.setPosition = function (x, y) {
        this.figure.position.set(x, y, this.figureZ);
    };
    return Figure;
}());
exports.Figure = Figure;
//# sourceMappingURL=Figure.js.map