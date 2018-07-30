"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var THREE = require("three");
var events_1 = require("events");
var View = /** @class */ (function (_super) {
    __extends(View, _super);
    function View(builder, info) {
        var _this = _super.call(this) || this;
        _this._activeScene = undefined;
        _this._domElement = "#game-holder";
        _this._canvas = "myCanvas";
        _this._scaling = 5;
        _this._figureWalkIndex = 0;
        _this._figuresHandedOut = false;
        _this._backgroundColor = new THREE.Color(0xfff6e6);
        _this.setupRenderer();
        _this.update = _this.update.bind(_this);
        _this.initCamera();
        _this.initScene();
        _this.initLighting();
        _this._scene.add(_this._camera);
        _this._scene.add(_this._lighting);
        _this._board = builder.buildBoard();
        _this._scene.add(_this._board.getViewComponent());
        _this._cursor = builder.buildCursor(info);
        _this._scene.add(_this._cursor.getViewComponent());
        _this._whiteFigures = builder.buildWhiteFigures();
        _this._blackFigures = builder.buildBlackFigures();
        // install resize handling
        window.addEventListener("resize", _this.handleResize.bind(_this), false);
        _this.activateScene();
        _this.update();
        return _this;
    }
    View.prototype.update = function () {
        requestAnimationFrame(this.update);
        this._renderer.render(this._activeScene, this._camera);
        // periodic updates of every action figure with the refresh rate
        if (this._activeScene === this._sceneAction) {
        }
        else {
            if (this._cursor.getInfoObject().enabled)
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
    View.prototype.figuresHandedOut = function () {
        return this._figuresHandedOut;
    };
    View.prototype.walkInFigures = function () {
        if (this._figureWalkIndex < 18) {
            this._scene.add(this._blackFigures[this._figureWalkIndex].getViewComponent());
            this._scene.add(this._whiteFigures[this._figureWalkIndex].getViewComponent());
            this._figureWalkIndex++;
            setTimeout(this.walkInFigures.bind(this), 300);
        }
        else {
            this._figuresHandedOut = true;
            this.emit("figuresHandedOut");
        }
    };
    return View;
}(events_1.EventEmitter));
exports.View = View;
//# sourceMappingURL=View.js.map