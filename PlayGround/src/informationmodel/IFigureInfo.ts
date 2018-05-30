import { IFieldInfo } from "./IFieldInfo";

export interface IFigureInfo {
	name: string;
	pos: [number, number];
	range: number;
	movementType: any;
	color: boolean;
	field: IFieldInfo;
}