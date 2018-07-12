"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var THREE = require("three");
var View = /** @class */ (function () {
    function View(builder, info) {
        this._activeScene = undefined;
        this._domElement = "#game-holder";
        this._canvas = "myCanvas";
        this._scaling = 5;
        this._backgroundColor = new THREE.Color(0xfff6e6);
        this.setupRenderer();
        this.update = this.update.bind(this);
        this.initCamera();
        this.initScene();
        this.initLighting();
        this._scene.add(this._camera);
        this._scene.add(this._lighting);
        this._board = builder.buildBoard();
        this._scene.add(this._board.getViewComponent());
        this._cursor = builder.buildCursor(info);
        this._scene.add(this._cursor.getViewComponent());
        // this._whiteFigures = builder.buildWhiteFigures();
        // this._blackFigures = builder.buildBlackFigures();
        // install resize handling
        window.addEventListener("resize", this.handleResize.bind(this), false);
        this.activateScene();
        this.update();
    }
    View.prototype.update = function () {
        requestAnimationFrame(this.update);
        this._renderer.render(this._activeScene, this._camera);
        // periodic updates of every action figure with the refresh rate
        if (this._activeScene === this._sceneAction) {
        }
        else {
            this._cursor.update();
        }
    };
    View.prototype.initCamera = function () {
        var container = $(this._domElement);
        this._camera = new THREE.PerspectiveCamera(50, container.width() / container.width(), 1, 1000);
        this._camera.position.set(0, -10 * this._scaling, 12 * this._scaling);
        this._camera.lookAt(new THREE.Vector3(0, 0, -1 * this._scaling));
    };
    View.prototype.initScene = function () {
        this._scene = new THREE.Scene();
        this._scene.background = this._backgroundColor;
    };
    View.prototype.initLighting = function () {
        this._lighting = new THREE.AmbientLight(0xFFFFFF - this._backgroundColor.getHex());
    };
    View.prototype.setupRenderer = function () {
        this._renderer = new THREE.WebGLRenderer({ canvas: document.querySelector("canvas"), antialias: true, precision: "highp" });
        var container = $(this._domElement);
        this._renderer.setSize(container.width(), container.height());
        // this._renderer.setClearColor();
        // $(this._domElement).append(this._renderer.domElement);
    };
    View.prototype.initBlackFigures = function () {
    };
    View.prototype.initWhiteFigures = function () {
    };
    View.prototype.handleResize = function () {
        var container = $(this._domElement);
        this._camera.aspect = container.width() / container.width();
        this._camera.updateProjectionMatrix();
        this._renderer.setSize(container.width(), container.width());
    };
    View.prototype.initActionScene = function () {
    };
    View.prototype.activateScene = function () {
        this._activeScene = this._scene;
    };
    View.prototype.deactivateScene = function () {
        this._activeScene = undefined;
    };
    View.prototype.activateActionScene = function () {
        this._activeScene = this._sceneAction;
    };
    View.prototype.deactivateActionScene = function () {
        this._activeScene = undefined;
    };
    View.prototype.walkInFigures = function () {
    };
    return View;
}());
exports.View = View;
//# sourceMappingURL=View.js.map