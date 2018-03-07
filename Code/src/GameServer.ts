import { PlayerInfo } from "./PlayerInfo";
import { BoardInfo } from "./BoardInfo";
import { SettingsInfo } from "./SettingsInfo";
import { ConnectionManager } from "./ConnectionManager";
import { CursorInfo } from "./CursorInfo";
import { OverlayManager } from "./OverlayManager";

export class GameServer implements SettingsInfo {

	socket: SocketIO.Socket;
	connectionManager: ConnectionManager;
	players: [PlayerInfo, PlayerInfo];
	playerConnections: number = 0;
	turns: number = 0;
	colorIndex: number = 3;
	colorDir: number = 1;
	board: BoardInfo;
	cursor: CursorInfo;
	overlayManager: OverlayManager;

	constructor() {
	}

	public whoGoesFirst(p: PlayerInfo): void {
		throw new Error("Method not implemented.");
	}
	public setColorForPlayer(p: PlayerInfo, c: boolean): void {
		throw new Error("Method not implemented.");
	}

	public nextAction(): void {

	}

	public newPlayerConnected(socketId: string): string {
		if (this.playerConnections > 1) {
			this.players[this.playerConnections] = new PlayerInfo(socketId);
			this.playerConnections++;
		}
		switch (this.playerConnections) {
			case 1:
			return "Player1";
			case 2:
			return "Player2";
			default:
			return "TooManyPlayers";
		}
	}

	private initGame(): void {

	}

	private allowSettings(n: number): void {

	}

	private giveControlToPlayer(n: number): void {
	}

	private resetGame(): void {

	}
}