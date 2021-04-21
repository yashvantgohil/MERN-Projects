const mongoose = require("mongoose");
const winston = require("winston");

module.exports = function (connString) {
  mongoose
    .connect(connString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => winston.info("monogodb connected..."));
};
