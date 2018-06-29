import { IServerController } from "./interfaces/IServerController";
import { ServerController } from "./implementations/ServerController";
import { IGameModel } from "./interfaces/IGameModel";
import { IServerAdapter } from "./interfaces/IServerAdapter";
import { ServerAdapter } from "./implementations/ServerAdapter";
import { GameModel } from "./implementations/GameModel";
import { ModelBuilder } from "./implementations/ModelBuilder";

export class Fabrik {
	private static _sockets: SocketIO.Socket[] = [];

	static createServerController(model: IGameModel): IServerController {
		if ( this.readyToCreate()) return new ServerController(model, this._sockets[0], this._sockets[1]);
		return undefined;
	}

	static createServerAdapter(model: IGameModel, server: SocketIO.Server): IServerAdapter {
		if ( this.readyToCreate()) return new ServerAdapter(server, this._sockets[0], this._sockets[1], model);
		else return undefined;
	}

	static createModel(builder: ModelBuilder): IGameModel {
		return new GameModel(builder);
	}

	static provideSocket(socket: SocketIO.Socket): void {
		if (this._sockets.length < 2) {
			this._sockets.push(socket);
		}
	}

	static readyToCreate(): boolean {
		return this._sockets.length === 2;
	}

	static resetSockets(): void {
		this._sockets.length = 0;
	}
}