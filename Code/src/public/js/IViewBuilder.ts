import { IView } from "./IView";

// is responsible for building the visual components
export interface IViewBuilder {
	buildBackground(): IView;
	buildFigures(): IView;
	buildScene(): IView;
	buildBoard(): IView;
	buildFightingBoard(): IView;
	buildCursor(): IView;
}