"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PlayerInfo_1 = require("./PlayerInfo");
var ConnectionManager = /** @class */ (function () {
    function ConnectionManager() {
        this.validConnectionState = false;
        this.state = 0;
    }
    ConnectionManager.prototype.playerConnects = function (id, players) {
        switch (this.state) {
            case 0:
            case 1:
                this.state++;
                return new PlayerInfo_1.PlayerInfo(id);
            case 2:
                return undefined;
        }
    };
    ConnectionManager.prototype.playerDisconnects = function (id, players) {
        this.state--;
    };
    return ConnectionManager;
}());
exports.ConnectionManager = ConnectionManager;
//# sourceMappingURL=ConnectionManager.js.map