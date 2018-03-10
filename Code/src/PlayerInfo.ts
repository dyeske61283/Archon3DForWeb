export class PlayerInfo {
	// has set of figures
	// controls enabled / disabled
	hasControl: boolean;
	giveControl(value: boolean): void {
		this.hasControl = value;
	}
	// turn
	// connection info
	socketId: string;
	// send msg to player()
	sendMsgToPlayer(msg: string): void {
	}

	isConnected(): boolean {
		return this.socketId !== "";
	}

	constructor(socketId?: string) {
		if (arguments.length > 0) {
			this.socketId = socketId;
		} else {
			this.socketId = "";
		}
		this.hasControl = false;
	}
}