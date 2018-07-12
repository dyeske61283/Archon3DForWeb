import { IView } from "./IView";
import { IFigureInfo } from "../../informationmodel/IFigureInfo";

export class PawnView implements IView {
	private _info: IFigureInfo;
	private _obj: THREE.Mesh;
	private _material: THREE.MeshBasicMaterial;
	private readonly SCALE = 5;

	constructor() {
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
