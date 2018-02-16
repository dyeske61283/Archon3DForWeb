"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SocketIO = require("socket.io");
var express = require("express");
var path = require("path");
var compression = require("compression");
var logger = require("morgan");
var errorhandler = require("errorhandler");
var GameServer_1 = require("./GameServer");
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
// init gameserver
var gameServer = new GameServer_1.GameServer();
// init socket io server
exports.io = SocketIO(exports.server);
exports.io.serveClient(true);
exports.io.on("connection", function (socket) {
    console.log("Client connected on port " + exports.app.get("port"));
    // socket.emit("colorChange", 5);
});
exports.io.on("disconnect", function () {
    console.log("Client disconnected.");
});
//# sourceMappingURL=server.js.map