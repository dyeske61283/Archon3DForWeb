
// responsible for receiving messages from the server-adapter and passing the information to the view
export interface IClientAdapter {
	// implementation should just register listeners for each event individually and hand over data and/or log it
	registerListeners(): void;
}