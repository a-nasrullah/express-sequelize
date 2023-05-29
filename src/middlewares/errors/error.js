//importing class

const ErrorHandler = require("../../utils/errorHandler");
const { sendResponse } = require("../../utils/response");
const constants = require("../../../config/constants");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || constants.STATUS_CODES.SERVER_ERROR;
  err.message = err.message || "INTERNAL SERVER ERROR";

  //handling cast error
  if (err.name == "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, constants.STATUS_CODES.ERROR);
  }

  //handling duplicate key error
  if (err.code === 11000) {
    const message = `This ${Object.keys(err.keyValue)} already exists`;
    err = new ErrorHandler(message, constants.STATUS_CODES.ERROR);
  }

  //handling wrong token
  if (err.name == "JsonWebTokenError") {
    const message = `Json web token is invalid , try again`;
    err = new ErrorHandler(message, constants.STATUS_CODES.UNAUTHORIZED);
  }

  //handling expired token
  if (err.name == "TokenExpiredError") {
    const message = `Json web token is expired , try again`;
    err = new ErrorHandler(message, constants.STATUS_CODES.UNAUTHORIZED);
  }

  sendResponse(res, err.statusCode, false, err, err.message);
};
