import "jest";
import { ServerController } from "../src/implementations/ServerController";

describe("Testing server controller...", () => {
	test("testing public functions", () => {
		const controller = new ServerController(undefined, undefined, undefined);
		expect(controller.model()).toBeUndefined();
		expect(controller.registerMsgListeners).toThrowError(Error);
	});

	test("test actual listener registering", () => {

	});
});