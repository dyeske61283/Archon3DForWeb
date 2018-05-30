import { IGameModel } from "./IGameModel";

// receive data/requests from client controller and forward it to the model
export interface IServerController {
	registerMsgListeners(): void;
	model(): IGameModel;
}