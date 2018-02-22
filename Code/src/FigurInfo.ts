export interface FigurInfo {
	HP: number;
	fieldInfo: any;
	position: [number, number];
	moveDistance: number;
	moveSpeed: number;
	atkPower: number;
	atkSpeed: number;
	name: string;
	isFlying: boolean;
	imprisoned: boolean;

	move(): void;
}