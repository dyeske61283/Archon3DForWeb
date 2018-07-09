import { IView } from "./IView";
import { IBoardInfo } from "../../informationmodel/IBoardInfo";

export class BoardView implements IView {
	private _info: IBoardInfo;
	private _obj: THREE.Mesh;

	constructor(board: IBoardInfo) {
		this._info = board;
	}

	getViewComponent(): THREE.Object3D | THREE.Mesh {
		return this._obj;
	}

	getInfoObject() {
		return this._info;
	}
	updateInfo(infoObject: IBoardInfo): void {
		this._info = infoObject;
	}

	update(): void {

	}
}