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
	sendMsgToPlayer(): void {

	}

	constructor(socketId: string) {
		this.socketId = socketId;
		this.hasControl = false;
	}
}