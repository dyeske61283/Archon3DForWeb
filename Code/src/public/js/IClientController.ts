import { IGameModel } from "../../interfaces/IGameModel";
import { Cursor } from "./Cursor";
import { EventEmitter } from "events";

// watches for events from the player aka input and uses commands to generate messages from that
export interface IClientController {
	registerEvents(): void;
	registerCommands(): void;
	injectModel(model: IGameModel): void;
	injectCursor(cursor: Cursor): void;
	injectView(view: EventEmitter): void;
}