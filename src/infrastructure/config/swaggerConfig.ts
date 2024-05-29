// src/config/swaggerConfig.ts
import { SwaggerDefinition, Options } from "swagger-jsdoc";

const swaggerDefinition: SwaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "CourseEase Documentation",
    version: "1.0.0",
    description: "Documentação para a api da aplicação CourseEase",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Development server",
    },
  ],
};

const options: Options = {
  swaggerDefinition,
  apis: ["./src/interfaces/http/routes/*.ts"],
};

export default options;
