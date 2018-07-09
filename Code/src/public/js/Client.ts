import { IClientAdapter } from "./IClientAdapter";
import { IClientController } from "./IClientController";
import { IViewBuilder } from "./IViewBuilder";
import { ClientFabrik } from "./ClientFabrik";
import { IGameModel } from "../../interfaces/IGameModel";
import { Cursor } from "./Cursor";
import { IView } from "./IView";
import { View } from "./View";

export class Client {
	private _adapter: IClientAdapter;
	private _controller: IClientController;
	private _viewBuilder: IViewBuilder;
	private _model: IGameModel;
	private _scene: THREE.Scene;
	private _playerOne: boolean;
	private _view: View;
	private _cursor: Cursor;
	private _fabrik: ClientFabrik;

	constructor(fabrik: ClientFabrik, socket: SocketIOClient.Socket) {
		const self = this;
		this._fabrik = fabrik;
		this._adapter = fabrik.createClientAdapter(socket, self);
		this._adapter.registerListeners();
		this._viewBuilder = fabrik.createViewBuilder();
		this._cursor = fabrik.createCursor();
		this._controller = fabrik.createClientController(socket);
	}

	getPlayerNumber() {
		return this._playerOne;
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
		return this._scene;
	}

	injectPlayerNumber(playerOne: boolean) {
		this._playerOne = playerOne;
	}

	getCursor() {
		return this._cursor;
	}

	injectModel(model: IGameModel) {
		this._model = model;
		this._controller.injectModel(model);
		this._viewBuilder.injectModel(model);
		this._view = new View(this._viewBuilder, this._cursor.info());
	}

	messageToSelf(msg: string): void {
		const messagePanel1 = $("#messagesOwn ul");
		this.removeOldMessages(messagePanel1);
		messagePanel1.prepend($("<li class=\"list-group-item\">").text(msg));
	}

	messageToOther(msg: string): void {
		const messagePanel2 = $("#messagesOther ul");
		this.removeOldMessages(messagePanel2);
		messagePanel2.prepend($("<li class=\"list-group-item\">").text(msg));
	}

	removeOldMessages(msgPanel: JQuery<HTMLElement>) {
		msgPanel.children().slice(1).remove();
	}

	updateLoop(): void {
		requestAnimationFrame(this.updateLoop.bind(this));
	}
}