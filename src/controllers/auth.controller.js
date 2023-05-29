const asyncErrorHandler = require("../middlewares/errors/asyncErrorHandler");
const UserService = require("../services/user.service");
const ErrorHandler = require("../utils/errorHandler");
const constants = require("../../config/constants");
const { verifyPassword, signJWT, hashPassword } = require("../utils/helpers");
const { sendResponse } = require("../utils/response");

exports.login = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await UserService.checkUserExistance({ email });

  if (!user)
    return next(
      new ErrorHandler(
        "User not registered.",
        constants.STATUS_CODES.UNAUTHORIZED
      )
    );

  const passwordVerified = verifyPassword(user.password, password);

  if (!passwordVerified)
    return next(
      new ErrorHandler(
        "Password is incorrect.",
        constants.STATUS_CODES.UNAUTHORIZED
      )
    );

  const token = signJWT({ id: user._id });

  return sendResponse(
    res,
    constants.STATUS_CODES.OK,
    true,
    { token },
    "Loggedin successfully."
  );
});

exports.register = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await UserService.checkUserExistance({ email });

  if (user)
    return next(
      new ErrorHandler(
        "User already registered.",
        constants.STATUS_CODES.CONFLICT
      )
    );

  const hash = await hashPassword(password);

  const newUser = await UserService.createUser({ email, password: hash });

  if (!newUser)
    return next(
      new ErrorHandler(
        "Something went wrong.",
        constants.STATUS_CODES.UNAUTHORIZED
      )
    );

  const token = signJWT({ id: newUser._id });

  return sendResponse(
    res,
    constants.STATUS_CODES.OK,
    true,
    { token },
    "Registered successfully."
  );
});

exports.getProfile = asyncErrorHandler(async (req, res, next) => {
  const user = req.user;

  return sendResponse(
    res,
    constants.STATUS_CODES.OK,
    true,
    user,
    "User found successfully."
  );
});
