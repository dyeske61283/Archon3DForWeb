import { IView } from "./IView";
import { IFigureInfo } from "../../informationmodel/IFigureInfo";
import { IBoardInfo } from "../../informationmodel/IBoardInfo";
import { IActionBoardInfo } from "../../informationmodel/IActionBoardInfo";
import { ICursorInfo } from "../../informationmodel/ICursorInfo";

// is responsible for building the visual components
export interface IViewBuilder {
	buildBackground(): IView;
	buildFigures(figures: IFigureInfo[]): IView;
	buildScene(): IView;
	buildBoard(board: IBoardInfo): IView;
	buildFightingBoard(aBoard: IActionBoardInfo): IView;
	buildCursor(cursor: ICursorInfo): IView;
}