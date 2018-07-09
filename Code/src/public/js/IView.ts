
// has references to all viewable components to modify their data properly
// owns the three-js components like scene, camera, renderer
export interface IView {
	getViewComponent(): THREE.Object3D | THREE.Mesh; // the three js view object
	getInfoObject(): any; // the object that contains the state for this view component
	updateInfo(infoObject: any): void;
	update(): void;
}