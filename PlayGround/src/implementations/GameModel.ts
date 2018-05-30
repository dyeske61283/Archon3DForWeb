import { IGameModel } from "../interfaces/IGameModel";
import { ISettingsInfo } from "../informationmodel/ISettingsInfo";
import { IPlayerInfo } from "../informationmodel/IPlayerInfo";
import { IServerAdapter } from "../interfaces/IServerAdapter";

export class GameModel implements IGameModel {
	private _players: IPlayerInfo[];
	private _settings: ISettingsInfo;
	private _observers: IServerAdapter[];
	constructor() {
		this._players = [];
		this._observers = [];
		this._settings = {color: false, colorFirst: false};
	}

	players(): IPlayerInfo[] {
		return this._players;
	}
	settings(): ISettingsInfo {
		return this._settings;
	}

	setSettings(settings: ISettingsInfo): void {
		this._settings = settings;
		this.notify(this._settings, "settingsChanged");
	}

	setPlayer(p: IPlayerInfo, index: number): void {
		this._players[index] = p;
		this.notify(this._players[index], "playerChanged");
	}

	public addObserver(o: IServerAdapter): void {
		this._observers.push(o);
	}
	public removeObserver(o: IServerAdapter): void {
		this._observers = this._observers.filter(item => item !== o);
	}

	public notify(entity: any, event: string): void {
		this._observers.forEach(item => item.onNotify(entity, event));
	}
}