import { IGameModel } from "../interfaces/IGameModel";
import { ISettingsInfo } from "../informationmodel/ISettingsInfo";
import { IPlayerInfo } from "../informationmodel/IPlayerInfo";
import { IServerAdapter } from "../interfaces/IServerAdapter";
import { IBoardInfo } from "../informationmodel/IBoardInfo";
import { Colors } from "../informationmodel/Colors";
import { ModelBuilder } from "./ModelBuilder";
import { IFigureInfo } from "../informationmodel/IFigureInfo";
import { IActionBoardInfo } from "../informationmodel/IActionBoardInfo";

export class GameModel implements IGameModel {
	private _players: IPlayerInfo[];
	private _settings: ISettingsInfo;
	private _observers: IServerAdapter[];
	private _board: IBoardInfo;
	private _blackFigures: IFigureInfo[];
	private _whiteFigures: IFigureInfo[];
	private _defeatedFiguresWhite: IFigureInfo[];
	private _defeatedFiguresBlack: IFigureInfo[];
	private _actionField: IActionBoardInfo;

	constructor(builder: ModelBuilder) {
		this._players = [];
		this._observers = [];
		this._settings = builder.buildSettings();
		this._board = builder.buildBoard();
		this._actionField = builder.buildActionBoard();
		this._players.push(builder.buildPlayer());
		this._players.push(builder.buildPlayer());
		this._blackFigures = builder.buildFigureBlack();
		this._whiteFigures = builder.buildFiguresWhite();
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

	blackFigures(): IFigureInfo[] {
		return this._blackFigures;
	}

	whiteFigures(): IFigureInfo[] {
		return this._whiteFigures;
	}

	actionBoard(): IActionBoardInfo {
		return this._actionField;
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