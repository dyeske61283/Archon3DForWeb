"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var io = require("socket.io-client");
var Client_1 = require("./Client");
var ClientFabrik_1 = require("./ClientFabrik");
var socket = io();
var fabrik;
var client;
// let color: boolean = true;
// let colorFirst: boolean = false;
$(document).ready(function () {
    socket.on("reload", function () {
        location.reload();
    });
    setup();
});
function setup() {
    fabrik = new ClientFabrik_1.ClientFabrik();
    client = new Client_1.Client(fabrik, socket);
}
// socket.on("publishSettings", (settings: ISettingsInfo) => {
//  $("#Settings-Prompt").hide();
//  console.log("the following settings have been made: 1. Color = %s 2. ColorFirst = %s. ", boolToColor(settings.color), boolToColor(settings.colorFirst));
// });
// $("#btnSettingsDone").on("click", () => {
//   const settings: ISettingsInfo = {colorFirst: colorFirst, color: color};
//   socket.emit("settings", settings) ;
// });
function boolToColor(val) {
    if (val)
        return "white";
    return "black";
}
exports.boolToColor = boolToColor;
$("#btnOwnColor").click(function (e) {
    var btn = $(e.target);
    // color = !color;
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
    // colorFirst = !colorFirst;
    if (btn.hasClass("btn-light")) {
        btn.html("Black");
        btn.removeClass("btn-light").addClass("btn-dark");
    }
    else {
        btn.html("White");
        btn.removeClass("btn-dark").addClass("btn-light");
    }
});
//# sourceMappingURL=main.js.map