import { IView } from "./IView";
import { IFigureInfo } from "../../informationmodel/IFigureInfo";
import { IBoardInfo } from "../../informationmodel/IBoardInfo";
import { IActionBoardInfo } from "../../informationmodel/IActionBoardInfo";
import { ICursorInfo } from "../../informationmodel/ICursorInfo";
import { IGameModel } from "../../interfaces/IGameModel";

// is responsible for building the visual components
export interface IViewBuilder {
	buildWhiteFigures(): IView[];
	buildBlackFigures(): IView[];
	buildScene(): THREE.Scene;
	buildBoard(): IView;
	buildFightingBoard(): IView;
	buildCursor(cursor: ICursorInfo): IView;
	injectModel(model: IGameModel): void;
}