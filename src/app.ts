import express, { Express, Request, Response, NextFunction } from "express";
import "reflect-metadata";
import db from "./infrastructure/database/sequelize";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerOptions from "./infrastructure/config/swaggerConfig";
import routes from "./interfaces/http/routes";
const cors = require("cors");

class App {
  declare server: Express;
  constructor() {
    this.server = express();
    this.initializeDB();
    this.middlewares();
    this.document();
    this.routes();
  }
  middlewares() {
    this.server.use(express.json());
    this.server.use(cors());
  }
  routes() {
    this.server.use(routes);
  }
  document() {
    const specs = swaggerJsdoc(swaggerOptions);
    this.server.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));
  }
  async initializeDB() {
    try {
      await db.authenticate();
      console.log("Conexão com o banco de dados realizada com sucesso");
      await db.sync();
      console.log("Sincronização de modelos concluída com sucesso");
    } catch (err: any) {
      console.log("Não foi possível conectar ao banco de dados: ", err.message);
    }
  }
}

export default new App().server;
