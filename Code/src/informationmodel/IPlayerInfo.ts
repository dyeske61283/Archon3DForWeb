import { IFigureInfo } from "./IFigureInfo";

export interface IPlayerInfo {
	socket: SocketIO.Socket;
	figures: IFigureInfo[];
	hasControl: boolean;
	figureColor: boolean;
}