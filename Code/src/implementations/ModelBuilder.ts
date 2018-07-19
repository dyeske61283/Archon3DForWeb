import { IBoardInfo } from "../informationmodel/IBoardInfo";
import { Colors } from "../informationmodel/Colors";
import { ISettingsInfo } from "../informationmodel/ISettingsInfo";
import { IFigureInfo } from "../informationmodel/IFigureInfo";
import { IPlayerInfo } from "../informationmodel/IPlayerInfo";
import { IActionBoardInfo } from "../informationmodel/IActionBoardInfo";
import { readFileSync, read } from "fs";
import { IActionFigureInfo } from "../informationmodel/IActionFigureInfo";

export class ModelBuilder {

	buildBoard(): IBoardInfo {
		const maxFields = 9;
        let recentColor = Colors.lightgray;
        const _board = {isActive: false, fields: []} as IBoardInfo;
		for (let i = 0; i < maxFields; i++) {
			_board.fields[i] = [];
			for (let j = 0; j < maxFields; j++) {
				_board.fields[i][j] = {y: i, x: j, changeable: false, color: Colors.black, isPowerfield: false};
			}
		}
		// midle green lanes
		for (let j = 0; j < maxFields; j++) {
			_board.fields[j][4].changeable = true;
			_board.fields[j][4].color = recentColor;
			if (j > 0 && j < maxFields - 1) {
				_board.fields[4][j].color = recentColor;
				_board.fields[4][j].changeable = true;
			}
		}
        let z = 3;
		// other greens
		for (let i = 0; i < 4; i++) {
            _board.fields[z][i].color = recentColor;
			_board.fields[z][i].changeable = true;
			_board.fields[z][maxFields - i - 1].color = recentColor;
			_board.fields[z][maxFields - i - 1].changeable = true;
			_board.fields[maxFields - z - 1][i].color = recentColor;
			_board.fields[maxFields - z - 1][i].changeable = true;
			z--;
        }
        z = 3;
        for (let i = 0; i < 4; i++) {
            _board.fields[maxFields - i - 1][maxFields - z - 1].color = recentColor;
            _board.fields[maxFields - i - 1][maxFields - z - 1].changeable = true;
            z--;
        }
        recentColor = Colors.black;
		_board.fields.forEach((value, index) => {
            value.forEach((value, index) => {
                if (!value.changeable) {
                    value.color = recentColor;
                    if ((index !== 8 || value.y === 4) && !((value.y === 5) && (index === 7))) {
                        recentColor === Colors.black ? recentColor = Colors.white : recentColor = Colors.black;
                    }
                }
            });
		});

		_board.fields[0][4].isPowerfield = true;
		_board.fields[4][0].isPowerfield = true;
		_board.fields[4][4].isPowerfield = true;
		_board.fields[4][8].isPowerfield = true;
		_board.fields[8][4].isPowerfield = true;

		return _board;
	}

	buildSettings(): ISettingsInfo {
		return {color: true, colorFirst: false};
	}

	buildFiguresWhite(): IFigureInfo[] {
		let figures: IFigureInfo[];
		let actionInfos: IActionFigureInfo[];
		actionInfos = [];
		figures = [];
		// read in json
		const content = readFileSync("/Users/kevin/Projects/Bachelorarbeit/Archon3DForWeb/Code/src/informationmodel/WhiteFigureInfo.json", "UTF-8");
		const actionContent = readFileSync("/Users/kevin/Projects/Bachelorarbeit/Archon3DForWeb/Code/src/informationmodel/WhiteActionFigureInfo.json", "UTF-8");
		// fill array with objects
		figures = JSON.parse(content.toString());
		actionInfos = JSON.parse(actionContent.toString());
		figures.forEach( (value, index) => {
			value.actionInfo = actionInfos[index];
			value.pos = [index, 0];
		});
		return figures;
	}

	buildFigureBlack(): IFigureInfo[] {
		let figures: IFigureInfo[];
		let actionInfos: IActionFigureInfo[];
		actionInfos = [];
		figures = [];
		// read in json
		const content = readFileSync("/Users/kevin/Projects/Bachelorarbeit/Archon3DForWeb/Code/src/informationmodel/BlackFigureInfo.json", "UTF-8");
		const actionContent = readFileSync("/Users/kevin/Projects/Bachelorarbeit/Archon3DForWeb/Code/src/informationmodel/BlackActionFigureInfo.json", "UTF-8");

		// fill array with objects
		figures = JSON.parse(content.toString());
		actionInfos = JSON.parse(actionContent.toString());
		figures.forEach( (value, index) => {
			value.actionInfo = actionInfos[index];
			value.pos = [index, 0];
		});
		return figures;
	}

	buildElementals(): IActionFigureInfo[] {
		let elementals: IActionFigureInfo[];
		elementals = [];

		const content = readFileSync("/Users/kevin/Projects/Bachelorarbeit/Archon3DForWeb/Code/src/informationmodel/ElementalInfo.json", "UTF-8");
		elementals = JSON.parse(content.toString());
		return elementals;
	}

	buildPlayer(): IPlayerInfo {
		const player: IPlayerInfo = {figureColor: undefined, figures: [], hasControl: undefined, socket: undefined};
		return player;
	}

	buildSpells(): any[] {
		throw new Error("not implemented function");
	}

	buildActionBoard(): IActionBoardInfo {
		const actionBoard: IActionBoardInfo =  {isActive: false, hp1: 0, hp2: 0, hindernisse: [], figure1: undefined, figure2: undefined, maxHP: 25};
		return actionBoard;
	}

}