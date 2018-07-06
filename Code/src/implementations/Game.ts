import { Board } from "./Board";
import { Player } from "./Player";
import { IGameModel } from "../interfaces/IGameModel";

export class Game {
	private _p1: Player;
	private _p2: Player;
	private _board: Board;

	constructor(model: IGameModel) {

	}

	Player1(): Player {
		return this._p1;
	}

	Player2(): Player {
		return this._p2;
	}

	Board(): Board {
		return this._board;
	}
}