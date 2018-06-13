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

	board(): IBoardInfo {
		return this._board;
	}

	setSettings(settings: ISettingsInfo): void {
		this._settings = settings;
		this.notify(this._settings, "settingsChanged");
	}

	setPlayer(p: IPlayerInfo, index: number): void {
		this._players[index] = p;
		this.notify(this._players[index], "playerChanged");
	}

	private setPowerFields() {
		this._board.fields[0][4].isPowerfield = true;
		this._board.fields[4][0].isPowerfield = true;
		this._board.fields[4][4].isPowerfield = true;
		this._board.fields[4][8].isPowerfield = true;
		this._board.fields[8][4].isPowerfield = true;
	}

	private buildBoard() {
		const maxFields = 9;
        let recentColor = Colors.lightgray;
        this._board = {isActive: false, fields: []};
		for (let i = 0; i < maxFields; i++) {
			this._board.fields[i] = [];
			for (let j = 0; j < maxFields; j++) {
                this._board.fields[i][j] = {y: i, x: j, changeable: false, color: Colors.black, isPowerfield: false};
			}
		}
		// midle green lanes
		for (let j = 0; j < maxFields; j++) {
			this._board.fields[j][4].changeable = true;
			this._board.fields[j][4].color = recentColor;
			if (j > 0 && j < maxFields - 1) {
				this._board.fields[4][j].color = recentColor;
				this._board.fields[4][j].changeable = true;
			}
		}
        let z = 3;
		// other greens
		for (let i = 0; i < 4; i++) {
            this._board.fields[z][i].color = recentColor;
			this._board.fields[z][i].changeable = true;
			this._board.fields[z][maxFields - i - 1].color = recentColor;
			this._board.fields[z][maxFields - i - 1].changeable = true;
			this._board.fields[maxFields - z - 1][i].color = recentColor;
			this._board.fields[maxFields - z - 1][i].changeable = true;
			z--;
        }
        z = 3;
        for (let i = 0; i < 4; i++) {
            this._board.fields[maxFields - i - 1][maxFields - z - 1].color = recentColor;
            this._board.fields[maxFields - i - 1][maxFields - z - 1].changeable = true;
            z--;
        }
        recentColor = Colors.black;
        this._board.fields.forEach((value, index) => {
            value.forEach((value, index) => {
                if (!value.changeable) {
                    value.color = recentColor;
                    if ((index !== 8 || value.y === 4) && !((value.y === 5) && (index === 7))) {
                        recentColor === Colors.black ? recentColor = Colors.white : recentColor = Colors.black;
                    }
                }
            });
		});
		this.setPowerFields();
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