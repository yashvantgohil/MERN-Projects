const express = require("express");
const winston = require("winston");
const app = express();
const cors = require("cors");

app.use(cors());
const port = process.env.PORT || 4000; // >> set PORT = <number>
const connString = "mongodb://localhost:27017/hacker-tracking";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./startup/log")(connString);
require("./startup/route")(app); //setting middleware and routes
require("./startup/db")(connString); //connecting mongodb
require("./startup/config")();

app.listen(port, () => {
  winston.info(`server is listening to http://localhost:${port} `);
});
