const express = require("express");
const cors = require("cors");
const { dbConection } = require("../db/config");

require("dotenv").config();

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuarioPath = "/api/users";

    // conect to db
    this.dbConect();

    // Middleware
    this.middlewares();

    // Routes apps
    this.routes();
  }

  async dbConect() {
    await dbConection();
  }

  middlewares() {
    // Cors
    this.app.use(cors());

    // parse
    this.app.use(express.json());

    // Public Dir
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.usuarioPath, require("../routes/users"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`App runing in port ${this.port}`);
    });
  }
}

module.exports = Server;
