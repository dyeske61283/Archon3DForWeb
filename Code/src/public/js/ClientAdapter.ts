import { IClientAdapter } from "./IClientAdapter";
import { IBoardInfo } from "../../informationmodel/IBoardInfo";
import { ISettingsInfo } from "../../informationmodel/ISettingsInfo";
import { IPlayerInfo } from "../../informationmodel/IPlayerInfo";

export class ClientAdapter implements IClientAdapter {
	private _socket: SocketIOClient.Socket;

	constructor(socket: SocketIOClient.Socket) {
		this._socket = socket;
		this.registerListeners();
	}
	registerListeners(): void {
		this._socket.on("boardUpdate", this.boardUpdate);
		this._socket.on("playerInstantiated", this.playerUpdate);
		this._socket.on("playerTwoConnected", this.secondPlayerUpdate);
		this._socket.on("win", this.youWon);
		this._socket.on("lose", this.youLost);
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

	private secondPlayerUpdate(infoP2: IPlayerInfo) {
		console.log("Got updated PlayerInfo" + infoP2);
	}

	private youWon() {
		$("#alertWin").show();
		setTimeout(() => location.reload(), 5000);
	}

	private youLost() {
		const alertBox = $("#alertWin");
		alertBox.removeClass("alert-success").addClass("alert-danger").html("<strong>Lose!</strong> Next time you'll win! The page will refresh in a few seconds for your next try.");
		alertBox.show();
		setTimeout(() => location.reload(), 5000);
	}

	private doSettings() {
		$("#myModal").modal("show");
	}
}