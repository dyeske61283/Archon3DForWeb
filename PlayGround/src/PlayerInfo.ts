import { FigurInfo } from "./FigurInfo";

export class PlayerInfo {
	// has set of figures
	// controls enabled / disabled
	hasControl: boolean;
	figureColor: boolean;
	figures: FigurInfo[];
	message: number = -1;
	goesFirst: boolean;
	giveControl(value: boolean): void {
		this.hasControl = value;
	}
	// connection info
	socketId: string;

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