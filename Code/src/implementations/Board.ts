import { IBoardInfo } from "../informationmodel/IBoardInfo";
import { ISettingsInfo } from "../informationmodel/ISettingsInfo";
import { Colors } from "../informationmodel/Colors";
import { IFieldInfo } from "../informationmodel/IFieldInfo";
export class Board {
	private _info: IBoardInfo;
	private _direction: number = 1;

	constructor(info: IBoardInfo) {
		this._info = info;
	}

	placeSettings(info: ISettingsInfo): void {
		info.colorFirst ? this._direction = -1 : this._direction = 1;
		const color = info.colorFirst ? Colors.notsolightgray : Colors.lightgray;
		this._info.fields.forEach((value, index) => {
			value.forEach((v, i) => {
				if (v.changeable) {
					v.color = color;
				}
			});
		});
	}

	getFieldByIndex(x: number, y: number): IFieldInfo {
		return this._info.fields[x][y];
	}

	changeColor(dirChange?: boolean): void {
		if (dirChange || this._info.fields[4][4].color === Colors.black || this._info.fields[4][4].color === Colors.white) {
			this._direction *= -1;
		}
		this._info.fields.forEach((value, index) => {
			value.forEach((v, i) => {
				if (v.changeable) {
					v.color += this._direction;
				}
			});
		});
	}

	activate(): void {
		this._info.isActive = true;
	}

	deactivate(): void {
		this._info.isActive = false;
	}

	getInfo(): IBoardInfo {
		return this._info;
	}
}