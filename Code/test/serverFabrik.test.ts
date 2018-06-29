import { Fabrik } from "../src/serverFabrik";
import * as io from "socket.io";
import "jest";
import { ModelBuilder } from "../src/implementations/ModelBuilder";

describe("TestSuite for serverFabrik", () => {
	test("do not provide sockets", () => {
		expect(Fabrik.readyToCreate()).toBe(false);
		expect(Fabrik.createServerAdapter(undefined, undefined)).toBeUndefined();
		expect(Fabrik.createServerController(undefined)).toBeUndefined();
	});

	test("build model builder", () => {
		expect(Fabrik.createModel(new ModelBuilder())).toBeDefined();
	});
});