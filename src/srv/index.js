require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const userRouters = require("./v1/routes/userRouters");
const recipesRouters = require("./v1/routes/recipesRouters");
const { notFoundError, generalError } = require("./middlewares/errors");
const { swaggerDocs } = require("./v1/swagger");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
/**
 * @openapi
 * /healthcheck:
 *  get:
 *     tags:
 *     - Healthcheck
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
app.get("/healthcheck", (req, res) => res.sendStatus(200));
app.use("/user/recipes", recipesRouters);
app.use("/user/access", userRouters);
swaggerDocs(app, port);
app.use(notFoundError);
app.use(generalError);

module.exports = { app };
