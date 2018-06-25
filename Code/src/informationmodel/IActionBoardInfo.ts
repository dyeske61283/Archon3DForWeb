import { IPlantInfo } from "./IPlantInfo";
import { IActionFigureInfo } from "./IActionFigureInfo";

export interface IActionBoardInfo {
	hp1: number;
	hp2: number;
	maxHP: number;
	figure1: IActionFigureInfo;
	figure2: IActionFigureInfo;
	hindernisse: IPlantInfo[];
	isActive: boolean;
}