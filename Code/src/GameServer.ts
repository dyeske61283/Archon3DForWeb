import { PlayerInfo } from "./PlayerInfo";
import { BoardInfo } from "./BoardInfo";
import { SettingsInfo } from "./SettingsInfo";
import { ConnectionManager } from "./ConnectionManager";
import { CursorInfo } from "./CursorInfo";
import { OverlayManager } from "./OverlayManager";
import { MsgTypes } from "./overlayMessages";
export class GameServer implements SettingsInfo {

	socket: SocketIO.Socket;
	connectionManager: ConnectionManager;
	players: PlayerInfo[] = [];
	playerConnections: number = 0;
	maxPlayers: number = 2;
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

	public newPlayerConnected(socketId: string): MsgTypes {
		if (this.playerConnections < this.maxPlayers) {
			for (let i = 0; i < this.maxPlayers; i++) {
				if (this.players[i] === undefined) {
					this.players[this.playerConnections] = new PlayerInfo(socketId);
				}
			}
			this.playerConnections++;
		} else {
			return MsgTypes.TooManyPlayers;
		}
		switch (this.playerConnections) {
			case 1:
			return MsgTypes.Player1Connected;
			case 2:
			return MsgTypes.Player2Connected;
			default:
			return MsgTypes.TooManyPlayers;
		}
	}

	public playerDisconnected(socketId: string): MsgTypes {
		for (let i = 0; i < this.maxPlayers; i++) {
			if (this.players[i] !== undefined && this.players[i].socketId === socketId) {
				this.playerConnections--;
				this.players[i] = undefined;
				if (i === 0) {return MsgTypes.Player1Disconnected; }
				else { return MsgTypes.Player2Disconnected; }
			}
		}
		return undefined;
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