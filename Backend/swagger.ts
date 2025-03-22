import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "BoostFitWeb API",
      version: "1.0.0",
      description: "Boostfit API",
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
  },
  apis: ["./route/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app: Express) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
