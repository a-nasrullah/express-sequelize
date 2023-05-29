const asyncErrorHandler = require("../errors/asyncErrorHandler");
const ErrorHandler = require("../../utils/errorHandler");
const constants = require("../../../config/constants");
const { verifyJWT } = require("../../utils/helpers");
const UserService = require("../../services/user.service");

exports.authenticate = () =>
  asyncErrorHandler(async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token)
      return next(
        new ErrorHandler(
          "Json web token is missing , try again",
          constants.STATUS_CODES.UNAUTHORIZED
        )
      );

    const isTokenValid = token.startsWith("Bearer ");

    if (!isTokenValid)
      return next(
        new ErrorHandler(
          "Json web token is invalid , try again",
          constants.STATUS_CODES.UNAUTHORIZED
        )
      );

    const authToken = token.split(" ")[1];

    const payload = verifyJWT(authToken);

    const user = await UserService.findUserById(payload.id);

    if (!user)
      return next(
        new ErrorHandler(
          "Something went wrong",
          constants.STATUS_CODES.UNAUTHORIZED
        )
      );

    req.user = user;

    return next();
  });
