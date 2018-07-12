import { IView } from "./IView";
import { IBoardInfo } from "../../informationmodel/IBoardInfo";
import * as THREE from "three";

export class BoardView implements IView {
	private _info: IBoardInfo;
	private _obj: THREE.Mesh;
	private _boardGeo: THREE.PlaneGeometry;
	private readonly _materials: THREE.MeshBasicMaterial[];
	private readonly SCALE: number = 5;
	private readonly MAX_FIELDS: number = 9;
	private _faces: number;
	private _powerFields: THREE.Group;
	private _boardView: THREE.Group;

	constructor(board: IBoardInfo) {
		this._info = board;
		this._materials = [];
		this._materials.push(new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide }));
		this._materials.push(new THREE.MeshBasicMaterial({ color: 0x005000, side: THREE.DoubleSide }));
		this._materials.push(new THREE.MeshBasicMaterial({ color: 0x008C00, side: THREE.DoubleSide }));
		this._materials.push(new THREE.MeshBasicMaterial({ color: 0x00B400, side: THREE.DoubleSide }));
		this._materials.push(new THREE.MeshBasicMaterial({ color: 0x00DC00, side: THREE.DoubleSide }));
		this._materials.push(new THREE.MeshBasicMaterial({ color: 0xFFFFFF, side: THREE.DoubleSide }));
		this.initView();
		this.initPowerFields();
		this._boardView = new THREE.Group();
		this._boardView.add(this._obj);
		this._boardView.add(this._powerFields);
	}

	getViewComponent(): THREE.Object3D | THREE.Mesh {
		return this._boardView;
	}

	getInfoObject() {
		return this._info;
	}
	updateInfo(infoObject: IBoardInfo): void {
		this._info = infoObject;
		this.update();
	}

	update(): void {
		this._info.fields.forEach((value, index) => {
			value.forEach((val, i) => {
				this._boardGeo.faces[(2 * this.MAX_FIELDS * index) + (2 * i)].materialIndex = this._boardGeo.faces[(2 * this.MAX_FIELDS * index) + (2 * i) + 1].materialIndex = val.color;
			});
		});
	}

	private initView(): void {
		this._boardGeo = new THREE.PlaneGeometry(this.SCALE * this.MAX_FIELDS, this.SCALE * this.MAX_FIELDS, this.MAX_FIELDS, this.MAX_FIELDS);
		this.update();
		this._boardGeo.sortFacesByMaterialIndex();
		this._obj = new THREE.Mesh(this._boardGeo, this._materials);
	}

	private initPowerFields(): void {
		this._powerFields = new THREE.Group();
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

		this._info.fields.forEach((value, index) => {
			value.forEach((val, i) => {
				if (val.isPowerfield) {
					const powerMesh = new THREE.Mesh(powerboardGeo, powerMaterial);
					const posX = val.x * this.SCALE - 4 * this.SCALE;
					const posY = val.y * this.SCALE - 4 * this.SCALE;
					powerMesh.position.set(posX, posY, 0.00);
					this._powerFields.add(powerMesh);
				}
			});
		});
	}
}