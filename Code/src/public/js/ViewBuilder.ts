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
import { PawnView } from "./PawnView";

export class ViewBuilder implements IViewBuilder {
	private _model: IGameModel;

	buildWhiteFigures(): IView[] {
		if (this._model && this._model._whiteFigures.length > 0) {
			const tmp: IView[] = [];
			this._model._whiteFigures.forEach((value, index) => {
				tmp.push(new PawnView(value));
			});
			return tmp;
		} else {
			console.log("Somehow the model is not filled inside the ViewBuilder..");
			return undefined;
		}
	}

	buildBlackFigures(): IView[] {
		if (this._model && this._model._blackFigures.length > 0) {
			const tmp: IView[] = [];
			this._model._blackFigures.forEach((value, index) => {
				tmp.push(new PawnView(value));
			});
			return tmp;
		} else {
			console.log("Somehow the model is not filled inside the ViewBuilder..");
			return undefined;
		}
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