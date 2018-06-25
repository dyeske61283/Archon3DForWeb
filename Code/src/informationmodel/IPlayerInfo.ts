import { IFigureInfo } from "./IFigureInfo";

export interface IPlayerInfo {
	connection: boolean;
	socket: SocketIO.Socket;
	figures: IFigureInfo[];
	hasControl: boolean;
	figureColor: boolean;
}