import { PlayerInfo } from "./PlayerInfo";
import { BoardInfo } from "./BoardInfo";
import { ConnectionManager } from "./ConnectionManager";
import { CursorInfo } from "./CursorInfo";
import { MsgTypes, OverlayMessages } from "./overlayMessages";
export class GameServer {

	socketServer: SocketIO.Server;
	connectionManager: ConnectionManager;
	players: PlayerInfo[] = [];
	playerConnections: number = 0;
	maxPlayers: number = 2;
	turns: number = 0;
	gameReady: boolean = false;
	colorIndex: number = 3;
	colorDir: number = 1;
	board: BoardInfo;
	cursor: CursorInfo;
	messagePlayer: string[] = undefined;
	openMessages: boolean = false;
	messages: OverlayMessages;

	constructor(socketServer: SocketIO.Server) {
		this.messages = new OverlayMessages();
		this.messagePlayer = [];
		this.socketServer = socketServer;
		this.socketServer.on("connection", this.newPlayerConnected);
	}

	private whoGoesFirst(p: number): void {
		this.players[p].goesFirst = true;
	}
	private setColorForPlayer(p: number, c: boolean): void {
		this.players[p].figureColor = c;
	}

	public sendMessage(type: MsgTypes, socket: SocketIO.Socket): void {
		const msg = this.messages.getMessageByType(type);
		if (msg !== "") {
			socket.emit("playerMsg", msg);
		}
	}

	public newPlayerConnected(socket: SocketIO.Socket): void {
		let msg: MsgTypes;
		if (this.playerConnections === this.maxPlayers) {
			// reject
			msg = MsgTypes.TooManyPlayers;
		} else {
			this.players[this.playerConnections] = new PlayerInfo(socket.id);
			socket.on("disconnect", () => {
				if (this.playerConnections === 2) {
					if (socket.id === this.players[1].socketId) {
						this.players.splice(1, 1);
						this.players[0].message = MsgTypes.Player2Disconnected;
					} else {
						this.players.splice(0, 1, this.players[1]);
				 		this.players.splice(1, 1);
				 		this.players[0].message = MsgTypes.Player1Disconnected;
					}
					this.openMessages = true;
				} else {
					this.players.splice(0, 1);
				}
				if (this.openMessages) {
					this.sendMessage(this.players[0].message, this.socketServer.sockets.connected[this.players[0].socketId]);
				}
			});
			if (this.playerConnections === 1) {
				this.players[this.playerConnections].message = MsgTypes.Player1Connected;
				msg = MsgTypes.Player1Connected;
			} else {
				this.players[0].message = MsgTypes.MakeSettings;
				msg = MsgTypes.Player2Connected;
				this.openMessages = true;
			}
			this.playerConnections++;
		}
		this.sendMessage(msg, socket);
		if (this.openMessages) {
			this.sendMessage(this.players[0].message, this.socketServer.sockets.connected[this.players[0].socketId]);
		}
	}

	private initGame(): void {

	}

	public updateSettings(goingFirst: number, color: boolean): void {
		this.whoGoesFirst(goingFirst);
		this.setColorForPlayer(goingFirst, color);
		this.setColorForPlayer(1 - goingFirst, !color);
	}

	private allowSettings(n: number): void {

	}

	private giveControlToPlayer(n: number): void {
	}

	private resetGame(): void {

	}
}