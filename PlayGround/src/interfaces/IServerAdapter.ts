import { IGameModel } from "./IGameModel";

// listens to changes of the model and sends them to the client adapter
// is an IObserver of the model
// owns a socket-server for communication
export interface IServerAdapter {
	sendData<T>(data: T, event: string, index: number): void;
	broadcastData<T>(data: T, event: string): void;
	onNotify(entity: any, event: string): void;
	model(): IGameModel;
}