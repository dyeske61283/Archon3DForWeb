"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var io = require("socket.io-client");
var Client_1 = require("./Client");
var ClientFabrik_1 = require("./ClientFabrik");
var socket = io();
var fabrik = new ClientFabrik_1.ClientFabrik();
var client = new Client_1.Client(fabrik, socket);
$(document).ready(function () {
    setup();
});
function setup() {
}
socket.on("reload", function () {
    location.reload();
});
socket.on("settings", function () {
    $("#Settings-Prompt").show();
});
socket.on("publishSettings", function (settings) {
    // $("#Settings-Prompt").hide();
    console.log("the following settings have been made: 1. Color = %s 2. ColorFirst = %s. ", boolToColor(settings.color), boolToColor(settings.colorFirst));
});
$("#btnDone").on("click", function () {
    var startColor = $("#cbStartColor").prop("checked");
    var color = $("#cbColor").prop("checked");
    var settings = { colorFirst: startColor, color: color };
    socket.emit("settings", settings);
});
function boolToColor(val) {
    if (val)
        return "white";
    return "black";
}
//# sourceMappingURL=main.js.map