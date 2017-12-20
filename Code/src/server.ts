import * as path from "path";
import * as express from "express";
import * as io from "socket.io"

class Server
{
	public app: express.Application;
	private port: number;

	public constructor(){
		this.app = express();
		this.port = 8080;

		this.app.use(express.static(path.join(__dirname, '../www')));

		this.app.listen(this.port, () => {
			// Success callback
			console.log(`Listening at http://localhost:${this.port}/`)
			
			;});
	}


}

let server  = new Server();
