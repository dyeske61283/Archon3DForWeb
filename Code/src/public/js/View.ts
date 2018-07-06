import { IView } from "./IView";
import { CursorView } from "./CursorView";

export class View {
	private _renderer: THREE.Renderer;
	private _camera: THREE.PerspectiveCamera;
	private _background: IView;
	private _blackFigures: IView[];
	private _whiteFigures: IView[];
	private _scene: THREE.Scene;
	private _cursor: IView;
	private _board: IView;
	private _actionBoard: IView;
}