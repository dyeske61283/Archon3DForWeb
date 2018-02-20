
class Client {
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
  public readonly MAX_FIELDS: number = 9;
  public readonly SCALING_FACTOR: number = 5;
  public readonly DOM_ELEMENT: string = "#game-holder";
  public scn: MyScene;
  public board: Board;
  public cursor: Cursor;
  public figure: Figure;
  public socket: SocketIOClient.Socket;
  public actionWirer: ActionsWiring;
  public commManager: CommunicationManager;
  public constructor() {
    this.init();
  }

  public nextStep(): void {

  }

  public handleAction(): void {

  }

  public sendMessage(msgType: string, content: object): void {

  }

  private init(): void {
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
  }

  public onKeyPress(ev: KeyboardEvent) {

    this.figure.setPosition(this.cursor);
  }
}