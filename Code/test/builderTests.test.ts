import { ModelBuilder } from "/Users/kevin/Projects/Bachelorarbeit/Archon3DForWeb/Code/src/implementations/ModelBuilder";
import "jest";
describe("Testing the correct build of the GameModelBuilder", () => {
	test("buildFigures", () => {
		const builder = new ModelBuilder();
		const blackFigures = builder.buildFigureBlack();
		expect(blackFigures).toBeDefined();
		expect(blackFigures).toHaveLength(8);
		const whiteFigures = builder.buildFiguresWhite();
		expect(whiteFigures).toBeDefined();
		expect(whiteFigures).toHaveLength(8);
		console.log(blackFigures);
		console.log(whiteFigures);
		const elementals = builder.buildElementals();
		expect(elementals).toBeDefined();
		expect(elementals).toHaveLength(4);
		console.log(elementals);
	});

	test("buildBoard", () => {
		const builder = new ModelBuilder();
		const board = builder.buildBoard();
		expect(board).toBeDefined();
		board.fields.forEach((value) => {
			expect(value).toBeDefined();
		});
	});

	test("buildSettings", () => {
		const builder = new ModelBuilder();
		const settings = builder.buildSettings();
		expect(settings).toBeDefined();
	});

	test("buildPlayer", () => {
		const builder = new ModelBuilder();
		const player = builder.buildPlayer();
		expect(player).toBeDefined();
	});

	test("buildActionBoard", () => {
		const builder = new ModelBuilder();
		const actionBoard = builder.buildActionBoard();
		expect(actionBoard).toBeDefined();
	});
});