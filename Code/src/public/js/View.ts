import { IView } from "./IView";
import { CursorView } from "./CursorView";
import { IViewBuilder } from "./IViewBuilder";
import { ICursorInfo } from "../../informationmodel/ICursorInfo";
import * as THREE from "three";
import { EventEmitter } from "events";
export class View extends EventEmitter {
	private _renderer: THREE.WebGLRenderer;
	private _camera: THREE.PerspectiveCamera;
	private _lighting: THREE.AmbientLight;
	private _backgroundColor: THREE.Color;
	private _blackFigures: IView[];
	private _whiteFigures: IView[];
	private _scene: THREE.Scene;
	private _activeScene: THREE.Scene = undefined;
	private _sceneAction: THREE.Scene;
	private _cursor: IView;
	private _board: IView;
	private _actionBoard: IView;
	private readonly _domElement: string = "#game-holder";
	private readonly _canvas: string = "myCanvas";
	private readonly _scaling = 5;
	private _figureWalkIndex = 0;
	private _figuresHandedOut = false;

	constructor(builder: IViewBuilder, info: ICursorInfo) {
		super();
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
		this._whiteFigures = builder.buildWhiteFigures();
		this._blackFigures = builder.buildBlackFigures();
		// install resize handling
		window.addEventListener("resize", this.handleResize.bind(this), false);
		this.activateScene();
		this.update();
	}

	update(): void {
		requestAnimationFrame(this.update);
		this._renderer.render(this._activeScene, this._camera);
		// periodic updates of every action figure with the refresh rate
		if (this._activeScene === this._sceneAction) {

		} else {
			if (this._cursor.getInfoObject().enabled)
				this._cursor.update();
		}
	}

	private initCamera(): void {
		const container = $(this._domElement);
		this._camera = new THREE.PerspectiveCamera(50, container.width() / container.width(), 1, 1000);
		this._camera.position.set(0, -10 * this._scaling, 12 * this._scaling);
		this._camera.lookAt(new THREE.Vector3(0, 0, -1 * this._scaling));
	}

	private initScene(): void {
		this._scene = new THREE.Scene();
		this._scene.background = this._backgroundColor;
	}

	private initLighting(): void {
		this._lighting = new THREE.AmbientLight(0xFFFFFF - this._backgroundColor.getHex());
	}

	private setupRenderer(): void {
		this._renderer = new THREE.WebGLRenderer({canvas: document.querySelector("canvas"), antialias: true, precision: "highp" });
		const container = $(this._domElement);
		this._renderer.setSize(container.width(), container.height());
		// this._renderer.setClearColor();
		// $(this._domElement).append(this._renderer.domElement);
	}

	public handleResize(): void {
		const container = $(this._domElement);
		this._camera.aspect = container.width() / container.width();
		this._camera.updateProjectionMatrix();
		this._renderer.setSize(container.width(), container.width());
	}

	private initActionScene(): void {

	}

	public activateScene(): void {
		this._activeScene = this._scene;
	}

	public deactivateScene(): void {
		this._activeScene = undefined;
	}

	public activateActionScene(): void {
		this._activeScene = this._sceneAction;
	}

	public deactivateActionScene(): void {
		this._activeScene = undefined;
	}

	public figuresHandedOut(): boolean {
		return this._figuresHandedOut;
	}

	public walkInFigures(): void {
		if (this._figureWalkIndex < 18) {
			this._scene.add(this._blackFigures[this._figureWalkIndex].getViewComponent());
			this._scene.add(this._whiteFigures[this._figureWalkIndex].getViewComponent());
			this._figureWalkIndex++;
			setTimeout(this.walkInFigures.bind(this), 300);
		} else {
			this._figuresHandedOut = true;
			this.emit("figuresHandedOut");
		}
	}
}