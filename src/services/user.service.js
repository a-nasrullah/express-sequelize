const { User } = require("../models");

exports.checkUserExistance = async (filter) => {
  try {
    const user = await User.findOne({ where: filter });
    return user;
  } catch (error) {
    throw error;
  }
};

exports.createUser = async (data) => {
  try {
    const user = await User.create(data);
    return user;
  } catch (error) {
    throw error;
  }
};

exports.findUserById = async (id) => {
  try {
    const user = await User.findByPk(id);
    return user;
  } catch (error) {
    throw error;
  }
};
