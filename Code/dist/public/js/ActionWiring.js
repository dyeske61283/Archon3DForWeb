var ActionsWiring = /** @class */ (function () {
    function ActionsWiring() {
    }
    ActionsWiring.prototype.addResizeListener = function (callback) {
        window.addEventListener("resize", callback, false);
    };
    ActionsWiring.prototype.addKeyPressListener = function (callback) {
        window.addEventListener("keypress", callback, false);
    };
    return ActionsWiring;
}());
//# sourceMappingURL=ActionWiring.js.map