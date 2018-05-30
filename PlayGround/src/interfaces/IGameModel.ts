import { IPlayerInfo } from "../informationmodel/IPlayerInfo";
import { ISettingsInfo } from "../informationmodel/ISettingsInfo";
import { IServerAdapter } from "./IServerAdapter";

// owns all Info-objects from the server
export interface IGameModel {
	players(): IPlayerInfo[];
	settings(): ISettingsInfo;
	setSettings(settings: ISettingsInfo): void;
	setPlayer(p: IPlayerInfo, index: number): void;
	// board(): IBoardInfo;
	// figures(): IFigureInfo[];


	addObserver(o: IServerAdapter): void;
	removeObserver(o: IServerAdapter): void;
	notify(entity: any, event: string): void;
}