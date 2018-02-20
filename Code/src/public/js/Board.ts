class Board {

	private boardGeo: THREE.PlaneGeometry;
	private boardMesh: THREE.Mesh;
	private materialIndex: number = 0;
	private readonly materials: THREE.MeshBasicMaterial[] = [new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide }),
	new THREE.MeshBasicMaterial({ color: 0x005000, side: THREE.DoubleSide }),
	new THREE.MeshBasicMaterial({ color: 0x008C00, side: THREE.DoubleSide }),
	new THREE.MeshBasicMaterial({ color: 0x00B400, side: THREE.DoubleSide }),
	new THREE.MeshBasicMaterial({ color: 0x00DC00, side: THREE.DoubleSide }),
	new THREE.MeshBasicMaterial({ color: 0xFFFFFF, side: THREE.DoubleSide })];
	private readonly SCALE: number;
	private readonly MAX_FIELDS: number;
	private faces: number;
	private powerFields: THREE.Group;
	public constructor(scale: number, maxFields: number) {
		this.SCALE = scale;
		this.MAX_FIELDS = maxFields;
		this.init();
		this.initPowerFields();
	}

	private init(): void {
		this.boardGeo = new THREE.PlaneGeometry(this.SCALE * this.MAX_FIELDS, this.SCALE * this.MAX_FIELDS, this.MAX_FIELDS, this.MAX_FIELDS);
		this.faces = this.boardGeo.faces.length;
		this.materialIndex = 3;

		let offset: number = 4 * 2 * this.MAX_FIELDS;
		for (let i = 0; i < 18; i += 2) {
			this.boardGeo.faces[i + offset].materialIndex = this.boardGeo.faces[i + 1 + offset].materialIndex = this.materialIndex;
		}
		offset = 26;
		for (let i = 0; i < 126; i += 18) {
			this.boardGeo.faces[i + offset].materialIndex = this.boardGeo.faces[i + 1 + offset].materialIndex = this.materialIndex;
		}
		offset = 6;
		let offsetMax: number = 160;
		let index: number = 0;
		for (let i = 0; i < 8; i += 2) {
			index = i * 9 - i + offset;
			this.boardGeo.faces[index].materialIndex = this.boardGeo.faces[index + 1].materialIndex = this.materialIndex;
			this.boardGeo.faces[offsetMax - index].materialIndex = this.boardGeo.faces[offsetMax - index + 1].materialIndex = this.materialIndex;
		}
		offset = 10;
		offsetMax = 90;
		for (let i = 0; i < 4; i++) {
			index = offset + i * 20;
			this.boardGeo.faces[index].materialIndex = this.boardGeo.faces[index + 1].materialIndex = this.materialIndex;
			index = offsetMax + i * 20;
			this.boardGeo.faces[index].materialIndex = this.boardGeo.faces[index + 1].materialIndex = this.materialIndex;
		}

		// color the rest of the tiles black and white
		this.materialIndex = this.materials.length - 1;
		let n: number = 0;
		for (let i = 0; i < this.faces; i += 2) {
			if (this.boardGeo.faces[i].materialIndex != 3) {
				this.boardGeo.faces[i].materialIndex = this.boardGeo.faces[i + 1].materialIndex = this.materialIndex;
				n++;
				if ((n >= 10 && (n - 10) % 6 != 0) || n < 10 || n > 40) {
					if (this.materialIndex == 0) {
						this.materialIndex = this.materials.length - 1;
					}
					else {
						this.materialIndex = 0;
					}
				}
			}
		}
		// reset the index for the changing tiles
		this.materialIndex = this.boardGeo.faces[6].materialIndex;
		// add board to the scene
		this.boardMesh = new THREE.Mesh(this.boardGeo, new THREE.MeshFaceMaterial(this.materials));
		this.boardMesh.rotateZ(- Math.PI / 2);
	}

	private initPowerFields(): void {
		this.powerFields = new THREE.Group();
		const powerboardGeo = new THREE.Geometry();

  const powerRing = new THREE.RingGeometry(1.9, 2.4, 8);
  const ringMesh = new THREE.Mesh(powerRing);

  const powerCircle = new THREE.CircleGeometry(0.75, 8);
  const circleMesh = new THREE.Mesh(powerCircle);
  ringMesh.updateMatrix();
  circleMesh.updateMatrix();
  powerboardGeo.mergeMesh(ringMesh);
  powerboardGeo.mergeMesh(circleMesh);

  const powerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide, });
  powerMaterial.depthTest = false;
  const powerMeshMid = new THREE.Mesh(powerboardGeo, powerMaterial);
  powerMeshMid.position.set(0, 0, 0.00);

  const powerMeshTop = new THREE.Mesh(powerboardGeo, powerMaterial);
  powerMeshTop.position.set(0, 20, 0.00);

  const powerMeshBot = new THREE.Mesh(powerboardGeo, powerMaterial);
  powerMeshBot.position.set(0, -20, 0.00);

  const powerMeshLeft = new THREE.Mesh(powerboardGeo, powerMaterial);
  powerMeshLeft.position.set(-20, 0, 0.00);

  const powerMeshRight = new THREE.Mesh(powerboardGeo, powerMaterial);
  powerMeshRight.position.set(20, 0, 0.00);
  // grouping the powerfields (good for animating them later on)
  this.powerFields.add(powerMeshBot);
  this.powerFields.add(powerMeshLeft);
  this.powerFields.add(powerMeshMid);
  this.powerFields.add(powerMeshRight);
  this.powerFields.add(powerMeshTop);

	}

	public getFieldFromXY(x: number, y: number) {

	}

	public getMesh(): THREE.Mesh {
		return this.boardMesh;
	}

	public getPowerFields(): THREE.Group {
		return this.powerFields;
	}

	public setColor(index: number): void {
	}
}