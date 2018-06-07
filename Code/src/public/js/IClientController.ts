
// watches for events from the player aka input and uses commands to generate messages from that
export interface IClientController {
	registerEvents(): void;
	registerCommands(): void;
}