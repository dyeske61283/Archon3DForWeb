export class GameServer {
	private socket: SocketIO.Socket;
	playerOne: any;
	playerTwo: any;
	turns: number = 0;
	colorIndex: number = 3;
	colorDir: number = 1;
	constructor() {
	}

	set Socket(socket: SocketIO.Socket) {
		this.socket = socket;
	}
	public nextTurn(socket: SocketIO.Socket): void {
		this.turns++;

		console.log("executing next Turn: " + this.turns);
		if ((this.turns % 2) === 0) {

			console.log("sending color change event");
			socket.emit("colorChange", this.colorIndex);
			if (this.colorIndex == 5) {
				this.colorDir = -1;
			}
			if (this.colorIndex == 0) {
				this.colorDir = 1;
			}
			this.colorIndex += this.colorDir;
		}
	}
}