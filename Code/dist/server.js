"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const express = require("express");
class Server {
    constructor() {
        this.app = express();
        this.port = 8080;
        this.app.use(express.static(path.join(__dirname, '../www')));
        this.app.listen(this.port, () => {
            console.log(`Listening at http://localhost:${this.port}/`);
        });
    }
}
let server = new Server();
