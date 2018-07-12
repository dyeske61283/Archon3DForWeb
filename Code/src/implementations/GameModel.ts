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
import { Board } from "./Board";
import { Player } from "./Player";

export class GameModel implements IGameModel {
	_players: IPlayerInfo[];
	_Players: Player[];
	_settings: ISettingsInfo;
	_observers: IServerAdapter[];
	_board: IBoardInfo;
	_Board: Board;
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
		this.injectInfoIntoGameObjects();
	}

	players(): IPlayerInfo[] {
		return this._players;
	}
	settings(): ISettingsInfo {
		return this._settings;
	}

	board(): IBoardInfo {
		return this._Board.getInfo();
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
		console.log("setSettings called with: " + JSON.stringify(settings));
		this._settings = settings;
		this.notify(this._settings, "settingsChanged");
		// update board tiles
		this._Board.placeSettings(settings);
		this.notify(this._Board.getInfo(), "boardChanged");
		// update PlayerInfo
		if (settings.color) {
			this._Players[0].placeSettings(settings, this._whiteFigures);
			settings.color = !settings.color;
			this._Players[1].placeSettings(settings, this._blackFigures);
		} else {
			this._Players[0].placeSettings(settings, this._blackFigures);
			settings.color = !settings.color;
			this._Players[1].placeSettings(settings, this._whiteFigures);
		}
		this.setPlayer(this._Players[0].getInfo(), 0);
		this.setPlayer(this._Players[1].getInfo(), 1);
		// show board, start rendering loop
		// hand out figures
		this.notify( undefined, "handOutFigures");
	}
	setPlayer(p: IPlayerInfo, index: number): void {
		console.log("setPlayer called with: " + JSON.stringify(p) + " and " + index);
		this._players[index] = p;
		this.notify(this._players[index], "playerChanged");
	}

	startTurns(): void {
		console.log("startTurns called");
		this.notify( undefined, "startTurn");
	}

	turnChange(): void {
		const p1 = this._Players[0].getInfo();
		const p2 = this._Players[1].getInfo();
		const first = p1.figureColor === this._settings.colorFirst;
		if (p1.hasControl) {
			this._Players[0].deactivateControl();
			this._Players[1].activateControl();
		} else {
			this._Players[0].activateControl();
			this._Players[1].deactivateControl();
		}
		// check for board update
		if (p1.hasControl === first) {
			this._Board.changeColor();
			this.notify(this._board, "boardChanged");
		}
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

	private injectInfoIntoGameObjects(): void {
		this._Board = new Board(this._board);
		this._Players = [new Player(this._players[0]), new Player(this._players[1])];
	}

}