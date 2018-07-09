"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClientAdapter = /** @class */ (function () {
    function ClientAdapter(socket, client) {
        this._client = client;
        this._socket = socket;
    }
    ClientAdapter.prototype.registerListeners = function () {
        this._socket.on("boardUpdate", this.boardUpdate.bind(this));
        this._socket.on("playerInstantiated", this.playerUpdate.bind(this));
        this._socket.on("playerTwoConnected", this.secondPlayerUpdate.bind(this));
        this._socket.once("doSettings", this.doSettings.bind(this));
        this._socket.once("settingsChanged", this.settingsUpdate.bind(this));
        this._socket.on("Player1", this.playerOne.bind(this));
        this._socket.on("Player2", this.playerTwo.bind(this));
        this._socket.on("PlayersReady", this.playersReady.bind(this));
        this._socket.on("win", this.youWon.bind(this));
        this._socket.on("lose", this.youLost.bind(this));
        this._socket.on("playerChanged", this.playerUpdate.bind(this));
    };
    ClientAdapter.prototype.playerTwo = function (jsonModel) {
        var model = JSON.parse(jsonModel);
        this._client.injectPlayerNumber(false);
        this._client.injectModel(model);
        this._client.messageToSelf("You are Player 2.");
        this._client.messageToOther("Waiting for Player 1 to adjust the settings..");
    };
    ClientAdapter.prototype.playerOne = function (jsonModel) {
        var model = JSON.parse(jsonModel);
        this._client.injectPlayerNumber(true);
        this._client.injectModel(model);
        this._client.messageToSelf("You are Player 1.");
        this._client.messageToOther("Waiting for other player to connect..");
    };
    ClientAdapter.prototype.boardUpdate = function (info) {
        console.log("Got updated BoardInfo: " + info);
        var board = this._client.getModel()._board;
        board.isActive = info.isActive;
        board.fields = info.fields;
    };
    ClientAdapter.prototype.settingsUpdate = function (info) {
        console.log("Got updated SettingsInfo: " + info);
        this._client.messageToSelf("Settings got adjusted, let's get started!");
        var settings = this._client.getModel()._settings;
        settings.color = info.color;
        settings.colorFirst = info.colorFirst;
        info.color ? this._client.getCursor().injectFigures(this._client.getModel()._whiteFigures) : this._client.getCursor().injectFigures(this._client.getModel()._blackFigures);
    };
    ClientAdapter.prototype.playersReady = function () {
        console.log("handler for playersReady called");
        if (this._client.getPlayerNumber())
            this._client.messageToOther("Player 2 connected. Let's get started with the settings.");
    };
    ClientAdapter.prototype.playerUpdate = function (info) {
        console.log("Got updated PlayerInfo" + info);
        if (info.socket.id === this._socket.id) {
        }
    };
    ClientAdapter.prototype.secondPlayerUpdate = function (infoP2) {
        console.log("Got updated PlayerInfo" + infoP2);
    };
    ClientAdapter.prototype.youWon = function () {
        $("#alertWin").show();
        setTimeout(function () { return location.reload(); }, 5000);
    };
    ClientAdapter.prototype.youLost = function () {
        var alertBox = $("#alertWin");
        alertBox.removeClass("alert-success").addClass("alert-danger").html("<strong>Lose!</strong> Next time you'll win! The page will refresh in a few seconds for your next try.");
        alertBox.show();
        setTimeout(function () { return location.reload(); }, 5000);
    };
    ClientAdapter.prototype.doSettings = function () {
        console.log("handler for settings called");
        $("#settingsPrompt").modal("show");
    };
    return ClientAdapter;
}());
exports.ClientAdapter = ClientAdapter;
//# sourceMappingURL=ClientAdapter.js.map