import { Server } from "/Users/kevin/Projects/Bachelorarbeit/Archon3DForWeb/Code/src/server";
import "jest";

describe("Testing the server functionalities", () => {
	test("creationTest", () => {
		const server = new Server();
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
});