import { ICursorInfo } from "../../informationmodel/ICursorInfo";
import * as THREE from "three";
import { IView } from "./IView";

export class CursorView implements IView {
	private _info: ICursorInfo;
	private _viewObject: THREE.Mesh;
	private SCALE: number = 5;
	private color = 0xDDDD00;

	constructor(info: ICursorInfo) {
		this._info = info;
		this.buildViewObject();
	}

	private buildViewObject() {
		const cursorGeo = new THREE.RingBufferGeometry(0.6 * this.SCALE, 0.706 * this.SCALE, 4);
		cursorGeo.rotateZ(Math.PI / 4);
		const cursorMaterial = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, color: this.color, transparent: true });
		const cursor = new THREE.Mesh(cursorGeo, cursorMaterial);
		cursor.position.z += 0.01;
		this._viewObject = cursor;
	}

	update(): void {
		const material = <THREE.MeshBasicMaterial>this._viewObject.material;
		this._info.enabled ? material.color.setHex(this.color) : material.color.setHex(0xEDEDED);
		this._viewObject.position.set(this._info.pos["0"] * this.SCALE, this._info.pos["1"] * this.SCALE, this._viewObject.position.z);
	}
	getViewComponent(): THREE.Object3D | THREE.Mesh {
		return this._viewObject;
	}
	getInfoObject() {
		return this._info;
	}
	updateInfo(infoObject: any): void {
		this._info =  infoObject as ICursorInfo;
		this.update();
	}
}