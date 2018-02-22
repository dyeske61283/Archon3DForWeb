import { PlayerInfo } from "./PlayerInfo";

export interface SettingsInfo {
	whoGoesFirst(p: PlayerInfo): void;
	setColorForPlayer(p: PlayerInfo, c: boolean): void;
}