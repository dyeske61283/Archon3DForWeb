///<reference path="../../../src/types/threejs/three.d.ts"/>
import * as THREE from "three";
import { OrbitControls } from "three-orbitcontrols-ts";
import * as io from "socket.io-client";
import { Client } from "./Client";
import { ClientFabrik } from "./ClientFabrik";
import { ISettingsInfo } from "../../informationmodel/ISettingsInfo";

const socket = io();
const fabrik: ClientFabrik = new ClientFabrik();
const client: Client = new Client(fabrik, socket);

$(document).ready(function () {
  setup();
});

function setup(): void {
}

socket.on("reload", function () {
  location.reload();
});
socket.on("settings", () => {
  $("#Settings-Prompt").show();
});
socket.on("publishSettings", (settings: ISettingsInfo) => {
  // $("#Settings-Prompt").hide();
  console.log("the following settings have been made: 1. Color = %s 2. ColorFirst = %s. ", boolToColor(settings.color), boolToColor(settings.colorFirst));
});

$("#btnDone").on("click", () => {
  const startColor = $("#cbStartColor").prop("checked");
  const color = $("#cbColor").prop("checked");
  const settings: ISettingsInfo = {colorFirst: startColor, color: color};
  socket.emit("settings", settings) ;
});

function boolToColor(val: boolean) {
  if (val) return "white";
  return "black";
}