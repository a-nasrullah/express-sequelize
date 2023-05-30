const { Sequelize } = require("sequelize");

const variables = require("./variables");

const DB_HOST = variables.db.HOST;
const DB_NAME = variables.db.NAME;
const DB_USER = variables.db.USER;
const DB_PASS = variables.db.PASS;
const DB_DIALECT = variables.db.DIALECT;

const db = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: DB_DIALECT,
});

module.exports = db;
