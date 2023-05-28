//importing class

const ErrorHandler = require("../../utils/errorHandler");
const { sendResponse } = require("../../utils/response");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "INTERNAL SERVER ERROR";

  //handling cast error
  if (err.name == "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  //handling duplicate key error
  if (err.code === 11000) {
    const message = `This ${Object.keys(err.keyValue)} already exists`;
    err = new ErrorHandler(message, 400);
  }

  //handling wrong token
  if (err.name == "JsonWebTokenError") {
    const message = `Json web token is invalid , try again`;
    err = new ErrorHandler(message, 401);
  }

  //handling expired token
  if (err.name == "TokenExpiredError") {
    const message = `Json web token is expired , try again`;
    err = new ErrorHandler(message, 401);
  }

  sendResponse(res, err.statusCode, false, err, err.message);
};
