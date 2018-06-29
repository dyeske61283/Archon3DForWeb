import { IClientAdapter } from "./IClientAdapter";
import { IBoardInfo } from "../../informationmodel/IBoardInfo";
import { ISettingsInfo } from "../../informationmodel/ISettingsInfo";
import { IPlayerInfo } from "../../informationmodel/IPlayerInfo";
import { IGameModel } from "../../interfaces/IGameModel";
import { Client } from "./Client";

export class ClientAdapter implements IClientAdapter {
	private _socket: SocketIOClient.Socket;
	private _client: Client;
	constructor(socket: SocketIOClient.Socket, client: Client) {
		this._client = client;
		this._socket = socket;
	}
	registerListeners(): void {
		this._socket.on("boardUpdate", this.boardUpdate);
		this._socket.on("playerInstantiated", this.playerUpdate);
		this._socket.on("playerTwoConnected", this.secondPlayerUpdate);
		this._socket.on("doSetttings", this.doSettings);
		this._socket.on("Player1", this.playerOne);
		this._socket.on("Player2", this.playerTwo);
		this._socket.on("PlayersReady", this.playersReady);
		// this._socket.on("reload");
		this._socket.on("win", this.youWon);
		this._socket.on("lose", this.youLost);
		// this._socket.on("Player2Connected");
	}

	playerTwo(): any {
		this._client.injectPlayerNumber(false);
	}
	playerOne(): any {
		this._client.injectPlayerNumber(true);
	}

	private boardUpdate(info: IBoardInfo) {
		console.log("Got updated BoardInfo: " + info);
	}

	private settingsUpdate(info: ISettingsInfo) {
		console.log("Got updated SettingsInfo: " + info);
	}



	private playersReady(model: IGameModel) {
		this._client.injectModel(model);
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