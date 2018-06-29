import { IPlayerInfo } from "../informationmodel/IPlayerInfo";
import { ISettingsInfo } from "../informationmodel/ISettingsInfo";
import { IServerAdapter } from "./IServerAdapter";
import { IBoardInfo } from "../informationmodel/IBoardInfo";
import { IFigureInfo } from "../informationmodel/IFigureInfo";
import { IActionBoardInfo } from "../informationmodel/IActionBoardInfo";
import { IActionFigureInfo } from "../informationmodel/IActionFigureInfo";

// owns all Info-objects from the server
export interface IGameModel {
	players(): IPlayerInfo[];
	settings(): ISettingsInfo;
	setSettings(settings: ISettingsInfo): void;
	setPlayer(p: IPlayerInfo, index: number): void;
	board(): IBoardInfo;
	blackFigures(): IFigureInfo[];
	whiteFigures(): IFigureInfo[];
	actionBoard(): IActionBoardInfo;
	spells(): any[];
	elementals(): IActionFigureInfo[];


	addObserver(o: IServerAdapter): void;
	removeObserver(o: IServerAdapter): void;
	notify(entity: any, event: string): void;
	reset(): void;
}