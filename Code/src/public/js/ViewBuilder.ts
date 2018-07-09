import { IView } from "./IView";
import { IViewBuilder } from "./IViewBuilder";
import { ICursorInfo } from "../../informationmodel/ICursorInfo";
import { IActionBoardInfo } from "../../informationmodel/IActionBoardInfo";
import { IBoardInfo } from "../../informationmodel/IBoardInfo";
import { IFigureInfo } from "../../informationmodel/IFigureInfo";
import { IGameModel } from "../../interfaces/IGameModel";
import { CursorView } from "./CursorView";
import { BoardView } from "./BoardView";

export class ViewBuilder implements IViewBuilder {
	private _model: IGameModel;

	buildWhiteFigures(figures: IFigureInfo[]): IView[] {
		throw new Error("Method not implemented.");
	}

	buildBlackFigures(figures: IFigureInfo[]): IView[] {
		throw new Error("Method not implemented.");
	}

	buildScene(): THREE.Scene {
		return new THREE.Scene();
	}
	buildBoard(board: IBoardInfo): IView {
		return new BoardView(board);
	}
	buildFightingBoard(aBoard: IActionBoardInfo): IView {
		return undefined;
	}
	buildCursor(cursor: ICursorInfo): IView {
		return new CursorView(cursor);
	}

	injectModel(model: IGameModel): void {
		this._model = model;
	}
}