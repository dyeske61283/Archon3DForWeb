"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// message types
var MsgTypes;
(function (MsgTypes) {
    MsgTypes[MsgTypes["Player1Connected"] = 0] = "Player1Connected";
    MsgTypes[MsgTypes["Player2Connected"] = 1] = "Player2Connected";
    MsgTypes[MsgTypes["Player1Disconnected"] = 2] = "Player1Disconnected";
    MsgTypes[MsgTypes["Player2Disconnected"] = 3] = "Player2Disconnected";
    MsgTypes[MsgTypes["GameAborted"] = 4] = "GameAborted";
    MsgTypes[MsgTypes["TooManyPlayers"] = 5] = "TooManyPlayers";
    MsgTypes[MsgTypes["ReadyToPlay"] = 6] = "ReadyToPlay";
    MsgTypes[MsgTypes["MakeSettings"] = 7] = "MakeSettings";
    MsgTypes[MsgTypes["PublishSettings"] = 8] = "PublishSettings";
    MsgTypes[MsgTypes["MakeTurn"] = 9] = "MakeTurn";
    MsgTypes[MsgTypes["Update"] = 10] = "Update";
    MsgTypes[MsgTypes["WaitingForPlayerN"] = 11] = "WaitingForPlayerN";
})(MsgTypes = exports.MsgTypes || (exports.MsgTypes = {}));
var OverlayMessages = /** @class */ (function () {
    // ctor
    function OverlayMessages() {
        this.dictionary = [];
        this.init();
    }
    // get method
    OverlayMessages.prototype.getMessageByType = function (msgType) {
        return this.dictionary[msgType] ? this.dictionary[msgType] : "";
    };
    // init
    OverlayMessages.prototype.init = function () {
        this.dictionary[MsgTypes.Player1Connected] = "Hello Player 1! Waiting for 2nd Player...";
        this.dictionary[MsgTypes.Player1Disconnected] = "Player 1 disconnected. Waiting for second Player...";
        this.dictionary[MsgTypes.Player2Connected] = "Hello Player 2! Waiting for 1st Player to adjust the settings...";
        this.dictionary[MsgTypes.Player2Disconnected] = "Player 2 disconnected. Waiting for second Player...";
        this.dictionary[MsgTypes.TooManyPlayers] = "Sorry we don't support multiple/parallel games yet, and two people are already playing :/";
        this.dictionary[MsgTypes.ReadyToPlay] = "Get ready to play!";
        this.dictionary[MsgTypes.MakeSettings] = "Please adjust the game settings now";
        this.dictionary[MsgTypes.PublishSettings] = "These are the games settings: ";
        this.dictionary[MsgTypes.MakeTurn] = "Your turn now";
        this.dictionary[MsgTypes.Update] = "updating your information";
        this.dictionary[MsgTypes.WaitingForPlayerN] = "Waiting for Player ";
        this.dictionary[MsgTypes.GameAborted] = "The other player disconnected :/ Game is being aborted now...";
    };
    return OverlayMessages;
}());
exports.OverlayMessages = OverlayMessages;
//# sourceMappingURL=overlayMessages.js.map