require("dotenv").config();

exports.app = {
  PORT: process.env.PORT,
};

exports.db = {
  URI: process.env.DB_URI,
};

exports.jwt = {
  SECRET: process.env.JWT_SECRET,
};
