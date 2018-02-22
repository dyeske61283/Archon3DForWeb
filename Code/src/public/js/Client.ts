import { MyScene } from "./MyScene";
import { Board } from "./Board";
import { Cursor, direction } from "./Cursor";
import { Figure } from "./Figure";
import { ActionsWiring } from "./ActionWiring";
import { CommunicationManager } from "./CommunicationManager";
export class Client {
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
  public figure2: Figure;
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
    let pos: [number, number] = this.board.getFieldPosition(0, 4);
    this.figure.setPosition(pos["0"], pos["1"]);

    this.figure2 = new Figure(this.SCALING_FACTOR, this.MAX_FIELDS);
    pos = this.board.getFieldPosition(8, 4);
    this.figure2.setPosition(pos["0"], pos["1"]);
    // add all to scene
    this.scn.board(this.board).cursor(this.cursor).figure(this.figure).figure(this.figure2).startRenderLoop();
    // init event/action handling
    this.actionWirer = new ActionsWiring();
    this.actionWirer.addResizeListener(this.scn.handleResize);
    this.actionWirer.addKeyPressListener(this.onKeyPress.bind(this));
  }

  public onKeyPress(ev: KeyboardEvent): void {
    ev.preventDefault();
    switch (ev.key) {
      case "ArrowUp":
        this.cursor.move(direction.Up);
      break;
      case "ArrowDown":
        this.cursor.move(direction.Down);
      break;
      case "ArrowLeft":
      this.cursor.move(direction.Left);
      break;
      case "ArrowRight":
      this.cursor.move(direction.Right);
      break;
      case " ":
      if (this.figure.isSelected()) {
        this.figure.setPositionWithCursor(this.cursor);
        this.figure.deselect();
      } else {
        if (this.cursor.getMesh().position.distanceTo(this.figure.getMesh().position) < 2)
          this.figure.select();
      }
      break;
    }
  }
}