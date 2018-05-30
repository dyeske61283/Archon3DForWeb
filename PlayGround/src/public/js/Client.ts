import { IClientAdapter } from "./IClientAdapter";
import { IClientController } from "./IClientController";
import { IViewBuilder } from "./IViewBuilder";
import { ClientFabrik } from "./ClientFabrik";

export class Client {
	private _adapter: IClientAdapter;
	private _controller: IClientController;
	private _viewBuilder: IViewBuilder;

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

	getScene() {

	}
}