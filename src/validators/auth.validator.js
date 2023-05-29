const Joi = require("joi");

exports.loginSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required().min(6).max(16),
});
