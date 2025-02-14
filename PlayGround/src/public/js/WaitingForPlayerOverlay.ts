import { Overlay } from "./overlayInterface";

export class OverlayImpl implements Overlay {
	setText(text: string): void {
		this.text = text;
		this.initHTMLElement();
	}
	private showing: boolean;

	htmlElement: string;
	text: string;
	on(): void {
		this.showing = true;
		$("#" + this.htmlElement).show();
	}
	off(): void {
		this.showing = false;
		$("#" + this.htmlElement).hide("fast");
	}

	constructor(htmlElement: string, text: string) {
		this.htmlElement = htmlElement;
		this.showing = false;
		this.text = text;
	}

	private initHTMLElement(): void {
		$("#" + this.htmlElement).find("div").text(this.text);
	}
}