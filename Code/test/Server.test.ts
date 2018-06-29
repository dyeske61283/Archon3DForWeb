import { Server, app } from "/Users/kevin/Projects/Bachelorarbeit/Archon3DForWeb/Code/src/server";
import  *  as io from "socket.io-client";
import "jest";

describe("Testing the server functionalities", () => {
	let server: Server;
	beforeAll(() => {
		server = new Server();
	});

	test("creationTest", () => {
		expect(server).toBeDefined();
		expect(server._model).toBeDefined();
		expect(server.connections).toBe(0);
		expect(server.connectionsIO).toBe(0);
		expect(server._adapter).toBeUndefined();
		expect(server._controller).toBeUndefined();
		expect(server._playerSockets).toHaveLength(0);
		expect(server.httpServer).toBeDefined();
		expect(server.ioServer).toBeDefined();
	});

	test("functional Test socket-server", () => {
		server.ioServer.on("connection", (socket) => {
			expect(socket).toBeDefined();
		});
		const httpServerAddr = server.httpServer.address();
		const socket = io(`http://[${httpServerAddr.address}]:${httpServerAddr.port}`, {
			reconnectionDelay : 0,
			forceNew: true,
			transports: ["websocket"]
		});
	});
});