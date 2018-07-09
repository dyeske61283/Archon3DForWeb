import { IPlayerInfo } from "../informationmodel/IPlayerInfo";
import { ISettingsInfo } from "../informationmodel/ISettingsInfo";
import { IServerAdapter } from "./IServerAdapter";
import { IBoardInfo } from "../informationmodel/IBoardInfo";
import { IFigureInfo } from "../informationmodel/IFigureInfo";
import { IActionBoardInfo } from "../informationmodel/IActionBoardInfo";
import { IActionFigureInfo } from "../informationmodel/IActionFigureInfo";
import { ISpell } from "../informationmodel/ISpell";

// owns all Info-objects from the server
export interface IGameModel {
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
}