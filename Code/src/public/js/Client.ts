import { IClientAdapter } from "./IClientAdapter";
import { IClientController } from "./IClientController";
import { IViewBuilder } from "./IViewBuilder";
import { ClientFabrik } from "./ClientFabrik";
import { IGameModel } from "../../interfaces/IGameModel";

export class Client {
	private _adapter: IClientAdapter;
	private _controller: IClientController;
	private _viewBuilder: IViewBuilder;
	private _model: IGameModel;

	constructor(fabrik: ClientFabrik, socket: SocketIOClient.Socket) {
		this._adapter = fabrik.createClientAdapter(socket);
		this._controller = fabrik.createClientController(socket);
		this._viewBuilder = fabrik.createViewBuilder();
	}

	getAdapter() {
		return this._adapter;
	}

	getController() {
		return this._controller;
	}

	getModel() {
		return this._model;
	}

	getScene() {
	}
}