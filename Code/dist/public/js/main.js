"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
///<reference path="../../../src/types/threejs/three.d.ts"/>
var THREE = require("three");
var three_orbitcontrols_ts_1 = require("three-orbitcontrols-ts");
var client;
var raycaster;
var mouse = new THREE.Vector2();
$(document).ready(function () {
    setup();
});
function setup() {
    // init client
    client = new Client();
    // raycaster
    raycaster = new THREE.Raycaster();
    // axes helper
    var axesHelper = new THREE.AxisHelper(5);
    client.scn.add(axesHelper);
    // add orbit controls for debugging to be able to move the board around
    var controls = new three_orbitcontrols_ts_1.OrbitControls(client.scn.getCamera());
}
function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}
//# sourceMappingURL=main.js.map