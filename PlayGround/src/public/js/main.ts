///<reference path="../../../src/types/threejs/three.d.ts"/>
import * as THREE from "three";
import { OrbitControls } from "three-orbitcontrols-ts";
import * as io from "socket.io-client";
import { Client } from "./Client";

let client: Client;
let raycaster: THREE.Raycaster;
const mouse: THREE.Vector2 = new THREE.Vector2();

$(document).ready(function () {
  setup();
});

function setup(): void {
  // init client
  client = new Client();
  // raycaster
  raycaster = new THREE.Raycaster();

  // axes helper
  const axesHelper: THREE.AxisHelper = new THREE.AxisHelper(5);
  client.scn.add(axesHelper);

  // add orbit controls for debugging to be able to move the board around
  const controls = new OrbitControls(client.scn.getCamera());
  controls.enablePan = false;
  controls.enableKeys = false;
}


function onMouseMove(event: MouseEvent) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
}