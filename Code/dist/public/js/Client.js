"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MyScene_1 = require("./MyScene");
var Board_1 = require("./Board");
var Cursor_1 = require("./Cursor");
var Figure_1 = require("./Figure");
var ActionWiring_1 = require("./ActionWiring");
var CommunicationManager_1 = require("./CommunicationManager");
var WaitingForPlayerOverlay_1 = require("./WaitingForPlayerOverlay");
var Client = /** @class */ (function () {
    function Client() {
        // client needs to have..
        // scene
        // Board
        // battle field
        // Figure representation
        // Cursor
        // controls & settings overlay
        // waiting for player overlay
        // action handler for input event handling
        // communication socket
        // maybe some player relevant / populated info
        // drawing constants
        this.MAX_FIELDS = 9;
        this.SCALING_FACTOR = 5;
        this.DOM_ELEMENT = "#game-holder";
        this.init();
    }
    Client.prototype.nextStep = function () {
    };
    Client.prototype.handleAction = function () {
        var _this = this;
        this.socket.on("playerMsg", function (msg) {
            _this.pwOverlay.setText(msg);
            console.log("got a msg from the server: " + msg);
            _this.pwOverlay.on();
        });
        this.socket.on("huhu", function () {
            console.log("got huhu msg from server");
        });
    };
    Client.prototype.sendMessage = function (msgType, content) {
    };
    Client.prototype.init = function () {
        this.controlEnabled = false;
        // init communication
        this.socket = io();
        this.handleAction();
        this.commManager = new CommunicationManager_1.CommunicationManager();
        // init scene
        this.scn = new MyScene_1.MyScene(this.SCALING_FACTOR, this.DOM_ELEMENT);
        // init board
        this.board = new Board_1.Board(this.SCALING_FACTOR, this.MAX_FIELDS);
        // init cursor
        this.cursor = new Cursor_1.Cursor(this.SCALING_FACTOR, this.MAX_FIELDS);
        // init figures
        this.figure = new Figure_1.Figure(this.SCALING_FACTOR, this.MAX_FIELDS);
        var pos = this.board.getFieldPosition(0, 4);
        this.figure.setPosition(pos["0"], pos["1"]);
        this.figure2 = new Figure_1.Figure(this.SCALING_FACTOR, this.MAX_FIELDS);
        pos = this.board.getFieldPosition(8, 4);
        this.figure2.setPosition(pos["0"], pos["1"]);
        // add all to scene
        this.scn.board(this.board).cursor(this.cursor).figure(this.figure).figure(this.figure2).startRenderLoop();
        // init event/action handling
        this.actionWirer = new ActionWiring_1.ActionsWiring();
        this.actionWirer.addResizeListener(this.scn.handleResize);
        this.actionWirer.addKeyPressListener(this.onKeyPress.bind(this));
        // init overlay
        this.pwOverlay = new WaitingForPlayerOverlay_1.OverlayImpl("WaitingForPlayerOverlay", "");
    };
    Client.prototype.onKeyPress = function (ev) {
        if (this.controlEnabled) {
            ev.preventDefault();
            switch (ev.key) {
                case "ArrowUp":
                    this.cursor.move(Cursor_1.direction.Up);
                    break;
                case "ArrowDown":
                    this.cursor.move(Cursor_1.direction.Down);
                    break;
                case "ArrowLeft":
                    this.cursor.move(Cursor_1.direction.Left);
                    break;
                case "ArrowRight":
                    this.cursor.move(Cursor_1.direction.Right);
                    break;
                case " ":
                    if (this.figure.isSelected()) {
                        this.figure.setPositionWithCursor(this.cursor);
                        this.figure.deselect();
                    }
                    else {
                        if (this.cursor.getMesh().position.distanceTo(this.figure.getMesh().position) < 2)
                            this.figure.select();
                    }
                    break;
            }
        }
    };
    return Client;
}());
exports.Client = Client;
//# sourceMappingURL=Client.js.map