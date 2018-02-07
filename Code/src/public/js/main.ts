///<reference path="../../../src/types/threejs/three.d.ts"/>
import * as THREE from "three";
import * as io from "socket.io-client";
// let client: Client;

let camera: THREE.PerspectiveCamera;
let scene: THREE.Scene;
let renderer: THREE.WebGLRenderer;
let boardGeo: THREE.PlaneGeometry;
let radius: number;
const MAX: number = 9;
let materialIndex: number = 0;
const socket =  io();

$(document).ready(function () {
  setup();
  draw();
});

function setup(): void {
  const WIDTH: number = window.innerWidth;
  const HEIGHT: number = window.innerHeight;
  const aspect = WIDTH / HEIGHT;
  // camera
  camera = new THREE.PerspectiveCamera(50, aspect, 1, 1000);
  camera.position.z = 60;
  camera.position.y = -50;
  camera.lookAt(new THREE.Vector3(0, 0, -4));
  radius = camera.position.distanceTo(new THREE.Vector3(0, 0, -4));

  // scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xcccccc);
  scene.fog = new THREE.FogExp2(0xcccccc, 0.002);
  scene.add(camera);

  // add a little light
  const light = new THREE.AmbientLight(0x222222);
  scene.add(light);
  // renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, precision: "highp" });
  renderer.setSize(WIDTH, HEIGHT);
  renderer.setClearColor(0xD6D6D6, 1);
  $("#game-holder").append(renderer.domElement);
  // build the board and its tiles
  const materials: THREE.MeshBasicMaterial[] = [new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide }),
  new THREE.MeshBasicMaterial({ color: 0x005000, side: THREE.DoubleSide }),
  new THREE.MeshBasicMaterial({ color: 0x008C00, side: THREE.DoubleSide }),
  new THREE.MeshBasicMaterial({ color: 0x00B400, side: THREE.DoubleSide }),
  new THREE.MeshBasicMaterial({ color: 0x00DC00, side: THREE.DoubleSide }),
  new THREE.MeshBasicMaterial({ color: 0xFFFFFF, side: THREE.DoubleSide })];
  boardGeo = new THREE.PlaneGeometry(45, 45, 9, 9);
  const l: number = boardGeo.faces.length;

  // color the tiles
  materialIndex = 3;

  let offset: number = 4 * 2 * 9;
  for (let i = 0; i < 18; i += 2) {
    boardGeo.faces[i + offset].materialIndex = boardGeo.faces[i + 1 + offset].materialIndex = materialIndex;
  }
  offset = 26;
  for (let i = 0; i < 126; i += 18) {
    boardGeo.faces[i + offset].materialIndex = boardGeo.faces[i + 1 + offset].materialIndex = materialIndex;
  }
  offset = 6;
  let offsetMax: number = 160;
  let index: number = 0;
  for (let i = 0; i < 8; i += 2) {
    index = i * 9 - i + offset;
    boardGeo.faces[index].materialIndex = boardGeo.faces[index + 1].materialIndex = materialIndex;
    boardGeo.faces[offsetMax - index].materialIndex = boardGeo.faces[offsetMax - index + 1].materialIndex = materialIndex;
  }
  offset = 10;
  offsetMax = 90;
  for (let i = 0; i < 4; i++) {
    index = offset + i * 20;
    boardGeo.faces[index].materialIndex = boardGeo.faces[index + 1].materialIndex = materialIndex;
    index = offsetMax + i * 20;
    boardGeo.faces[index].materialIndex = boardGeo.faces[index + 1].materialIndex = materialIndex;
  }

  // color the rest of the tiles black and white
  materialIndex = materials.length - 1;
  let n: number = 0;
  for (let i = 0; i < l; i += 2) {
    if (boardGeo.faces[i].materialIndex != 3) {
      boardGeo.faces[i].materialIndex = boardGeo.faces[i + 1].materialIndex = materialIndex;
      n++;
      if ((n >= 10 && (n - 10) % 6 != 0 ) || n < 10 || n > 40) {
        if (materialIndex == 0) {
          materialIndex = materials.length - 1;
        }
        else {
          materialIndex = 0;
        }
      }
    }
  }
  // reset the index for the changing tiles
  materialIndex = boardGeo.faces[6].materialIndex;
  // add board to the scene
  const mesh: THREE.Mesh = new THREE.Mesh(boardGeo, new THREE.MeshFaceMaterial(materials));
  scene.add(mesh);

  // power fields
  const powerFields: THREE.Group = new THREE.Group();
  const powerboardGeo = new THREE.Geometry();

  const powerRing = new THREE.RingGeometry(1.9, 2.4, 8);
  const ringMesh = new THREE.Mesh(powerRing);

  const powerCircle = new THREE.CircleGeometry(0.75, 8);
  const circleMesh = new THREE.Mesh(powerCircle);
  ringMesh.updateMatrix();
  circleMesh.updateMatrix();
  powerboardGeo.mergeMesh(ringMesh);
  powerboardGeo.mergeMesh(circleMesh);

  const powerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide, });
  powerMaterial.depthTest = false;
  const powerMeshMid = new THREE.Mesh(powerboardGeo, powerMaterial);
  powerMeshMid.position.set(0, 0, 0.00);

  const powerMeshTop = new THREE.Mesh(powerboardGeo, powerMaterial);
  powerMeshTop.position.set(0, 20, 0.00);

  const powerMeshBot = new THREE.Mesh(powerboardGeo, powerMaterial);
  powerMeshBot.position.set(0, -20, 0.00);

  const powerMeshLeft = new THREE.Mesh(powerboardGeo, powerMaterial);
  powerMeshLeft.position.set(-20, 0, 0.00);

  const powerMeshRight = new THREE.Mesh(powerboardGeo, powerMaterial);
  powerMeshRight.position.set(20, 0, 0.00);
  // grouping the powerfields (good for animating them later on)
  powerFields.add(powerMeshBot);
  powerFields.add(powerMeshLeft);
  powerFields.add(powerMeshMid);
  powerFields.add(powerMeshRight);
  powerFields.add(powerMeshTop);

  // add all powerfields
  scene.add(powerFields);

  // axes helper
  const axesHelper: THREE.AxisHelper = new THREE.AxisHelper(5);
  scene.add(axesHelper);


  // EVENT LISTENERS
  // attach resize listener
  window.addEventListener("resize", onWindowResize, false);
  // attach mousedragged listener
  window.addEventListener("mousedown", onMouseDown, false);
}

function draw(): void {
  requestAnimationFrame(draw);

  if (boardGeo.faces[6].materialIndex != materialIndex) {
    const oldIndex: number = boardGeo.faces[6].materialIndex;
    for (let i = 0; i < boardGeo.faces.length; i += 2) {
      if (boardGeo.faces[i].materialIndex == oldIndex) {
        boardGeo.faces[i].materialIndex = boardGeo.faces[i + 1].materialIndex = materialIndex;
      }
    }
  }

  renderer.render(scene, camera);
}

function onWindowResize() {
  this.camera.aspect = window.innerWidth / window.innerHeight;
  this.camera.updateProjectionMatrix();
  this.renderer.setSize(window.innerWidth, window.innerHeight);

}

function onMouseDown() {
}

socket.on("colorChange", (change: number) => {
  console.log("received color change event with color index: " + change);
  materialIndex = change;
  boardGeo.elementsNeedUpdate = true;
});