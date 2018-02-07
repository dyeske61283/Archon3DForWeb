import * as THREE from "three";

class Field {
	public static SCL: number = 60;
	private x: number;
	private y: number;
	private color: number;
	private w: number;
	private hasPower: boolean;
	private hasFigure: boolean;
	private isChangeField: boolean;

	private geo: THREE.Mesh;
	constructor(x: number = 0, y: number = 0, c: number = 0, cf: boolean = false, p: boolean = false, f: boolean = false) {
		this.x = x;
		this.y = y;
		this.color = c;
		this. w =  Field.SCL;
		this.hasPower = p;
		this.hasFigure = f;
		this.isChangeField = cf;

	}

	public setColor(c: number): void {
		this.color = c;
	}


	public getMesh(): THREE.Mesh {
		return this.geo;
	}
}