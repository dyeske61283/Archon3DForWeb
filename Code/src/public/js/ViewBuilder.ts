import { IView } from "./IView";
import { IViewBuilder } from "./IViewBuilder";

export class ViewBuilder implements IViewBuilder {
	buildBackground(): IView {
		throw new Error("Method not implemented.");
	}
	buildFigures(): IView {
		throw new Error("Method not implemented.");
	}
	buildScene(): IView {
		throw new Error("Method not implemented.");
	}
	buildBoard(): IView {
		throw new Error("Method not implemented.");
	}
	buildFightingBoard(): IView {
		throw new Error("Method not implemented.");
	}
	buildCursor(): IView {
		throw new Error("Method not implemented.");
	}
}