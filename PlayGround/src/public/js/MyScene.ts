import { HasMesh } from "./hasMeshInterface";

export class MyScene {
	private renderer: THREE.WebGLRenderer;
	private scene: THREE.Scene;
	private camera: THREE.PerspectiveCamera;
	private scaling: number;
	private readonly backgroundColor: THREE.Color = new THREE.Color(0xbbbbbb);
	private lighting: THREE.AmbientLight;
	private domElement: string;
	public constructor(scalingFactor: number, domElement: string) {
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

	public add(obj: THREE.Object3D | THREE.Mesh): void {
		this.scene.add(obj);
	}

	public startRenderLoop(): void {
		this.renderLoop();
	}

	private initCamera(): void {
		this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
		this.camera.position.set(0, -10 * this.scaling, 12 * this.scaling);
		this.camera.lookAt(new THREE.Vector3(0, 0, -1 * this.scaling));
	}

	private initScene(): void {
		this.scene = new THREE.Scene();
		this.scene.background = this.backgroundColor;
	}

	private initLighting(): void {
		this.lighting = new THREE.AmbientLight(0xFFFFFF - this.backgroundColor.getHex());
	}

	private setupRenderer(): void {
		this.renderer = new THREE.WebGLRenderer({ antialias: true, precision: "highp" });
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		// this.renderer.setClearColor();
		$(this.domElement).append(this.renderer.domElement);
	}

	private renderLoop(): void {
		requestAnimationFrame(this.renderLoop);
		this.renderer.render(this.scene, this.camera);
	}

	public handleResize(): void {
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(window.innerWidth, window.innerHeight);
	}

	public board(board: HasMesh): MyScene {
		this.add(board.getMesh());
		this.add(board.getGroup());
		return this;
	}

	public cursor(cursor: HasMesh): MyScene {
		this.add(cursor.getMesh());
		return this;
	}

	public figure(figure: HasMesh): MyScene {
		this.add(figure.getMesh());
		return this;
	}

	public getCamera(): THREE.PerspectiveCamera {
		return this.camera;
	}
}