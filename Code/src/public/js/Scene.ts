class MyScene {
	private board: Board;
	private cursor: Cursor;
	private camera: THREE.PerspectiveCamera;
	private scene: THREE.Scene;
	private renderer: THREE.WebGLRenderer;
	public constructor() {
		// setup renderer
		const WIDTH: number = window.innerWidth;
  		const HEIGHT: number = window.innerHeight;
		this.renderer = new THREE.WebGLRenderer({antialias: true});
		this.renderer.setSize(WIDTH, HEIGHT);
		this.renderer.setClearColor(0xD0D0D0, 1);
		$("#game-holder").append(this.renderer.domElement);

		// instantiate scene
		this.scene = new THREE.Scene();

		// instantiate camera
		this.camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT);
		this.camera.position.z = 50;
		this.scene.add(this.camera);

		// instantiate Board
		this.board = new Board();
		this.board.getMesh().position.x = 0;
		this.board.getMesh().position.y = 0;
		this.scene.add(this.board.getMesh());
		// instantiate Cursor
	}

	public show(): void {
		this.render();
	}

	public render(): void {
		const timer: number = Date.now() * 0.0001;
				this.camera.position.x = Math.cos( timer ) * 800;
				this.camera.position.z = Math.sin( timer ) * 800;
				this.camera.lookAt( this.scene.position );
				this.board.getMesh().rotation.x = timer * 5;
				this.board.getMesh().rotation.y = timer * 2.5;
				window.requestAnimationFrame(this.render);
				this.renderer.render(this.scene, this.camera);
	}

	public add(obj: THREE.Object3D): void {
		this.scene.add(obj);
	}

	public windowResize(): void {
		this.camera.aspect = window.innerWidth / window.innerHeight;
  		this.camera.updateProjectionMatrix();
  		this.renderer.setSize( window.innerWidth, window.innerHeight );
	}
}