import { IClientAdapter } from "./IClientAdapter";
import { ClientAdapter } from "./ClientAdapter";
import { IClientController } from "./IClientController";
import { ClientController } from "./ClientController";
import { IViewBuilder } from "./IViewBuilder";
import { ViewBuilder } from "./ViewBuilder";

export class ClientFabrik {
	createClientAdapter(socket: SocketIOClient.Socket): IClientAdapter {
		return new ClientAdapter(socket);
	}
	createClientController(socket: SocketIOClient.Socket): IClientController {
		return new ClientController(socket);
	}

	createViewBuilder(): IViewBuilder {
		return new ViewBuilder();
	}
}