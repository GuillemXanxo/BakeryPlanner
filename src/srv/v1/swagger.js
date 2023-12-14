const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const debug = require("debug")("bakeryplanner:swagger");
const chalk = require("chalk");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: { title: "BakeryPlanner", version: "1.0.0" },
};

const options = {
  swaggerDefinition,
  apis: ["./srv/v1/*.js", "./srv/schemas/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app, port) => {
  app.use("/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("/v1/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
  debug(chalk.greenBright(`Swagger docs on http://localhost:${port}/v1/docs`));
};

module.exports = { swaggerDocs };
