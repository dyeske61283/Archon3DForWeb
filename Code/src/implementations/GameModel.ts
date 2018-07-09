import { IGameModel } from "../interfaces/IGameModel";
import { ISettingsInfo } from "../informationmodel/ISettingsInfo";
import { IPlayerInfo } from "../informationmodel/IPlayerInfo";
import { IServerAdapter } from "../interfaces/IServerAdapter";
import { IBoardInfo } from "../informationmodel/IBoardInfo";
import { ModelBuilder } from "./ModelBuilder";
import { IFigureInfo } from "../informationmodel/IFigureInfo";
import { IActionBoardInfo } from "../informationmodel/IActionBoardInfo";
import { IActionFigureInfo } from "../informationmodel/IActionFigureInfo";
import { ISpell } from "../informationmodel/ISpell";

export class GameModel implements IGameModel {
	_players: IPlayerInfo[];
	_settings: ISettingsInfo;
	_observers: IServerAdapter[];
	_board: IBoardInfo;
	_blackFigures: IFigureInfo[];
	_whiteFigures: IFigureInfo[];
	_defeatedFiguresWhite: IFigureInfo[];
	_defeatedFiguresBlack: IFigureInfo[];
	_elementals: IActionFigureInfo[];
	_actionField: IActionBoardInfo;
	_spells: ISpell[];

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
		// update board tiles
		// update PlayerInfo
		// show board, start rendering loop
		// hand out figures
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