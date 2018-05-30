import { IServerController } from "../interfaces/IServerController";
import { IGameModel } from "../interfaces/IGameModel";
import { ISettingsInfo } from "../informationmodel/ISettingsInfo";


export class ServerController implements IServerController {
	private _model: IGameModel;
	private _p1: SocketIO.Socket;
	private _p2: SocketIO.Socket;

	constructor(model: IGameModel, p1: SocketIO.Socket, p2: SocketIO.Socket) {
		this._model = model;
		this._p1 = p1;
		this._p2 = p2;
	}

	registerMsgListeners(): void {
		this._p1.on("input", this.inputP1ToModel.bind(this));
		this._p1.on("settings", this.settingsToModel.bind(this));
		this._p2.on("input", this.inputP2ToModel.bind(this));
	}

	model(): IGameModel {
		return this._model;
	}

	private inputP1ToModel(input: any): void {
		console.log("passing the input event from p1 to the model: " + input);
	}

	private inputP2ToModel(input: any): void {
		console.log("passing the input event from p2 to the model: " + input);
	}

	private settingsToModel(settings: ISettingsInfo): void {
		console.log("passing the settings event to the model: " + settings.colorFirst + " " + settings.color);
		this._model.setSettings(settings);
	}

	private onFinishedTurn(): void {

	}
}