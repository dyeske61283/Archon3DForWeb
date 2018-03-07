"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var direction;
(function (direction) {
    direction[direction["Up"] = 1] = "Up";
    direction[direction["Down"] = 2] = "Down";
    direction[direction["Left"] = 3] = "Left";
    direction[direction["Right"] = 4] = "Right";
})(direction = exports.direction || (exports.direction = {}));
var Cursor = /** @class */ (function () {
    function Cursor(scale, maxFields) {
        this.color = 0xDDDD00;
        this.SCALE = scale;
        this.MAX_FIELDS = maxFields;
        this.init();
        this.enableControl();
    }
    Cursor.prototype.getMesh = function () {
        return this.cursor;
    };
    Cursor.prototype.init = function () {
        this.cursorGeo = new THREE.RingBufferGeometry(0.6 * this.SCALE, 0.706 * this.SCALE, 4);
        this.cursorGeo.rotateZ(Math.PI / 4);
        this.cursorMaterial = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, color: this.color, transparent: true });
        this.cursor = new THREE.Mesh(this.cursorGeo, this.cursorMaterial);
        this.cursor.position.z += 0.01;
    };
    Cursor.prototype.setColor = function (color) {
        this.color = color;
    };
    Cursor.prototype.enableControl = function () {
        this.controlEnabled = true;
    };
    Cursor.prototype.disableControl = function () {
        this.controlEnabled = false;
    };
    Cursor.prototype.move = function (dir) {
        if (this.controlEnabled) {
            switch (dir) {
                case direction.Down:
                    if (this.cursor.position.y > -Math.floor(((this.MAX_FIELDS - 1) * this.SCALE) / 2)) {
                        this.cursor.position.y -= this.SCALE;
                    }
                    break;
                case direction.Up:
                    if (this.cursor.position.y < Math.floor((this.MAX_FIELDS - 1) * this.SCALE / 2)) {
                        this.cursor.position.y += this.SCALE;
                    }
                    break;
                case direction.Left:
                    if (this.cursor.position.x > -Math.floor(((this.MAX_FIELDS - 1) * this.SCALE) / 2)) {
                        this.cursor.position.x -= this.SCALE;
                    }
                    break;
                case direction.Right:
                    if (this.cursor.position.x < Math.floor((this.MAX_FIELDS - 1) * this.SCALE / 2)) {
                        this.cursor.position.x += this.SCALE;
                    }
                    break;
            }
        }
    };
    return Cursor;
}());
exports.Cursor = Cursor;
//# sourceMappingURL=Cursor.js.map