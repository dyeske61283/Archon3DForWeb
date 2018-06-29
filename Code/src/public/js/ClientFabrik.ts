import { IClientAdapter } from "./IClientAdapter";
import { ClientAdapter } from "./ClientAdapter";
import { IClientController } from "./IClientController";
import { ClientController } from "./ClientController";
import { IViewBuilder } from "./IViewBuilder";
import { ViewBuilder } from "./ViewBuilder";
import { Client } from "./Client";

export class ClientFabrik {
	createClientAdapter(socket: SocketIOClient.Socket, client: Client): IClientAdapter {
		return new ClientAdapter(socket, client);
	}
	createClientController(socket: SocketIOClient.Socket): IClientController {
		return new ClientController(socket);
	}

	createViewBuilder(): IViewBuilder {
		return new ViewBuilder();
	}
}