import { Sequelize } from "sequelize";
import { User } from "../../domain/models/User";
import { Course } from "../../domain/models/Course";
import { Person } from "../../domain/models/Person";
import { Teacher } from "../../domain/models/Teacher";
import { Student } from "../../domain/models/Student";

const config = require("./config/database.js");

import "dotenv/config";

class Database {
  public connection: Sequelize;

  constructor() {
    this.connection = new Sequelize({
      ...config,
      models: [User, Course, Person, Teacher, Student],
    });
  }
}

export default new Database().connection;
