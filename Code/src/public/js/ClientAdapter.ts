import { IClientAdapter } from "./IClientAdapter";
import { IBoardInfo } from "../../informationmodel/IBoardInfo";
import { ISettingsInfo } from "../../informationmodel/ISettingsInfo";
import { IPlayerInfo } from "../../informationmodel/IPlayerInfo";

export class ClientAdapter implements IClientAdapter {
	private _socket: SocketIOClient.Socket;

	constructor(socket: SocketIOClient.Socket) {
		this._socket = socket;
	}
	registerListeners(): void {
		this._socket.on("boardUpdate", this.boardUpdate);
	}

	private boardUpdate(info: IBoardInfo) {
		console.log("Got updated BoardInfo: " + info);
	}

	private settingsUpdate(info: ISettingsInfo) {
		console.log("Got updated SettingsInfo: " + info);
	}

	private playerUpdate(info: IPlayerInfo) {
		console.log("Got updated PlayerInfo" + info);
	}
}