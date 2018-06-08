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
let color: boolean = true;
let colorFirst: boolean = false;

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

$("#btnSettingsDone").on("click", () => {
  const settings: ISettingsInfo = {colorFirst: colorFirst, color: color};
  socket.emit("settings", settings) ;
});

function boolToColor(val: boolean) {
  if (val) return "white";
  return "black";
}

$("#btnOwnColor").click((e) => {
  const btn = $(e.target);
  color = !color;
  if (btn.hasClass("btn-light")) {
    btn.html("Black");
    btn.removeClass("btn-light").addClass("btn-dark");
  } else {
    btn.html("White");
    btn.removeClass("btn-dark").addClass("btn-light");
  }
});
$("#btnColorFirst").click((e) => {
  const btn = $(e.target);
  colorFirst = !colorFirst;
  if (btn.hasClass("btn-light")) {
    btn.html("Black");
    btn.removeClass("btn-light").addClass("btn-dark");
  } else {
    btn.html("White");
    btn.removeClass("btn-dark").addClass("btn-light");
  }
});

$("#btnWin").click(() => {
  $("#alertWin").show();
  setTimeout(() => location.reload(), 5000);
});

$("#btnLose").click(() => {
  const alertBox = $("#alertWin");
  alertBox.removeClass("alert-success").addClass("alert-danger").html("<strong>Lose!</strong> Next time you'll win! The page will refresh in a few seconds for your next try.");
  alertBox.show();
  setTimeout(() => location.reload(), 5000);
});

$("#btnSend1").click(() => {
  const messagePanel2 = $("#messagesOther ul");
  removeOldMessages(messagePanel2);
  messagePanel2.prepend($("<li class=\"list-group-item\">").text("A Message was delivered to you."));
});

$("#btnSend2").click(() => {
  const messagePanel1 = $("#messagesOwn ul");
  removeOldMessages(messagePanel1);
  messagePanel1.prepend($("<li class=\"list-group-item\">").text("A Message was delivered to you."));
});

function removeOldMessages(msgPanel: JQuery<HTMLElement>) {
  msgPanel.children().slice(3).remove();
}