import { ICursorInfo } from "../../informationmodel/ICursorInfo";

export class Cursor {
	private _info: ICursorInfo;

	constructor() {
	}

	public move(x: number, y: number) {
		this._info.pos["0"] += x;
		this._info.pos["1"] += y;
	}

	public control(enable: boolean) {
		this._info.enabled = enable;
	}
}