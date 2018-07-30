"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("events");
var ClientController = /** @class */ (function (_super) {
    __extends(ClientController, _super);
    function ClientController(socket) {
        var _this = _super.call(this) || this;
        _this._actionActive = false;
        _this._socket = socket;
        _this.registerEvents();
        _this.sendPlayerConnected();
        return _this;
    }
    ClientController.prototype.registerEvents = function () {
        var btns = $("button");
        btns.click(this.handleInput.bind(this));
        $(document.body).keyup(this.handleKeyInput.bind(this));
    };
    ClientController.prototype.injectView = function (view) {
        this._view = view;
        this._view.on("figuresHandedOut", this.figuresHandedOut.bind(this));
    };
    ClientController.prototype.registerCommands = function () {
    };
    ClientController.prototype.handleInput = function (ev) {
        var component = ev.target;
        console.log("button pressed: ", component.id);
        // command execute
        switch (component.id) {
            case "btnColorFirst":
                this._model._settings.colorFirst = !this._model._settings.colorFirst;
                break;
            case "btnOwnColor":
                this._model._settings.color = !this._model._settings.color;
                break;
            case "btnSettingsDone":
                this.settingsDone();
                break;
            default:
                console.log("This is the default action for the button handler in the clientController");
        }
    };
    ClientController.prototype.handleKeyInput = function (ev) {
        if (ev.isDefaultPrevented) {
            return; // Do nothing if the event was already processed
        }
        switch (ev.key) {
            case "ArrowDown":
                this._cursor.move(0, -1);
                break;
            case "ArrowUp":
                this._cursor.move(0, 1);
                // Do something for "up arrow" key press.
                break;
            case "ArrowLeft":
                this._cursor.move(-1, 0);
                // Do something for "left arrow" key press.
                break;
            case "ArrowRight":
                this._cursor.move(1, 0);
                // Do something for "right arrow" key press.
                break;
            case "Enter":
                this._cursor.action();
                // Do something for "enter" or "return" key press.
                break;
            case "Escape":
                // Do something for "esc" key press.
                break;
            default:
                return; // Quit when this doesn't handle the key event.
        }
        // Cancel the default action to avoid it being handled twice
        ev.preventDefault();
    };
    ClientController.prototype.turnFinished = function () {
        // disable control
        this._socket.emit("turn finished");
    };
    ClientController.prototype.settingsDone = function () {
        console.log("sending settings to server");
        this._socket.emit("settings", this._model._settings);
        $("#myModal").modal("hide");
    };
    ClientController.prototype.sendPlayerConnected = function () {
        this._socket.emit("playerConnected");
    };
    ClientController.prototype.injectModel = function (model) {
        this._model = model;
    };
    ClientController.prototype.injectCursor = function (cursor) {
        this._cursor = cursor;
    };
    ClientController.prototype.figuresHandedOut = function () {
        console.log("called figuresHandedOut");
        this._socket.emit("handedFiguresOut");
    };
    return ClientController;
}(events_1.EventEmitter));
exports.ClientController = ClientController;
//# sourceMappingURL=ClientController.js.map