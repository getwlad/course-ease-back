import { Sequelize } from "sequelize-typescript";
import { User, Course, Person, Teacher, Student } from "../../domain/models";
const config = require("./config/database.js");
import "dotenv/config";

class Database {
  public connection: Sequelize;
  models = [User, Course, Person, Teacher, Student];
  constructor() {
    this.connection = new Sequelize({
      ...config,
      models: this.models,
    });
  }
}

export default new Database().connection;
