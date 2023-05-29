const router = require("express").Router();
const UserController = require("../controllers/auth.controller");
const { authenticate } = require("../middlewares/auth/authentication");
const { validate } = require("../middlewares/validator");
const authValidator = require("../validators/auth.validator");

router.post(
  "/login",
  validate(authValidator.loginSchema, "body"),
  UserController.login
);

router.post(
  "/register",
  validate(authValidator.loginSchema, "body"),
  UserController.register
);

router.get("/profile", authenticate(), UserController.getProfile);

module.exports = router;
