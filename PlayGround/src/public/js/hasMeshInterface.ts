export interface HasMesh {
	getMesh(): THREE.Mesh;
	getGroup?(): THREE.Group;
}