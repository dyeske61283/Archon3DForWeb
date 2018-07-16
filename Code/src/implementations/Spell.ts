import { ISpell } from "../informationmodel/ISpell";
import { IFigureInfo } from "../informationmodel/IFigureInfo";

export class Spell {
	private _info: ISpell;

	injectAction(action: (fig1?: IFigureInfo, fig2?: IFigureInfo) => void): void {
		this._info.action = action;
	}

	getInfo(): ISpell {
		return this._info;
	}
}