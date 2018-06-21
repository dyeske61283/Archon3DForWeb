import { IView } from "./IView";
import { IViewBuilder } from "./IViewBuilder";
import { ICursorInfo } from "../../informationmodel/ICursorInfo";
import { IActionBoardInfo } from "../../informationmodel/IActionBoardInfo";
import { IBoardInfo } from "../../informationmodel/IBoardInfo";
import { IFigureInfo } from "../../informationmodel/IFigureInfo";

export class ViewBuilder implements IViewBuilder {
	buildBackground(): IView {
		return undefined;
	}
	buildFigures(figures: IFigureInfo[]): IView  {
		return undefined;
	}
	buildScene(): IView {
		return undefined;
	}
	buildBoard(board: IBoardInfo): IView {
		return undefined;
	}
	buildFightingBoard(aBoard: IActionBoardInfo): IView {
		return undefined;
	}
	buildCursor(cursor: ICursorInfo): IView {
		return undefined;
	}
}