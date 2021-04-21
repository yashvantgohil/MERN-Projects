const error = require("../middleware/error");
require("express-async-errors"); //this will handle http async req error and pass to error middleware

module.exports = function (app) {
  app.use("/", require("../routes/home"));
  app.use("/api/auth", require("../routes/auth"));
  app.use("/api/hackers", require("../routes/hacker"));
  app.use("/api/users", require("../routes/user"));
  app.use(error);
};
