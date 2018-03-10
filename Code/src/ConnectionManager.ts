import { PlayerInfo } from "./PlayerInfo";

export class ConnectionManager {

	state: number;
	constructor() {
		this.state = 0;

	}

	playerConnects(id: string): PlayerInfo {
		switch (this.state) {
			case 0:
			case 1:
			this.state++;
			return new PlayerInfo(id);
			case 2:
			return undefined;
		}
	}

	playerDisconnects(id: string): void {
		this.state--;
	}
}