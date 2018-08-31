import { IClientController } from "./IClientController";
import { IGameModel } from "../../interfaces/IGameModel";
import { EventEmitter } from "events";
import { Cursor } from "./Cursor";

export class ClientController extends EventEmitter implements IClientController {
	private _socket: SocketIOClient.Socket;
	private _model: IGameModel;
	private _view: EventEmitter;
	private _cursor: Cursor; // most times cursor
	private _actionActive = false;
	private _actionCommand: (context: any) => void;

	constructor(socket: SocketIOClient.Socket) {
		super();
		this._socket = socket;
		this.registerEvents();
		this.sendPlayerConnected();
	}

	registerEvents(): void {
		const btns = $("button");
		btns.click(this.handleInput.bind(this));
		$(document.body).keyup(this.handleKeyInput.bind(this));
	}

	injectView(view: EventEmitter): void {
		this._view = view;
		this._view.on("figuresHandedOut", this.figuresHandedOut.bind(this));
	}

	registerCommands(): void {
	}

	handleInput(ev: JQuery.Event): void {
		const component = ev.target as Element;
		console.log("button pressed: ", component.id);
		// command execute
		switch (component.id) {
			case "btnColorFirst":
				this._model._settings.colorFirst = !this._model._settings.colorFirst;
				break;
			case "btnOwnColor":
				this._model._settings.color = !this._model._settings.color;
				break;
			case "btnSettingsDone":
				this.settingsDone();
				break;
			default:
				console.log("This is the default action for the button handler in the clientController");
		}
	}

	handleKeyInput(ev: JQuery.Event): void {
		console.log("Keys are getting hit and registered: " + ev.key);
		if (ev.isDefaultPrevented) {
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
		ev.preventDefault();
	}

	turnFinished() {
		// disable control
		this._socket.emit("turn finished");
	}

	settingsDone() {
		console.log("sending settings to server");
		this._socket.emit("settings", this._model._settings);
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
		console.log("called figuresHandedOut");
		this._socket.emit("handedFiguresOut");
	}

}