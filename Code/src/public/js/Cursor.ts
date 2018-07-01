import { ICursorInfo } from "../../informationmodel/ICursorInfo";
import { IBoardInfo } from "../../informationmodel/IBoardInfo";
import { IGameModel } from "../../interfaces/IGameModel";

export class Cursor {
	private _info: ICursorInfo;
	private _model: IGameModel;

	constructor(info: ICursorInfo) {
		this._info = info;
	}

	public move(x: number, y: number) {
		this._info.pos["0"] += x;
		this._info.pos["1"] += y;
	}

	public control(enable: boolean) {
		this._info.enabled = enable;
	}

	public injectModelInfo(model: IGameModel) {
		this._info.board = model.board();
		this._model = model;
	}

	public action() {
		// got a figure selected
		if (this._info.selectedFigure) {
			// if this is the same field and the magician got selected
			// bring up spell list
		}

		// selected a spell => cast it aka send telegram to server

		// no figure selected and the current field has a Figure => select Figure
		if (!this._info.selectedFigure) {
			this._info.figures.forEach((value) => {
				if (value.pos === this._info.pos) {
					this._info.selectedFigure = value;
				}
			});
		}
	}
}