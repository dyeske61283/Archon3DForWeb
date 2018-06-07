export interface IPlayerInfo {
	connection: boolean;
	socket: SocketIO.Socket;
	figures: {};
	hasControl: boolean;
	figureColor: boolean;
}