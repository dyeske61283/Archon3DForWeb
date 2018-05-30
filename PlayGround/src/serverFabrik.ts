import { IServerController } from "./interfaces/IServerController";
import { ServerController } from "./implementations/ServerController";
import { IGameModel } from "./interfaces/IGameModel";
import { IServerAdapter } from "./interfaces/IServerAdapter";
import { ServerAdapter } from "./implementations/ServerAdapter";
import { GameModel } from "./implementations/GameModel";

export class Fabrik {
	static createServerController(model: IGameModel, p1: SocketIO.Socket, p2: SocketIO.Socket): IServerController {
		return new ServerController(model, p1, p2);
	}

	static createServerAdapter(model: IGameModel, p1: SocketIO.Socket, p2: SocketIO.Socket, server: SocketIO.Server): IServerAdapter {
		return new ServerAdapter(server, p1, p2, model);
	}

	static createModel(): IGameModel {
		return new GameModel();
	}
}