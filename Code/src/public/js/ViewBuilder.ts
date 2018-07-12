import { IView } from "./IView";
import { IViewBuilder } from "./IViewBuilder";
import { ICursorInfo } from "../../informationmodel/ICursorInfo";
import { IActionBoardInfo } from "../../informationmodel/IActionBoardInfo";
import { IBoardInfo } from "../../informationmodel/IBoardInfo";
import { IFigureInfo } from "../../informationmodel/IFigureInfo";
import { IGameModel } from "../../interfaces/IGameModel";
import { CursorView } from "./CursorView";
import { BoardView } from "./BoardView";
import * as THREE from "three";

export class ViewBuilder implements IViewBuilder {
	private _model: IGameModel;

	buildWhiteFigures(): IView[] {
		throw new Error("Method not implemented.");
	}

	buildBlackFigures(): IView[] {
		throw new Error("Method not implemented.");
	}

	buildScene(): THREE.Scene {
		return new THREE.Scene();
	}
	buildBoard(): IView {
		return new BoardView(this._model._board);
	}
	buildFightingBoard(): IView {
		throw new Error("Method not implemented.");
	}
	buildCursor(cursor: ICursorInfo): IView {
		return new CursorView(cursor);
	}

	injectModel(model: IGameModel): void {
		this._model = model;
	}
}