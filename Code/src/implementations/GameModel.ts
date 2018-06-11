import { IGameModel } from "../interfaces/IGameModel";
import { ISettingsInfo } from "../informationmodel/ISettingsInfo";
import { IPlayerInfo } from "../informationmodel/IPlayerInfo";
import { IServerAdapter } from "../interfaces/IServerAdapter";
import { IBoardInfo } from "../informationmodel/IBoardInfo";
import { Colors } from "../informationmodel/Colors";

export class GameModel implements IGameModel {
	private _players: IPlayerInfo[];
	private _settings: ISettingsInfo;
	private _observers: IServerAdapter[];
	private _board: IBoardInfo;
	constructor() {
		this._players = [];
		this._observers = [];
		this._settings = {color: false, colorFirst: false};
		this.buildBoard();
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

	private buildBoard() {
		const maxFields = 9;
		let recentColor = Colors.lightgray;
		this._board.isActive = false;
		this._board.fields = [];
		for (let i = 0; i < maxFields; i++) {
			this._board.fields[i] = [];
			for (let j = 0; j < maxFields; j++) {
				this._board.fields[i][j].x = i;
				this._board.fields[i][j].y = j;
			}
		}
		// midle green lanes
		for (let j = 0; j < maxFields; j++) {
			this._board.fields[4][j].changeable = true;
			this._board.fields[4][j].color = recentColor;
			if (j > 0 && j < maxFields - 1) {
				this._board.fields[j][4].color = recentColor;
				this._board.fields[j][4].changeable = true;
			}
		}

		// other greens
		for (let i = 0; i < 4; i++) {
			let j = 3;
			this._board.fields[j][i].color = recentColor;
			this._board.fields[j][i].changeable = true;
			this._board.fields[j][maxFields - i - 1].color = recentColor;
			this._board.fields[j][maxFields - i - 1].changeable = true;
			this._board.fields[maxFields - j - 1][i].color = recentColor;
			this._board.fields[maxFields - j - 1][i].changeable = true;
			j--;
		}
		recentColor = Colors.black;
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