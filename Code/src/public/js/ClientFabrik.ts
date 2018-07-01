import { IClientAdapter } from "./IClientAdapter";
import { ClientAdapter } from "./ClientAdapter";
import { IClientController } from "./IClientController";
import { ClientController } from "./ClientController";
import { IViewBuilder } from "./IViewBuilder";
import { ViewBuilder } from "./ViewBuilder";
import { Client } from "./Client";
import { Cursor } from "./Cursor";
import { ICursorInfo } from "../../informationmodel/ICursorInfo";

export class ClientFabrik {
	createClientAdapter(socket: SocketIOClient.Socket, client: Client): IClientAdapter {
		return new ClientAdapter(socket, client);
	}
	createClientController(socket: SocketIOClient.Socket): IClientController {
		return new ClientController(socket);
	}

	createCursor(): Cursor {
		const cInfo: ICursorInfo = {pos: [5, 5], enabled: false, board: undefined};
		return new Cursor(cInfo);
	}

	createViewBuilder(): IViewBuilder {
		return new ViewBuilder();
	}
}