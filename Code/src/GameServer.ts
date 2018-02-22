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

	private initGame(): void {

	}

	private allowSettings(n: number): void {

	}

	private giveControlToPlayer(n: number): void {
	}

	private resetGame(): void {

	}
}