import { IFigureInfo } from "./IFigureInfo";

export interface ISpell {
	name: string;
	action(fig1?: IFigureInfo, fig2?: IFigureInfo): void;
	injectAction(action: (fig1?: IFigureInfo, fig2?: IFigureInfo) => void): void;
}