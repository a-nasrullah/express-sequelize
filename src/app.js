const express = require("express");
const cors = require("cors");
const logger = require("morgan");

const { sendResponse } = require("./utils/response");
const constants = require("../config/constants");

const app = express();

app.use(cors());
app.use(logger("common"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  sendResponse(
    res,
    constants.STATUS_CODES.OK,
    true,
    null,
    "Server is up & running..."
  );
});

const apiRouter = require("./routers");
const error = require("./middlewares/errors/error");
app.use("/api/", apiRouter);

app.use(error);

module.exports = app;
