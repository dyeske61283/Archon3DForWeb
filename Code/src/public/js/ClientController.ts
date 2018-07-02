import { IClientController } from "./IClientController";
import { IGameModel } from "../../interfaces/IGameModel";
import { EventEmitter } from "events";

export class ClientController extends EventEmitter implements IClientController {
	private _socket: SocketIOClient.Socket;
	private _model: IGameModel;
	private _view: any;
	private _context: any; // most times cursor
	constructor(socket: SocketIOClient.Socket) {
		super();
		this._socket = socket;
		this.registerEvents();
		this.sendPlayerConnected();
	}

	registerEvents(): void {
		const btns = $("button");
		btns.click(this.handleInput.bind(this));
		$(document.body).keyup(this.handleKeyInput);
	}
	registerCommands(): void {
	}

	handleInput(ev: JQuery.Event): void {
		const component = ev.target as Element;
		console.log("button pressed: ", component.id);
		// command execute
		switch (component.id) {
			case "btnColorFirst":
				this._model.settings().colorFirst = !this._model.settings().colorFirst;
				break;
			case "btnOwnColor":
				this._model.settings().color = !this._model.settings().color;
				break;
			case "btnSettingsDone":
				console.log("am I reaching the call?");
				this.settingsDone();
				break;
			default:
				console.log("This is the default action for the button handler in the clientController");
		}
	}

	handleKeyInput(ev: JQuery.Event): void {
		switch (ev.key) {
			default:
				console.log("This is the default action for the keyup-Event in the clientController");
		}
	}

	turnFinished() {
		// disable control
		this._socket.emit("turn finished");
	}

	settingsDone() {
		console.log("sending settings to server");
		this._socket.emit("settings", this._model.settings());
		$("#myModal").modal("hide");
	}

	sendPlayerConnected() {
		this._socket.emit("playerConnected");
	}

	injectModel(model: IGameModel) {
		this._model = model;
	}

}