import { IClientAdapter } from "./IClientAdapter";
import { IBoardInfo } from "../../informationmodel/IBoardInfo";
import { ISettingsInfo } from "../../informationmodel/ISettingsInfo";
import { IPlayerInfo } from "../../informationmodel/IPlayerInfo";
import { IGameModel } from "../../interfaces/IGameModel";
import { Client } from "./Client";
import { GameModel } from "../../implementations/GameModel";

export class ClientAdapter implements IClientAdapter {
	private _socket: SocketIOClient.Socket;
	private _client: Client;
	constructor(socket: SocketIOClient.Socket, client: Client) {
		this._client = client;
		this._socket = socket;
	}
	registerListeners(): void {
		this._socket.on("boardUpdate", this.boardUpdate.bind(this));
		this._socket.on("playerInstantiated", this.playerUpdate.bind(this));
		this._socket.on("playerTwoConnected", this.secondPlayerUpdate.bind(this));
		this._socket.once("doSettings", this.doSettings.bind(this));
		this._socket.once("settingsChanged", this.settingsUpdate.bind(this));
		this._socket.on("Player1", this.playerOne.bind(this));
		this._socket.on("Player2", this.playerTwo.bind(this));
		this._socket.on("PlayersReady", this.playersReady.bind(this));
		this._socket.on("win", this.youWon.bind(this));
		this._socket.on("lose", this.youLost.bind(this));
		this._socket.on("playerChanged", this.playerUpdate.bind(this));
	}

	playerTwo(jsonModel: string): void {
		const model = JSON.parse(jsonModel) as IGameModel;
		console.log("Player Two Event:" + jsonModel);
		this._client.injectPlayerNumber(false);
		this._client.injectModel(model);
		this._client.messageToSelf("You are Player 2.");
		this._client.messageToOther("Waiting for Player 1 to adjust the settings..");
	}
	playerOne(jsonModel: string): void {
		const model = JSON.parse(jsonModel) as IGameModel;
		console.log("Player One Event:" + model);
		this._client.injectPlayerNumber(true);
		this._client.injectModel(model);
		this._client.messageToSelf("You are Player 1.");
		this._client.messageToOther("Waiting for other player to connect..");
	}

	private boardUpdate(info: IBoardInfo) {
		console.log("Got updated BoardInfo: " + info);
		const board = this._client.getModel().board();
		board.isActive = info.isActive;
		board.fields = info.fields;
	}

	private settingsUpdate(info: ISettingsInfo) {
		console.log("Got updated SettingsInfo: " + info);
		this._client.messageToSelf("Settings got adjusted, let's get started!");
		const settings = this._client.getModel().settings();
		settings.color = info.color;
		settings.colorFirst = info.colorFirst;
		info.color ? this._client.getCursor().injectFigures(this._client.getModel().whiteFigures()) : this._client.getCursor().injectFigures(this._client.getModel().blackFigures());
	}


	private playersReady(): void {
		if (this._client.getPlayerNumber())
			this._client.messageToOther("Player 2 connected. Let's get started with the settings.");
	}

	private playerUpdate(info: IPlayerInfo) {
		console.log("Got updated PlayerInfo" + info);
		if (info.socket.id === this._socket.id) {
		}
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
		$("#settingsPrompt").modal("show");
	}
}