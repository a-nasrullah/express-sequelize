const ErrorHandler = require("../utils/errorHandler");
const asyncErrorHandler = require("./errors/asyncErrorHandler");
const constants = require("../../config/constants");

exports.validate = (schema, type) => {
  return asyncErrorHandler(async (req, res, next) => {
    const data = req[type];
    const result = schema.validate(data);
    if (result.error) {
      return next(
        new ErrorHandler(
          result.error.details[0].message,
          constants.STATUS_CODES.ERROR
        )
      );
    }
    return next();
  });
};
