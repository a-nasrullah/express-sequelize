require("dotenv").config();

exports.app = {
  PORT: process.env.PORT,
};

exports.db = {
  HOST: process.env.DB_HOST,
  NAME: process.env.DB_NAME,
  USER: process.env.DB_USER,
  PASS: process.env.DB_PASS,
  DIALECT: process.env.DB_DIALECT,
};

exports.jwt = {
  SECRET: process.env.JWT_SECRET,
};
