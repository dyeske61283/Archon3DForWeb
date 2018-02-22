export interface Overlay {
	// container / html element
	htmlElement: string;
	// text
	text: string;
	// type: e.g. warning, info, error ...
	// ??
	// controlling methods
	on(): void;
	off(): void;
}