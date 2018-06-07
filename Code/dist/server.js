"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SocketIO = require("socket.io");
var express = require("express");
var path = require("path");
var compression = require("compression");
var logger = require("morgan");
var errorhandler = require("errorhandler");
var serverFabrik_1 = require("./serverFabrik");
exports.app = express();
// utility functions
function checkContains(arr, val) {
    return arr.some(function (arrVal) { return val === arrVal; });
}
var Server = /** @class */ (function () {
    // constructs a new server
    function Server() {
        this.connections = 0; // keeps track of http connections and gets synced with the Socket-connections
        this.connectionsIO = 0; // keeps track of socket-connections
        this.httpServer = undefined; // the http-server
        this.ioServer = undefined; // the socketIO-server
        this._playerSockets = undefined;
        this._controller = undefined;
        this._adapter = undefined;
        this._model = undefined;
        this.httpServer = this.setupExpressServer();
        this.ioServer = this.setupSocketServer(this.httpServer);
        this.ioServer.on("connection", this.userConnects.bind(this));
        this._playerSockets = [];
    }
    // sets up a http express server including the routing and options
    Server.prototype.setupExpressServer = function () {
        var _this = this;
        // Express configuration
        var options = {
            dotfiles: "ignore",
            etag: false,
            extensions: ["htm", "html"],
            index: false,
            maxAge: "1d",
            redirect: false,
            setHeaders: function (res, path, stat) {
                res.set("x-timestamp", Date.now());
            }
        };
        // set middlewares
        exports.app.set("port", process.env.PORT || 3000);
        exports.app.use(compression());
        exports.app.use(logger("dev"));
        exports.app.use(errorhandler());
        exports.app.use(express.static(path.join(__dirname, "/public"), options));
        // basic route
        exports.app.get("/", function (req, res) {
            if (_this.connections > 1) {
                res.sendFile(path.join(__dirname + "/public/rejected.html"));
            }
            else {
                res.sendFile(path.join(__dirname + "/public/home.html"));
            }
            _this.connections++;
            _this.logConnections();
        });
        // start server
        var server = exports.app.listen(exports.app.get("port"), function () {
            console.log(("  App is running at http://localhost:%d in %s mode"), exports.app.get("port"), exports.app.get("env"));
            console.log("  Press CTRL-C to stop\n");
        });
        return server;
    };
    Server.prototype.setupSocketServer = function (server) {
        // init socket io server
        var io = SocketIO(server);
        io.serveClient(true);
        return io;
    };
    Server.prototype.userConnects = function (socket) {
        var _this = this;
        if (this.connectionsIO < 2) {
            console.log("adding socket to active players: " + socket.id);
            this._playerSockets[this.connectionsIO] = socket;
        }
        if (this._playerSockets.length === 2) {
            this._controller = serverFabrik_1.Fabrik.createServerController(undefined, this._playerSockets[0], this._playerSockets[1]);
            this._controller.registerMsgListeners();
            this._adapter = serverFabrik_1.Fabrik.createServerAdapter(undefined, this._playerSockets[0], this._playerSockets[1], this.ioServer);
        }
        this.connectionsIO++;
        this.connections = this.connectionsIO;
        console.log("user " + socket.id + " connected");
        this.logConnections();
        socket.on("disconnect", function () {
            _this.connectionsIO--;
            _this.connections = _this.connectionsIO;
            if (_this.connections > 1 && checkContains(_this._playerSockets, socket)) {
                _this.ioServer.sockets.emit("reload");
            }
            console.log("user " + socket.id + " disconnected");
            _this.logConnections();
        });
    };
    Server.prototype.logConnections = function () {
        console.log("connections: " + this.connections + " || ioConnections: " + this.connectionsIO);
    };
    return Server;
}());
exports.Server = Server;
(function () {
    function main() {
        // instantiate server
        var server = new Server();
    }
    main(); // Start the cycle
})();
//# sourceMappingURL=server.js.map