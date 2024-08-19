const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = app;
