const { DataTypes } = require("sequelize");
const db = require("../../config/database");

const User = db.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: true, tableName: "users" }
);

module.exports = User;
