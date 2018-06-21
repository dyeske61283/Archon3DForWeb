import * as SocketIO from "socket.io";
import * as http from "http";
import * as express from "express";
import * as path from "path";
import * as compression from "compression";
import * as logger from "morgan";
import * as errorhandler from "errorhandler";
import { ServeStaticOptions } from "serve-static";
import { IServerController } from "./interfaces/IServerController";
import { IServerAdapter } from "./interfaces/IServerAdapter";
import { Fabrik } from "./serverFabrik";
import { IGameModel } from "./interfaces/IGameModel";
export const app = express();

// utility functions
function checkContains<T>(arr: Array<T>, val: T): boolean {
  return arr.some((arrVal) => val === arrVal);
}

export class Server {

  connections: number = 0; // keeps track of http connections and gets synced with the Socket-connections
  connectionsIO: number = 0; // keeps track of socket-connections
  httpServer: http.Server = undefined; // the http-server
  ioServer: SocketIO.Server = undefined; // the socketIO-server
  _playerSockets: Array<SocketIO.Socket> = undefined;
  _controller: IServerController = undefined;
  _adapter: IServerAdapter = undefined;
  _model: IGameModel = undefined;
  // constructs a new server
  constructor() {
    this.httpServer = this.setupExpressServer();
    this.ioServer = this.setupSocketServer(this.httpServer);
    this.ioServer.on("connection", this.userConnects.bind(this));
    this._playerSockets = [];
  }
  // sets up a http express server including the routing and options
  setupExpressServer(): http.Server {
    // Express configuration
    const options: ServeStaticOptions = {
      dotfiles: "ignore",
      etag: false,
      extensions: ["htm", "html"],
      index: false,
      maxAge: "1d",
      redirect: false,
      setHeaders: function (res: any, path: any, stat: any) {
        res.set("x-timestamp", Date.now());
      }
    };
    // set middlewares
    app.set("port", process.env.PORT || 3000);
    app.use(compression());
    app.use(logger("dev"));
    app.use(errorhandler());
    app.use(express.static(path.join(__dirname, "/public"), options));

    // basic route
    app.get("/", (req, res) => {
      if (this.connections > 1) {
        res.sendFile(path.join(__dirname + "/public/rejected.html"));
      } else {
        res.sendFile(path.join(__dirname + "/public/home.html"));
      }
      this.connections++;
      this.logConnections();
    });

    // start server
    const server = app.listen(app.get("port"), () => {
      console.log(("  App is running at http://localhost:%d in %s mode"), app.get("port"), app.get("env"));
      console.log("  Press CTRL-C to stop\n");
    });

    return server;
  }

  setupSocketServer(server: http.Server): SocketIO.Server {
    // init socket io server
    const io = SocketIO(server);
    io.serveClient(true);
    return io;
  }

  userConnects(socket: SocketIO.Socket): void {
    if (this.connectionsIO < 2) {
      console.log("adding socket to active players: " + socket.id);
      Fabrik.provideSocket(socket);
      this._playerSockets.push(socket);
    }
    if (Fabrik.readyToCreate()) {
      this._controller = Fabrik.createServerController(undefined);
      this._controller.registerMsgListeners();
      this._adapter = Fabrik.createServerAdapter(undefined,  this.ioServer);
    }
    this.connectionsIO++;
    this.connections = this.connectionsIO;
    console.log("user " + socket.id + " connected");
    this.logConnections();
    socket.on("disconnect", () => {
      this.connectionsIO--;
      this.connections = this.connectionsIO;
      if (this.connections > 1 && checkContains(this._playerSockets, socket)) {
        this.ioServer.sockets.emit("reload");
      }
      console.log("user " + socket.id + " disconnected");
      this.logConnections();
  });
  }

  logConnections(): void {
    console.log("connections: " + this.connections + " || ioConnections: " + this.connectionsIO);
  }

}

(function () {
  function main() {
    // instantiate server
    const server = new Server();
  }

  main(); // Start the cycle
})();