import { IFigureInfo } from "../informationmodel/IFigureInfo";
import { IActionFigureInfo } from "../informationmodel/IActionFigureInfo";

export class Figure {
	private _info: IFigureInfo;

	constructor(info: IFigureInfo) {
		this._info = info;
	}

	public move(x: number, y: number) {
		// if range small enough
		// and no figures in the way in case of ground figures
		// move figure
	}

	getInfo(): IFigureInfo {
		return this._info;
	}

	getActionInfo(): IActionFigureInfo {
		return this._info.actionInfo;
	}

	updateHealth() {
		// if standing on powerfield
		// increase health if injured
	}

	isDead(): boolean {
		return this._info.actionInfo.BaseHP === 0.0;
	}
}