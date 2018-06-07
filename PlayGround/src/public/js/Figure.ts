import { Cursor } from "./Cursor";
import { HasMesh } from "./hasMeshInterface";

export class Figure implements HasMesh {
	private readonly SCALE: number;
	private readonly MAX_FIELDS: number;
	private readonly figureZ: number;
	private figure: THREE.Mesh;
	private figureMaterial: THREE.MeshNormalMaterial;
	private figureGeo: THREE.Geometry;
	private selected: boolean;

	public constructor(scale: number, maxFields: number) {
		this.SCALE = scale;
		this.MAX_FIELDS = maxFields;
		this.figureZ = 0.5;
		this.init();
		this.selected = false;
	}

	public getMesh(): THREE.Mesh {
		return this.figure;
	}

	private init(): void {
		// add primitive figure
		const box = new THREE.BoxGeometry(3, 3, 3);
		this.figureGeo = new THREE.CylinderGeometry(1, 2, this.figureZ);
		this.figureGeo.rotateX(Math.PI / 2);
		box.rotateZ(Math.PI / 4);
		box.rotateY(Math.PI / 4);
		this.figureMaterial = new THREE.MeshNormalMaterial();
		this.figure = new THREE.Mesh(box, this.figureMaterial);
		this.figure.position.set(-0.3, 0, 2.5);
		this.figure.updateMatrix();
		this.figureGeo.mergeMesh(this.figure);
		this.figure = new THREE.Mesh(this.figureGeo, this.figureMaterial);
		this.figure.position.set(-20, -20, this.figureZ);
	}

	public select(): void {
		this.figureMaterial.wireframe = true;
		this.selected = true;
	}

	public deselect(): void {
		this.figureMaterial.wireframe = false;
		this.selected = false;
	}

	public isSelected(): boolean {
		return this.selected;
	}

	public setPositionWithCursor(cursor: Cursor): void {
		if (this.selected) {
			this.figure.position.set(cursor.getMesh().position.x, cursor.getMesh().position.y, this.figureZ);
		}
	}

	public setPosition(x: number, y: number): void {
		this.figure.position.set(x, y, this.figureZ);
	}
}