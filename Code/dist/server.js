"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SocketIO = require("socket.io");
var express = require("express");
var path = require("path");
var compression = require("compression");
var logger = require("morgan");
var errorhandler = require("errorhandler");
var GameServer_1 = require("./GameServer");
var overlayMessages_1 = require("./overlayMessages");
exports.app = express();
// Express configuration
exports.app.set("port", process.env.PORT || 3000);
exports.app.use(compression());
exports.app.use(logger("dev"));
exports.app.use(errorhandler());
exports.app.use(express.static(path.join(__dirname, "public"), { maxAge: 31557600000 }));
// basic route
exports.app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/index.html"));
});
// start server
exports.server = exports.app.listen(exports.app.get("port"), function () {
    console.log(("  App is running at http://localhost:%d in %s mode"), exports.app.get("port"), exports.app.get("env"));
    console.log("  Press CTRL-C to stop\n");
});
var msgs = new overlayMessages_1.OverlayMessages();
// init socket io server
exports.io = SocketIO(exports.server);
exports.io.serveClient(true);
// init game server
var gameServer = new GameServer_1.GameServer(exports.io);
exports.io.on("connection", function (socket) {
    console.log("Client connected on port " + exports.app.get("port"));
    // const msgType = gameServer.newPlayerConnected(socket.id);
    // socket.emit("playerMsg", msgs.getMessageByType(msgType));
    socket.on("disconnect", function () {
        // const msgType = gameServer.playerDisconnected(socket.id);
        // if (msgType !== undefined) {
        // socket.broadcast.emit("playerMsg", msgs.getMessageByType(msgType));
        // }
        console.log("Client disconnected.");
    });
});
//# sourceMappingURL=server.js.map