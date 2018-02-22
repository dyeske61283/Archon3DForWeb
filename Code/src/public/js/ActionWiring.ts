export class ActionsWiring {

	public constructor() {

	}

	public addResizeListener(callback: () => void): void {
		window.addEventListener("resize", callback, false);
	}

	public addKeyPressListener(callback: (ev: KeyboardEvent) => void): void {
		window.addEventListener("keypress", callback, false);
	}
}