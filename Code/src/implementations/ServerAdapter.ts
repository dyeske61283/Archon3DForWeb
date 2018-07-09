import { IServerAdapter } from "../interfaces/IServerAdapter";
import { IGameModel } from "../interfaces/IGameModel";
import { GameModel } from "./GameModel";

export class ServerAdapter implements IServerAdapter {
	private _model: GameModel;
	private _players: SocketIO.Socket[];
	private _sendServer: SocketIO.Server;
	constructor(server: SocketIO.Server, p1: SocketIO.Socket, p2: SocketIO.Socket, model: GameModel) {
		this._players = [p1, p2];
		this._model = model;
		this._sendServer = server;
		this._sendServer.sockets.emit("PlayersReady");
		this._players[0].emit("doSettings");
	}

	model(): IGameModel {
		return this._model;
	}
	sendData<T>(data: T, event: string, index: number): void {
		this._players[index].emit(event, data);
	}

	broadcastData<T>(data: T, event: string): void {
		this._sendServer.emit(event, data);
	}

	onNotify(entity: any, event: string): void {
		this.broadcastData(entity, event);
	}
}