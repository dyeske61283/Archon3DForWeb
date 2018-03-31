import { PlayerInfo } from "./PlayerInfo";

export class ConnectionManager {


	validConnectionState: boolean = false;
	state: number;
	constructor() {
		this.state = 0;

	}

	playerConnects(id: string, players: PlayerInfo[]): PlayerInfo {
		switch (this.state) {
			case 0:
			case 1:
			this.state++;
			return new PlayerInfo(id);
			case 2:
			return undefined;
		}
	}

	playerDisconnects(id: string, players: PlayerInfo[]): void {
		this.state--;
	}
}