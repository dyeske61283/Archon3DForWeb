import { IPlayerInfo } from "../informationmodel/IPlayerInfo";

export class Player {
	private _info: IPlayerInfo;

	constructor(info: IPlayerInfo) {
		this._info = info;
	}
}