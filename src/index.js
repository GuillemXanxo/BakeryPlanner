require("dotenv").config();
const debug = require("debug")("pallars:root");
const chalk = require("chalk");
const serverUp = require("./srv/serverUp");
const connectDB = require("./db/index");
const { app } = require("./srv/index");

const connectionString = process.env.MONGODB_STRING;
const port = process.env.PORT || 3000;

(async () => {
  try {
    await connectDB(connectionString);
    await serverUp(port, app);
    debug(chalk.greenBright(`Server-up in ${port}`));
  } catch (error) {
    debug(chalk.redBright(`Error: `, error.message));
  }
})();
