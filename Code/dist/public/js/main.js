"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var io = require("socket.io-client");
var Client_1 = require("./Client");
var ClientFabrik_1 = require("./ClientFabrik");
var socket = io();
var fabrik = new ClientFabrik_1.ClientFabrik();
var client = new Client_1.Client(fabrik, socket);
var color = true;
var colorFirst = false;
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
$("#btnSettingsDone").on("click", function () {
    var settings = { colorFirst: colorFirst, color: color };
    socket.emit("settings", settings);
});
function boolToColor(val) {
    if (val)
        return "white";
    return "black";
}
$("#btnOwnColor").click(function (e) {
    var btn = $(e.target);
    color = !color;
    if (btn.hasClass("btn-light")) {
        btn.html("Black");
        btn.removeClass("btn-light").addClass("btn-dark");
    }
    else {
        btn.html("White");
        btn.removeClass("btn-dark").addClass("btn-light");
    }
});
$("#btnColorFirst").click(function (e) {
    var btn = $(e.target);
    colorFirst = !colorFirst;
    if (btn.hasClass("btn-light")) {
        btn.html("Black");
        btn.removeClass("btn-light").addClass("btn-dark");
    }
    else {
        btn.html("White");
        btn.removeClass("btn-dark").addClass("btn-light");
    }
});
$("#btnWin").click(function () {
    $("#alertWin").show();
    setTimeout(function () { return location.reload(); }, 5000);
});
$("#btnLose").click(function () {
    var alertBox = $("#alertWin");
    alertBox.removeClass("alert-success").addClass("alert-danger").html("<strong>Lose!</strong> Next time you'll win! The page will refresh in a few seconds for your next try.");
    alertBox.show();
    setTimeout(function () { return location.reload(); }, 5000);
});
$("#btnSend1").click(function () {
    var messagePanel2 = $("#messagesOther ul");
    removeOldMessages(messagePanel2);
    messagePanel2.prepend($("<li class=\"list-group-item\">").text("A Message was delivered to you."));
});
$("#btnSend2").click(function () {
    var messagePanel1 = $("#messagesOwn ul");
    removeOldMessages(messagePanel1);
    messagePanel1.prepend($("<li class=\"list-group-item\">").text("A Message was delivered to you."));
});
function removeOldMessages(msgPanel) {
    msgPanel.children().slice(3).remove();
}
//# sourceMappingURL=main.js.map