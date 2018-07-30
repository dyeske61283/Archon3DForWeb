import { ICursorInfo } from "../../informationmodel/ICursorInfo";
import { IBoardInfo } from "../../informationmodel/IBoardInfo";
import { IGameModel } from "../../interfaces/IGameModel";
import { IFigureInfo } from "../../informationmodel/IFigureInfo";
import { EventEmitter } from "events";

export class Cursor extends EventEmitter {
	private _info: ICursorInfo;

	constructor(info: ICursorInfo) {
		super();
		this._info = info;
	}

	public move(x: number, y: number) {
		if (this._info.enabled) {
			this._info.pos["0"] += x;
			this._info.pos["1"] += y;
		}
	}

	public control(enable: boolean) {
		this._info.enabled = enable;
	}

	public info(): ICursorInfo {
		return this._info;
	}

	public injectModelInfo(model: IGameModel) {
		this._info.board = model._board;
	}

	public injectFigures(figures: IFigureInfo[]) {
		this._info.figures = figures;
	}

	public action() {
		if (this._info.enabled) {
			// got a figure selected
			if (this._info.selectedFigure) {
				// if this is the same field and the magician got selected
				// bring up spell list
				switch (this._info.selectedFigure.name) {
					case "Sorceress":
					case "Wizard":
						this.emit("showSpells");
						break;
					default:
						this._info.selectedFigure;
				}
				// if it is a regular figure, check
				// possible movement and move the figure
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
}