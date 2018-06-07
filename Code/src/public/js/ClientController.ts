import { IClientController } from "./IClientController";

export class ClientController implements IClientController {
	private _socket: SocketIOClient.Socket;
	private _context: any; // most times cursor

	constructor(socket: SocketIOClient.Socket) {
		this._socket = socket;
	}

	registerEvents(): void {
		throw new Error("Method not implemented.");
	}
	registerCommands(): void {
		$(document.body).keyup(this.handleInput);
	}

	handleInput() {

	}

	turnFinished() {
		// disable control

		this._socket.emit("turn finished");
	}
}