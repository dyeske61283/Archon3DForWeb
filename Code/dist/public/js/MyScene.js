"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MyScene = /** @class */ (function () {
    function MyScene(scalingFactor, domElement) {
        this.backgroundColor = new THREE.Color(0xbbbbbb);
        this.scaling = scalingFactor;
        this.domElement = domElement;
        this.setupRenderer();
        this.renderLoop = this.renderLoop.bind(this);
        this.initCamera();
        this.initScene();
        this.initLighting();
        this.scene.add(this.camera);
        this.scene.add(this.lighting);
    }
    MyScene.prototype.add = function (obj) {
        this.scene.add(obj);
    };
    MyScene.prototype.startRenderLoop = function () {
        this.renderLoop();
    };
    MyScene.prototype.initCamera = function () {
        this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
        this.camera.position.set(0, -10 * this.scaling, 12 * this.scaling);
        this.camera.lookAt(new THREE.Vector3(0, 0, -1 * this.scaling));
    };
    MyScene.prototype.initScene = function () {
        this.scene = new THREE.Scene();
        this.scene.background = this.backgroundColor;
    };
    MyScene.prototype.initLighting = function () {
        this.lighting = new THREE.AmbientLight(0xFFFFFF - this.backgroundColor.getHex());
    };
    MyScene.prototype.setupRenderer = function () {
        this.renderer = new THREE.WebGLRenderer({ antialias: true, precision: "highp" });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        // this.renderer.setClearColor();
        $(this.domElement).append(this.renderer.domElement);
    };
    MyScene.prototype.renderLoop = function () {
        requestAnimationFrame(this.renderLoop);
        this.renderer.render(this.scene, this.camera);
    };
    MyScene.prototype.handleResize = function () {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    };
    MyScene.prototype.board = function (board) {
        this.add(board.getMesh());
        this.add(board.getGroup());
        return this;
    };
    MyScene.prototype.cursor = function (cursor) {
        this.add(cursor.getMesh());
        return this;
    };
    MyScene.prototype.figure = function (figure) {
        this.add(figure.getMesh());
        return this;
    };
    MyScene.prototype.getCamera = function () {
        return this.camera;
    };
    return MyScene;
}());
exports.MyScene = MyScene;
//# sourceMappingURL=MyScene.js.map