require("dotenv").config();

exports.app = {
  PORT: process.env.PORT,
};

exports.db = {
  DB_URI: process.env.DB_URI,
};
