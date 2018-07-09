import { IView } from "./IView";
import { CursorView } from "./CursorView";
import { IViewBuilder } from "./IViewBuilder";
import { ICursorInfo } from "../../informationmodel/ICursorInfo";

export class View {
	private _renderer: THREE.WebGLRenderer;
	private _camera: THREE.PerspectiveCamera;
	private _lighting: THREE.AmbientLight;
	private _backgroundColor: THREE.Color;
	private _blackFigures: IView[];
	private _whiteFigures: IView[];
	private _scene: THREE.Scene;
	private _cursor: IView;
	private _board: IView;
	private _actionBoard: IView;
	private readonly _domElement: string = "#game-holder";
	private readonly _scaling = 5;

	constructor(builder: IViewBuilder, info: ICursorInfo) {
		this._backgroundColor = new THREE.Color("0xfff6e6");
		this.setupRenderer();
		this.update = this.update.bind(this);
		this.initCamera();
		this.initScene();
		this.initLighting();
		this._scene.add(this._camera);
		this._scene.add(this._lighting);
		this._cursor = builder.buildCursor(info);
		// install resize handling
		window.addEventListener("resize", this.handleResize.bind(this), false);
	}

	update(): void {
		requestAnimationFrame(this.update);
		this._renderer.render(this._scene, this._camera);
	}

	private initCamera(): void {
		this._camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
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
		this._renderer = new THREE.WebGLRenderer({ antialias: true, precision: "highp" });
		this._renderer.setSize(window.innerWidth, window.innerHeight);
		// this._renderer.setClearColor();
		$(this._domElement).append(this._renderer.domElement);
	}

	public handleResize(): void {
		this._camera.aspect = window.innerWidth / window.innerHeight;
		this._camera.updateProjectionMatrix();
		this._renderer.setSize(window.innerWidth, window.innerHeight);
	}
}