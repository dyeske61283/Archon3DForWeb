"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
///<reference path="../../../src/types/threejs/three.d.ts"/>
var THREE = require("three");
var io = require("socket.io-client");
// let client: Client;
var camera;
var scene;
var renderer;
var boardGeo;
var radius;
var MAX = 9;
var materialIndex = 0;
var socket = io();
$(document).ready(function () {
    setup();
    draw();
});
function setup() {
    var WIDTH = window.innerWidth;
    var HEIGHT = window.innerHeight;
    var aspect = WIDTH / HEIGHT;
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
    var light = new THREE.AmbientLight(0x222222);
    scene.add(light);
    // renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, precision: "highp" });
    renderer.setSize(WIDTH, HEIGHT);
    renderer.setClearColor(0xD6D6D6, 1);
    $("#game-holder").append(renderer.domElement);
    // build the board and its tiles
    var materials = [new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide }),
        new THREE.MeshBasicMaterial({ color: 0x005000, side: THREE.DoubleSide }),
        new THREE.MeshBasicMaterial({ color: 0x008C00, side: THREE.DoubleSide }),
        new THREE.MeshBasicMaterial({ color: 0x00B400, side: THREE.DoubleSide }),
        new THREE.MeshBasicMaterial({ color: 0x00DC00, side: THREE.DoubleSide }),
        new THREE.MeshBasicMaterial({ color: 0xFFFFFF, side: THREE.DoubleSide })];
    boardGeo = new THREE.PlaneGeometry(45, 45, 9, 9);
    var l = boardGeo.faces.length;
    // color the tiles
    materialIndex = 3;
    var offset = 4 * 2 * 9;
    for (var i = 0; i < 18; i += 2) {
        boardGeo.faces[i + offset].materialIndex = boardGeo.faces[i + 1 + offset].materialIndex = materialIndex;
    }
    offset = 26;
    for (var i = 0; i < 126; i += 18) {
        boardGeo.faces[i + offset].materialIndex = boardGeo.faces[i + 1 + offset].materialIndex = materialIndex;
    }
    offset = 6;
    var offsetMax = 160;
    var index = 0;
    for (var i = 0; i < 8; i += 2) {
        index = i * 9 - i + offset;
        boardGeo.faces[index].materialIndex = boardGeo.faces[index + 1].materialIndex = materialIndex;
        boardGeo.faces[offsetMax - index].materialIndex = boardGeo.faces[offsetMax - index + 1].materialIndex = materialIndex;
    }
    offset = 10;
    offsetMax = 90;
    for (var i = 0; i < 4; i++) {
        index = offset + i * 20;
        boardGeo.faces[index].materialIndex = boardGeo.faces[index + 1].materialIndex = materialIndex;
        index = offsetMax + i * 20;
        boardGeo.faces[index].materialIndex = boardGeo.faces[index + 1].materialIndex = materialIndex;
    }
    // color the rest of the tiles black and white
    materialIndex = materials.length - 1;
    var n = 0;
    for (var i = 0; i < l; i += 2) {
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
    var mesh = new THREE.Mesh(boardGeo, new THREE.MeshFaceMaterial(materials));
    scene.add(mesh);
    // power fields
    var powerFields = new THREE.Group();
    var powerboardGeo = new THREE.Geometry();
    var powerRing = new THREE.RingGeometry(1.9, 2.4, 8);
    var ringMesh = new THREE.Mesh(powerRing);
    var powerCircle = new THREE.CircleGeometry(0.75, 8);
    var circleMesh = new THREE.Mesh(powerCircle);
    ringMesh.updateMatrix();
    circleMesh.updateMatrix();
    powerboardGeo.mergeMesh(ringMesh);
    powerboardGeo.mergeMesh(circleMesh);
    var powerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide, });
    powerMaterial.depthTest = false;
    var powerMeshMid = new THREE.Mesh(powerboardGeo, powerMaterial);
    powerMeshMid.position.set(0, 0, 0.00);
    var powerMeshTop = new THREE.Mesh(powerboardGeo, powerMaterial);
    powerMeshTop.position.set(0, 20, 0.00);
    var powerMeshBot = new THREE.Mesh(powerboardGeo, powerMaterial);
    powerMeshBot.position.set(0, -20, 0.00);
    var powerMeshLeft = new THREE.Mesh(powerboardGeo, powerMaterial);
    powerMeshLeft.position.set(-20, 0, 0.00);
    var powerMeshRight = new THREE.Mesh(powerboardGeo, powerMaterial);
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
    var axesHelper = new THREE.AxisHelper(5);
    scene.add(axesHelper);
    // drop that sweet magician in
    // const loader = new THREE.OBJLoader();
    // loader.load("../images/tinker.obj", (magician: THREE.Object3D) => {
    //   scene.add(magician);
    // });
    // add primitive figure
    var figureGeo = new THREE.BoxBufferGeometry(5, 5, 5);
    var standGeo = new THREE.CylinderBufferGeometry(1, 2, 0.5);
    figureGeo.rotateZ(Math.PI / 2);
    figureGeo.rotateY(Math.PI / 2);
    var figureMaterial = new THREE.MeshPhongMaterial();
    var figureMesh = new THREE.Mesh(figureGeo);
    var standMesh = new THREE.Mesh(standGeo);
    var geo = new THREE.Geometry();
    geo.mergeMesh(figureMesh);
    geo.mergeMesh(standMesh);
    var figMesh = new THREE.Mesh(geo, figureMaterial);
    scene.add(figMesh);
    // EVENT LISTENERS
    // attach resize listener
    window.addEventListener("resize", onWindowResize, false);
    // attach mousedragged listener
    window.addEventListener("mousedown", onMouseDown, false);
}
function draw() {
    requestAnimationFrame(draw);
    if (boardGeo.faces[6].materialIndex != materialIndex) {
        var oldIndex = boardGeo.faces[6].materialIndex;
        for (var i = 0; i < boardGeo.faces.length; i += 2) {
            if (boardGeo.faces[i].materialIndex == oldIndex) {
                boardGeo.faces[i].materialIndex = boardGeo.faces[i + 1].materialIndex = materialIndex;
            }
        }
    }
    renderer.render(scene, camera);
}
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
function onMouseDown() {
}
socket.on("colorChange", function (change) {
    console.log("received color change event with color index: " + change);
    materialIndex = change;
    boardGeo.elementsNeedUpdate = true;
});
//# sourceMappingURL=main.js.map