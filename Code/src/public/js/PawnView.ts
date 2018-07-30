import { IView } from "./IView";
import { IFigureInfo } from "../../informationmodel/IFigureInfo";
import * as THREE from "three";

export class PawnView implements IView {
	private _info: IFigureInfo;
	private _obj: THREE.Mesh;
	private _figureMaterial: THREE.MeshBasicMaterial;
	private readonly SCALE = 5;

	constructor(info: IFigureInfo) {
		this._info = info;
		this.initViewObject();
	}

	private initViewObject() {
		const box = new THREE.BoxGeometry(3, 3, 3);
		const figureGeo = new THREE.CylinderGeometry(1, 2, 0.000);
		figureGeo.rotateX(Math.PI / 2);
		box.rotateZ(Math.PI / 4);
		box.rotateY(Math.PI / 4);
		if (this._info.color) {
			this._figureMaterial = new THREE.MeshBasicMaterial({color: new THREE.Color(0xbfc79c)});
		} else {
			this._figureMaterial = new THREE.MeshBasicMaterial({color: new THREE.Color(0x303030)});
		}
		this._obj = new THREE.Mesh(box, this._figureMaterial);
		this._obj.position.set(-0.3, 0, 2.5);
		this._obj.updateMatrix();
		figureGeo.mergeMesh(this._obj);
		this._obj = new THREE.Mesh(figureGeo, this._figureMaterial);
		this._obj.position.set(this._info.pos["0"] *  this.SCALE - 20, this._info.pos["1"] *  this.SCALE - 20, 0.000);
	}

	getInfoObject() {
		return this._info;
	}
	updateInfo(infoObject: IFigureInfo): void {
		this._info = infoObject;
		this.update();
	}
	update(): void {
		this._info.pos;
	}

	getViewComponent(): THREE.Mesh {
		return this._obj;
	}

	clone(): THREE.Mesh {
		return this._obj.clone();
	}

}
