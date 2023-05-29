const express = require("express");
const cors = require("cors");
const logger = require("morgan");

const { sendResponse } = require("./utils/response");
const constants = require("../config/constants");

const app = express();

app.use(cors());
app.use(logger("common"));

app.get("/", (req, res) => {
  sendResponse(
    res,
    constants.STATUS_CODES.OK,
    true,
    null,
    "Server is up & running..."
  );
});

module.exports = app;
