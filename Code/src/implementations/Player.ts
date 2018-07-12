import { IPlayerInfo } from "../informationmodel/IPlayerInfo";
import { ISettingsInfo } from "../informationmodel/ISettingsInfo";
import { IFigureInfo } from "../informationmodel/IFigureInfo";

export class Player {
	private _info: IPlayerInfo;

	constructor(info: IPlayerInfo) {
		this._info = info;
	}

	placeSettings(settings: ISettingsInfo, figures: IFigureInfo[] ): void {
		this._info.figureColor = settings.color;
		this._info.hasControl = settings.color === settings.colorFirst;
		this._info.figures = figures;
	}

	checkForLoss(): boolean {
		return this._info.figures.length === 0;
	}

	activateControl(): void {
		this._info.hasControl = true;
	}

	deactivateControl(): void {
		this._info.hasControl = false;
	}

	getInfo(): IPlayerInfo {
		return this._info;
	}

	injectSocket(socket: SocketIO.Socket): void {
		this._info.socket = socket;
	}
}