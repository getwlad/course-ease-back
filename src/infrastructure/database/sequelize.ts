import { Sequelize } from "sequelize";

const config = require("./config/database.js");

import "dotenv/config";

class Database {
  connection: Sequelize;
  constructor() {
    this.connection = new Sequelize(config);
  }
}

export default new Database().connection;
