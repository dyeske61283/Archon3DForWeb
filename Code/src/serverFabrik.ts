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
		return new ServerController(model, this._sockets[0], this._sockets[1]);
	}

	static createServerAdapter(model: IGameModel, server: SocketIO.Server): IServerAdapter {
		return new ServerAdapter(server, this._sockets[0], this._sockets[1], model);
	}

	static createModel(builder: ModelBuilder): IGameModel {
		return new GameModel(builder);
	}

	static provideSocket(socket: SocketIO.Socket) {
		if (this._sockets.length < 2) {
			this._sockets.push(socket);
		}
	}

	static readyToCreate(): boolean {
		return this._sockets.length === 2;
	}
}