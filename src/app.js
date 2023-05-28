const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const { sendResponse } = require("./utils/response");

const app = express();

app.use(cors());
app.use(logger("common"));

app.get("/", (req, res) => {
  sendResponse(res, 200, true, null, "Server is up & running...");
});

module.exports = app;
