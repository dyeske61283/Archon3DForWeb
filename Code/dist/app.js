"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
var compression = require("compression");
var logger = require("morgan");
var errorhandler = require("errorhandler");
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
//# sourceMappingURL=app.js.map