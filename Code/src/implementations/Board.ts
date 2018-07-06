import { IBoardInfo } from "../informationmodel/IBoardInfo";

export class Board {
	private _info: IBoardInfo;

	constructor(info: IBoardInfo) {
		this._info = info;
	}
}