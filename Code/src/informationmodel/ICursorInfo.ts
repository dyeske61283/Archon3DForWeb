import { IPlayerInfo } from "./IPlayerInfo";
import { IBoardInfo } from "./IBoardInfo";
import { IFigureInfo } from "./IFigureInfo";

export interface ICursorInfo {

	enabled: boolean;
	board: IBoardInfo;
	selectedFigure?: IFigureInfo;
	figures?: IFigureInfo[];
	pos: [number, number];
}