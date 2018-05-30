import { IServerAdapter } from "../interfaces/IServerAdapter";
import { IGameModel } from "../interfaces/IGameModel";

export class ServerAdapter implements IServerAdapter {
	private _model: IGameModel;
	private _players: SocketIO.Socket[];
	private _sendServer: SocketIO.Server;
	constructor(server: SocketIO.Server, p1: SocketIO.Socket, p2: SocketIO.Socket, model: IGameModel) {
		this._players = [p1, p2];
		this._model = model;
		this._sendServer = server;
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