import { IPlayerInfo } from "./IPlayerInfo";
import { IBoardInfo } from "./IBoardInfo";
import { IFigureInfo } from "./IFigureInfo";

export interface ICursorInfo {

	enabled: boolean;
	controllingPlayer: IPlayerInfo;
	board: IBoardInfo;
	selectedFigure?: IFigureInfo;
	pos: [number, number];
}