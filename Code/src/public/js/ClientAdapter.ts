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
	private _playerUpdateCount: number;
	constructor(socket: SocketIOClient.Socket, client: Client) {
		this._client = client;
		this._socket = socket;
		this._playerUpdateCount = 0;
	}
	registerListeners(): void {
		this._socket.on("boardChanged", this.boardUpdate.bind(this));
		this._socket.on("playerInstantiated", this.playerUpdate.bind(this));
		this._socket.once("doSettings", this.doSettings.bind(this));
		this._socket.once("settingsChanged", this.settingsUpdate.bind(this));
		this._socket.on("Player1", this.playerOne.bind(this));
		this._socket.on("Player2", this.playerTwo.bind(this));
		this._socket.on("PlayersReady", this.playersReady.bind(this));
		this._socket.on("win", this.youWon.bind(this));
		this._socket.on("lose", this.youLost.bind(this));
		this._socket.on("playerChanged0", this.playerUpdate.bind(this));
		this._socket.on("playerChanged1", this.playerUpdate2.bind(this));
		this._socket.on("handOutFigures", this.handOutFigures.bind(this));
		this._socket.on("startTurn", this.startTurns.bind(this));
	}

	handOutFigures(): void {
		console.log("called handOutFigures()");
		this._client.getView().walkInFigures();
	}

	startTurns(): void {
		const pNum = this._client.getPlayerNumber() ? 1 : 0;
		const model = this._client.getModel();
		console.log("called startTurns() with FigureColor " + model._players[pNum].figureColor + " and ColorFirst " + model._settings.colorFirst);
		if (model._players[pNum].figureColor === model._settings.colorFirst) {
			this.yourTurn();
		} else {
			this._client.messageToOther("It's the other players turn.");
		}
	}

	playerTwo(jsonModel: string): void {
		const model = JSON.parse(jsonModel) as IGameModel;
		this._client.injectPlayerNumber(false);
		this._client.injectModel(model);
		this._client.messageToSelf("You are Player 2.");
		this._client.messageToOther("Waiting for Player 1 to adjust the settings..");
	}
	playerOne(jsonModel: string): void {
		const model = JSON.parse(jsonModel) as IGameModel;
		this._client.injectPlayerNumber(true);
		this._client.injectModel(model);
		this._client.messageToSelf("You are Player 1.");
		this._client.messageToOther("Waiting for other player to connect..");
	}

	yourTurn(): void {
		console.log("called yourTurn()");
		this._client.messageToSelf("It's your turn!");
		this._client.getCursor().control(true);
	}


	private boardUpdate(info: IBoardInfo) {
		console.log("Got updated BoardInfo: " + info);
		const board = this._client.getModel()._board;
		board.isActive = info.isActive;
		board.fields = info.fields;
		if (board.isActive && board.isActive !== info.isActive) {
			this._client.getView().activateScene();
		}
	}

	private settingsUpdate(info: ISettingsInfo) {
		console.log("Got updated SettingsInfo: " + info);
		this._client.messageToSelf("Settings got adjusted, let's get started!");
		const settings = this._client.getModel()._settings;
		settings.color = info.color;
		settings.colorFirst = info.colorFirst;
		this.injectFigures(info);
	}


	private playersReady(): void {
		console.log("handler for playersReady called");
		if (this._client.getPlayerNumber())
			this._client.messageToOther("Player 2 connected. Let's get started with the settings.");
	}

	private playerUpdate(info: IPlayerInfo) {
		console.log("Got updated PlayerInfo");
		this._playerUpdateCount++;
		this._client.getModel()._players[0] = info;
	}

	private playerUpdate2(info: IPlayerInfo) {
		console.log("Got updated PlayerInfo");
		this._playerUpdateCount++;
		this._client.getModel()._players[1] = info;
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
		console.log("handler for settings called");
		$("#settingsPrompt").modal("show");
	}

	private injectFigures(info: ISettingsInfo) {
		info.color ? this._client.getCursor().injectFigures(this._client.getModel()._whiteFigures) : this._client.getCursor().injectFigures(this._client.getModel()._blackFigures);
	}
}