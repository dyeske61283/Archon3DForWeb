"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var View_1 = require("./View");
var Client = /** @class */ (function () {
    function Client(fabrik, socket) {
        var self = this;
        this._fabrik = fabrik;
        this._adapter = fabrik.createClientAdapter(socket, self);
        this._adapter.registerListeners();
        this._viewBuilder = fabrik.createViewBuilder();
        this._cursor = fabrik.createCursor();
        this._controller = fabrik.createClientController(socket);
    }
    Client.prototype.getPlayerNumber = function () {
        return this._playerOne;
    };
    Client.prototype.getAdapter = function () {
        return this._adapter;
    };
    Client.prototype.getController = function () {
        return this._controller;
    };
    Client.prototype.getModel = function () {
        return this._model;
    };
    Client.prototype.getView = function () {
        return this._view;
    };
    Client.prototype.injectPlayerNumber = function (playerOne) {
        this._playerOne = playerOne;
    };
    Client.prototype.getCursor = function () {
        return this._cursor;
    };
    Client.prototype.injectModel = function (model) {
        this._model = model;
        this._controller.injectModel(model);
        this._viewBuilder.injectModel(model);
        this._view = new View_1.View(this._viewBuilder, this._cursor.info());
        this._controller.injectView(this._view);
    };
    Client.prototype.messageToSelf = function (msg) {
        var messagePanel1 = $("#messagesOwn ul");
        this.removeOldMessages(messagePanel1);
        messagePanel1.prepend($("<li class=\"list-group-item\">").text(msg));
    };
    Client.prototype.messageToOther = function (msg) {
        var messagePanel2 = $("#messagesOther ul");
        this.removeOldMessages(messagePanel2);
        messagePanel2.prepend($("<li class=\"list-group-item\">").text(msg));
    };
    Client.prototype.setControl = function () {
    };
    Client.prototype.removeOldMessages = function (msgPanel) {
        msgPanel.children().slice(1).remove();
    };
    return Client;
}());
exports.Client = Client;
//# sourceMappingURL=Client.js.map