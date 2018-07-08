import { IClientController } from "./IClientController";
import { IGameModel } from "../../interfaces/IGameModel";
import { EventEmitter } from "events";
import { Cursor } from "./Cursor";

export class ClientController extends EventEmitter implements IClientController {
	private _socket: SocketIOClient.Socket;
	private _model: IGameModel;
	private _view: any;
	private _cursor: Cursor; // most times cursor

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
				this.settingsDone();
				break;
			default:
				console.log("This is the default action for the button handler in the clientController");
		}
	}

	handleKeyInput(ev: JQuery.Event): void {
		if (event.defaultPrevented) {
			return; // Do nothing if the event was already processed
		}
		switch (ev.key) {
			case "ArrowDown":
				this._cursor.move(0, -1);
				break;
			case "ArrowUp":
				this._cursor.move(0, 1);
				// Do something for "up arrow" key press.
				break;
			case "ArrowLeft":
				this._cursor.move(-1, 0);
				// Do something for "left arrow" key press.
				break;
			case "ArrowRight":
				this._cursor.move(1, 0);
				// Do something for "right arrow" key press.
				break;
			case "Enter":
				this._cursor.action();
				// Do something for "enter" or "return" key press.
				break;
			case "Escape":
				// Do something for "esc" key press.
				break;
			default:
				return; // Quit when this doesn't handle the key event.
		}

		// Cancel the default action to avoid it being handled twice
		event.preventDefault();
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

	injectCursor(cursor: Cursor): void {
		this._cursor = cursor;
	}

	figuresHandedOut(): void {
		this._socket.emit("handedFiguresOut");
	}

}