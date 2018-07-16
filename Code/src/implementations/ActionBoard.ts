import { IActionBoardInfo } from "../informationmodel/IActionBoardInfo";
import { IFigureInfo } from "../informationmodel/IFigureInfo";

export class ActionBoard {
	private _info: IActionBoardInfo;

	constructor(info: IActionBoardInfo) {
		this._info = info;
	}

	activate(): void {
		this._info.isActive = true;
	}

	deactivate(): void {
		this._info.isActive = false;
	}

	setFigures(fig1: IFigureInfo, fig2: IFigureInfo): void {
		this._info.figure1 = fig1.actionInfo;
		this._info.figure2 = fig2.actionInfo;
		this._info.hp1 = this._info.figure1.BaseHP + this._info.figure1.HPBonus;
		this._info.hp2 = this._info.figure2.BaseHP + this._info.figure2.HPBonus;
	}

	updatePlants(): void {
	}
}