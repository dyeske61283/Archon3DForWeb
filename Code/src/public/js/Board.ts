class Board {

	private mesh: THREE.Mesh;
	private geo: THREE.PlaneGeometry;
	private materialBlack: THREE.MeshBasicMaterial;
	private MaterialWhite: THREE.MeshBasicMaterial;
	private colorDirection: number;
	private colorIndex: number;
	private colors: THREE.Color[];
	private size: number;
	private width: number;
	public constructor() {
		this.colorDirection = 1;
		this.colorIndex = 0;
		this.colors = [new THREE.Color(0),
			new THREE.Color(0, 80, 0),
			new THREE.Color(0, 140, 0),
			new THREE.Color(0, 180, 0),
			new THREE.Color(0, 220, 0),
			new THREE.Color(255)];
		this.width = 9;
		this.size = this.width * 50;
		// build a plane
		this.geo = new THREE.PlaneGeometry(this.size, this.size, this.width, this.width);
		this.materialBlack = new THREE.MeshBasicMaterial({color: this.colors[0].getHex(), side: THREE.DoubleSide});
		this.MaterialWhite = new THREE.MeshBasicMaterial({color: this.colors[5].getHex(), side: THREE.DoubleSide});
		const materials: THREE.MeshBasicMaterial[] = [this.MaterialWhite, this.materialBlack];
		// color the vertices
		const l: number = this.geo.faces.length;
		console.log("This should be 81: " + l);
		for (let i = 0; i < l; i++) {
			const j = i * 2;
			this.geo.faces[j].materialIndex = ((i + Math.floor(i / 9)) % 2);
			this.geo.faces[j + 1].materialIndex = ((i + Math.floor(i / 9)) % 2);
		}

		this.mesh = new THREE.Mesh(this.geo, new THREE.MeshFaceMaterial(materials));
	}

	public getMesh(): THREE.Mesh {
		return this.mesh;
	}

	public update(): void {

	}

	public changeDirection(): void {
		this.colorDirection *= -1;
	}

}