enum direction {
	Up = 1,
	Down,
	Left,
	Right,
}

class Cursor {
	private cursorGeo: THREE.RingBufferGeometry;
	private cursorMaterial: THREE.MeshBasicMaterial;
	private cursor: THREE.Mesh;
	private controlEnabled: boolean;
	private readonly SCALE: number;
	private readonly MAX_FIELDS: number;
	private color: number = 0xDDDD00;
	public constructor(scale: number, maxFields: number) {
		this.SCALE = scale;
		this.MAX_FIELDS = maxFields;
		this.init();
		this.enableControl();
	}

	public getMesh(): THREE.Mesh {
		return this.cursor;
	}

	private init(): void {
		this.cursorGeo = new THREE.RingBufferGeometry(0.6 * this.SCALE, 0.706 * this.SCALE, 4);
		this.cursorGeo.rotateZ(Math.PI / 4);
		this.cursorMaterial = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, color: this.color, transparent: true });
		this.cursor = new THREE.Mesh(this.cursorGeo, this.cursorMaterial);
		this.cursor.position.z += 0.01;
	}

	public setColor(color: number): void {
		this.color = color;
	}

	public enableControl(): void {
		this.controlEnabled = true;
	}

	public disableControl(): void {
		this.controlEnabled = false;
	}

	public move(dir: direction): void {
		if (this.controlEnabled) {
			switch (dir) {
				case direction.Down:
					if (this.cursor.position.y > - Math.floor((this.MAX_FIELDS * this.SCALE) / 2)) {
						this.cursor.position.y -= this.SCALE;
					}
					break;
				case direction.Up:
					if (this.cursor.position.y < - Math.floor(this.MAX_FIELDS * this.SCALE / 2)) {
						this.cursor.position.y += this.SCALE;
					}
					break;
				case direction.Left:
					if (this.cursor.position.x > - Math.floor((this.MAX_FIELDS * this.SCALE) / 2)) {
						this.cursor.position.x -= this.SCALE;
					}
					break;
				case direction.Right:
					if (this.cursor.position.x < - Math.floor(this.MAX_FIELDS * this.SCALE / 2)) {
						this.cursor.position.x += this.SCALE;
					}
					break;
			}
		}
	}
}