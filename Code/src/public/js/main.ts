///<reference path="../../../src/types/threejs/three.d.ts"/>
import * as THREE from "three";
import { OrbitControls } from "three-orbitcontrols-ts";
import * as io from "socket.io-client";
// let client: Client;

let camera: THREE.PerspectiveCamera;
let scene: THREE.Scene;
let raycaster: THREE.Raycaster;
const mouse: THREE.Vector2 = new THREE.Vector2();
let renderer: THREE.WebGLRenderer;
let boardGeo: THREE.PlaneGeometry;
let boardMesh: THREE.Mesh;
let figMesh: THREE.Mesh;
let cursorMesh: THREE.Mesh;
let radius: number;
let selected: boolean;
const MAX: number = 9;
let materialIndex: number = 0;
const socket = io();

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

  // raycaster
  raycaster = new THREE.Raycaster();
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
      if ((n >= 10 && (n - 10) % 6 != 0) || n < 10 || n > 40) {
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
  boardMesh = new THREE.Mesh(boardGeo, new THREE.MeshFaceMaterial(materials));
  boardMesh.rotateZ(- Math.PI / 2);
  scene.add(boardMesh);

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

  // drop that sweet magician in
  // const loader = new THREE.OBJLoader();
  // loader.load("../images/tinker.obj", (magician: THREE.Object3D) => {
  //   scene.add(magician);
  // });

  // add primitive figure
  const box = new THREE.BoxGeometry(3, 3, 3);
  const standGeo = new THREE.CylinderGeometry(1, 2, 0.5);
  standGeo.rotateX(Math.PI / 2);
  box.rotateZ(Math.PI / 4);
  box.rotateY(Math.PI / 4);
  const figureMaterial = new THREE.MeshNormalMaterial();
  const figureMesh = new THREE.Mesh(box, figureMaterial);
  figureMesh.position.set(-0.3, 0, 2.5);
  figureMesh.updateMatrix();
  standGeo.mergeMesh(figureMesh);
  figMesh = new THREE.Mesh(standGeo, figureMaterial);
  figMesh.position.set(-20, -20, 0.5);
  scene.add(figMesh);

  // add orbit controls for debugging to be able to move the board around
  const controls = new OrbitControls(camera);

  // add cursor
  const cursorGeo = new THREE.RingBufferGeometry(3, 3.53, 4);
  cursorGeo.rotateZ(Math.PI / 4);
  const cursorMaterial = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, color: 0xDDDD00, transparent: true });
  cursorMesh = new THREE.Mesh(cursorGeo, cursorMaterial);
  cursorMesh.position.z += 0.01;
  scene.add(cursorMesh);

  // EVENT LISTENERS
  // attach resize listener
  window.addEventListener("resize", onWindowResize, false);
  // attach mouse dragged listener
  window.addEventListener("mousedown", onMouseDown, false);
  // attach mouse moved listender
  window.addEventListener("mousemove", onMouseMove, false);
  // attach key pressed event listender
  window.addEventListener("keypress", onKeyPress, false);
}

function onKeyPress(ev: KeyboardEvent) {
  // use arrow keys to move cursor
  ev.preventDefault();
  switch (ev.key) {
    case "ArrowDown":
      if (cursorMesh.position.y > - 20) {
        cursorMesh.position.y -= 5;
      }
      break;
    case "ArrowUp":
      if (cursorMesh.position.y < 20) {
        cursorMesh.position.y += 5;
      }
      break;
    case "ArrowRight":
      if (cursorMesh.position.x < 20) {
        cursorMesh.position.x += 5;
      }
      break;
    case "ArrowLeft":
      if (cursorMesh.position.x > -20) {
        cursorMesh.position.x -= 5;
      }
      break;
    case " ":
      if (selected) {
        selected = false;
        figMesh.position.set(cursorMesh.position.x, cursorMesh.position.y, figMesh.position.z);
      } else {
        if (cursorMesh.position.distanceTo(figMesh.position) < 2) {
          selected = true;
        }
      }
  }
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
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObject(figMesh);
  let m, c;
  if (intersects.length > 0) {
    m = <THREE.Mesh>intersects[0].object;
    c = <THREE.MeshNormalMaterial>m.material;
    c.wireframe = true;
  } else {
    c = <THREE.MeshNormalMaterial>figMesh.material;
    c.wireframe = false;
  }
  if (selected) {
    m = <THREE.MeshBasicMaterial>figMesh.material;
    m.wireframe = true;
  } else {
    m = <THREE.MeshBasicMaterial>figMesh.material;
    m.wireframe = false;
  }

  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onMouseMove(event: MouseEvent) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
}

function onMouseDown(event: MouseEvent) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
  if (selected) {
    console.log("Figur wird gesetzt. An Position: " + mouse.x + ", " + mouse.y);
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(boardMesh);
    if (intersects.length > 0) {
      selected = false;
      figMesh.position.copy(intersects[0].point).add(intersects[0].face.normal);
      figMesh.position.divideScalar(5).floor().multiplyScalar(5).addScalar(2.25);
    }
  }
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObject(figMesh);
  if (intersects.length > 0) {
    selected = true;
    console.log("Figur ist selektiert. An Position: " + mouse.x + ", " + mouse.y);
  }
}

socket.on("colorChange", (change: number) => {
  console.log("received color change event with color index: " + change);
  materialIndex = change;
  boardGeo.elementsNeedUpdate = true;
});