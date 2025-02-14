import * as SocketIO from "socket.io";
import * as http from "http";
import * as express from "express";
import * as path from "path";
import * as compression from "compression";
import * as logger from "morgan";
import * as errorhandler from "errorhandler";
import * as util from "util";
import { ServeStaticOptions } from "serve-static";
import { IServerController } from "./interfaces/IServerController";
import { IServerAdapter } from "./interfaces/IServerAdapter";
import { Fabrik } from "./serverFabrik";
import { IGameModel } from "./interfaces/IGameModel";
import { ModelBuilder } from "./implementations/ModelBuilder";
import * as fs from "fs";
import { IFigureInfo } from "./informationmodel/IFigureInfo";
import { GameModel } from "./implementations/GameModel";

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
  _model: GameModel = undefined;
  _sendModel: IGameModel = undefined;
  _isSetup: boolean = false;
  // constructs a new server
  constructor() {
    this._playerSockets = [];
    this._model = Fabrik.createModel(new ModelBuilder());
    this.initSendModel();
    this.httpServer = this.setupExpressServer();
    this.ioServer = this.setupSocketServer(this.httpServer);
    this.ioServer.on("connection", this.userConnects.bind(this));
  }

  private initSendModel() {
    this._sendModel = {
      _players: this._model.players(),
      _settings: this._model.settings(),
      _spells: this._model.spells(),
      _whiteFigures: this._model.whiteFigures(),
      _actionField: this._model.actionBoard(),
      _blackFigures: this._model.blackFigures(),
      _board: this._model.board(),
      _defeatedFiguresBlack: this._model.defeatedBlackFigures(),
      _defeatedFiguresWhite: this._model.defeatedWhiteFigures(),
      _elementals: this._model.elementals(),
      _observers: undefined
    };
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
      // this._model._Players[this._playerSockets.length].injectSocket(socket);
      this._playerSockets.push(socket);
      socket.once("playerConnected", () => {
        const jsonModel = JSON.stringify(this._sendModel);
        if (this.connectionsIO > 1) {
          socket.emit("Player2", jsonModel);
          if (Fabrik.readyToCreate()) {
            this._controller = Fabrik.createServerController(this._model);
            this._controller.registerMsgListeners();
            this._adapter = Fabrik.createServerAdapter(this._model, this.ioServer);
            this._model.addObserver(this._adapter);
            this._isSetup = true;
          } else {
            throw new Error("Something is fishy: 2nd playerConnected received but no 2 sockets in fabrik to create comm objects");
          }
        } else {
          socket.emit("Player1", jsonModel);
        }
      });
    }
    this.connectionsIO++;
    this.connections = this.connectionsIO;
    console.log("user " + socket.id + " connected");
    this.logConnections();
    socket.on("disconnect", () => {
      this.connectionsIO--;
      this.connections = this.connectionsIO;
      console.log("user " + socket.id + " disconnected");
      this.logConnections();
      if (this.connections > 1 && checkContains(this._playerSockets, socket)) {
        // an active player disconnected
        console.log("User was active player. Performing cleanup/reset");
        // let all clients reload
        this.ioServer.sockets.emit("reload");
        // clean up comm objects to recreate them as needed
        if (this._isSetup) {
          Fabrik.resetSockets();
          this._controller.removeMsgListeners();
          this._model.removeObserver(this._adapter);
          this._controller = undefined;
          this._adapter = undefined;
          this._model = undefined;
          this._model = Fabrik.createModel(new ModelBuilder());
          this.initSendModel();
          this._isSetup = false;
        }
      }
    });
  }

  logConnections(): void {
    console.log("connections: " + this.connections + " || ioConnections: " + this.connectionsIO);
  }

}

function main() {
  // instantiate server
  const server = new Server();
}

main(); // Start the cycle