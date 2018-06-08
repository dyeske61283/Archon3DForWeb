import { IClientController } from "./IClientController";
import { IGameModel } from "../../interfaces/IGameModel";

export class ClientController implements IClientController {
	private _socket: SocketIOClient.Socket;
	private _model: IGameModel;
	private _view: any;
	private _context: any; // most times cursor
	constructor(socket: SocketIOClient.Socket) {
		this._socket = socket;
		this.registerEvents();
	}

	registerEvents(): void {
		const btns = $("button");
		btns.on("click", this.handleInput.bind(this));
		// $(document.body).keyup(this.handleInput);
	}
	registerCommands(): void {
	}

	handleInput(ev: JQuery.Event): void {
		const component = ev.target;
		console.log("button {0} pressed!", component);
		// command execute
	}

	turnFinished() {
		// disable control

		this._socket.emit("turn finished");
	}

	settingsDone(ev: JQuery.Event) {
		this._socket.emit("settingsDone", this._model.settings);
	}


}