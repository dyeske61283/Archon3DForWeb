// message types
export enum MsgTypes {
	Player1Connected,
	Player2Connected,
	Player1Disconnected,
	Player2Disconnected,
	GameAborted,
	TooManyPlayers,
	ReadyToPlay,
	MakeSettings,
	PublishSettings,
	MakeTurn,
	Update,
	WaitingForPlayerN
}

export class OverlayMessages {
	// messages
	private dictionary: string[];
	// get method
	public getMessageByType(msgType: MsgTypes): string {
		return this.dictionary[msgType] ? this.dictionary[msgType] : "";
	}
	// ctor
	constructor() {
		this.dictionary = [];
		this.init();
	}
	// init
	init(): void {
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
	}
}