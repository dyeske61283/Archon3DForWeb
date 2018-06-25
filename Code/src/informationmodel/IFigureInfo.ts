import { IFieldInfo } from "./IFieldInfo";
import { IActionFigureInfo } from "./IActionFigureInfo";

export interface IFigureInfo {
	name: string;
	pos: [number, number];
	range: number;
	movementType: any;
	color: boolean;
	field: IFieldInfo;
	actionInfo: IActionFigureInfo;
}