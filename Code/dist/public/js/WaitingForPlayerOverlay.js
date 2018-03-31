"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OverlayImpl = /** @class */ (function () {
    function OverlayImpl(htmlElement, text) {
        this.htmlElement = htmlElement;
        this.showing = false;
        this.text = text;
    }
    OverlayImpl.prototype.setText = function (text) {
        this.text = text;
        this.initHTMLElement();
    };
    OverlayImpl.prototype.on = function () {
        this.showing = true;
        $("#" + this.htmlElement).show();
    };
    OverlayImpl.prototype.off = function () {
        this.showing = false;
        $("#" + this.htmlElement).hide("fast");
    };
    OverlayImpl.prototype.initHTMLElement = function () {
        $("#" + this.htmlElement).find("div").text(this.text);
    };
    return OverlayImpl;
}());
exports.OverlayImpl = OverlayImpl;
//# sourceMappingURL=WaitingForPlayerOverlay.js.map