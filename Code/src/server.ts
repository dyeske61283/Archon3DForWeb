import * as SocketIO from "socket.io";
import * as http from "http";
import * as express from "express";
import * as path from "path";
import * as compression from "compression";
import * as logger from "morgan";
import * as errorhandler from "errorhandler";
import { GameServer } from "./GameServer";
import { PlayerInfo } from "./PlayerInfo";
import { MsgTypes, OverlayMessages } from "./overlayMessages";
export const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(logger("dev"));
app.use(errorhandler());
app.use(express.static(path.join(__dirname, "public"), { maxAge: 31557600000 }));

// basic route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});


// start server
export const server = app.listen(app.get("port"), () => {
  console.log(("  App is running at http://localhost:%d in %s mode"), app.get("port"), app.get("env"));
  console.log("  Press CTRL-C to stop\n");
});

// init game server
const gameServer = new GameServer();

const msgs = new OverlayMessages();

// init socket io server
export const io = SocketIO(server);
io.serveClient(true);

io.on("connection", (socket) => {
  console.log("Client connected on port " + app.get("port"));
  const msgType = gameServer.newPlayerConnected(socket.id);
  socket.emit("playerMsg", msgs.getMessageByType(msgType));
  io.sockets.connected[socket.id].emit("huhu");
  socket.on("disconnect", () => {
    const msgType = gameServer.playerDisconnected(socket.id);
    if (msgType !== undefined) {
      socket.broadcast.emit("playerMsg", msgs.getMessageByType(msgType));
    }
    console.log("Client disconnected.");
  });
});