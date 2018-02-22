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
    };
    Client.prototype.sendMessage = function (msgType, content) {
    };
    Client.prototype.init = function () {
        // init event/action handling
        this.actionWirer = new ActionsWiring();
        this.actionWirer.addResizeListener(this.scn.handleResize);
        // init communication
        this.socket = io();
        this.commManager = new CommunicationManager();
        // init scene
        this.scn = new MyScene(this.SCALING_FACTOR, this.DOM_ELEMENT);
        // init board
        this.board = new Board(this.SCALING_FACTOR, this.MAX_FIELDS);
        // init cursor
        this.cursor = new Cursor(this.SCALING_FACTOR, this.MAX_FIELDS);
        // init figures
        this.figure = new Figure(this.SCALING_FACTOR, this.MAX_FIELDS);
        // add all to scene
        this.scn.board(this.board).cursor(this.cursor).figure(this.figure).startRenderLoop();
    };
    Client.prototype.onKeyPress = function (ev) {
        this.figure.setPosition(this.cursor);
    };
    return Client;
}());
//# sourceMappingURL=Client.js.map