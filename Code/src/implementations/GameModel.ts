import { IGameModel } from "../interfaces/IGameModel";
import { ISettingsInfo } from "../informationmodel/ISettingsInfo";
import { IPlayerInfo } from "../informationmodel/IPlayerInfo";
import { IServerAdapter } from "../interfaces/IServerAdapter";
import { IBoardInfo } from "../informationmodel/IBoardInfo";
import { ModelBuilder } from "./ModelBuilder";
import { IFigureInfo } from "../informationmodel/IFigureInfo";
import { IActionBoardInfo } from "../informationmodel/IActionBoardInfo";
import { IActionFigureInfo } from "../informationmodel/IActionFigureInfo";

export class GameModel implements IGameModel {
	private _players: IPlayerInfo[];
	private _settings: ISettingsInfo;
	private _observers: IServerAdapter[];
	private _board: IBoardInfo;
	private _blackFigures: IFigureInfo[];
	private _whiteFigures: IFigureInfo[];
	private _defeatedFiguresWhite: IFigureInfo[];
	private _defeatedFiguresBlack: IFigureInfo[];
	private _elementals: IActionFigureInfo[];
	private _actionField: IActionBoardInfo;
	private _spells: any[];
	private _builder: ModelBuilder;

	constructor(builder: ModelBuilder) {
		this._builder = builder;
		this.init();
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

	defeatedBlackFigures(): IFigureInfo[] {
		return this._defeatedFiguresBlack;
	}

	spells(): any[] {
		return this._spells;
	}

	elementals(): IActionFigureInfo[] {
		return this._elementals;
	}

	defeatedWhiteFigures(): IFigureInfo[] {
		return this._defeatedFiguresWhite;
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

	public reset(): void {
		this.init();
	}

	private init(): void {
		this._players = [];
		this._observers = [];
		this._defeatedFiguresBlack = [];
		this._defeatedFiguresWhite = [];
		this._spells = [];
		this._settings = this._builder.buildSettings();
		this._board = this._builder.buildBoard();
		this._actionField = this._builder.buildActionBoard();
		this._players.push(this._builder.buildPlayer());
		this._players.push(this._builder.buildPlayer());
		this._blackFigures = this._builder.buildFigureBlack();
		this._whiteFigures = this._builder.buildFiguresWhite();
		this._elementals = this._builder.buildElementals();
	}

}