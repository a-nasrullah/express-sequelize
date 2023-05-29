const User = require("../models/user.model");

exports.checkUserExistance = async (filter) => {
  try {
    const user = await User.findOne(filter);
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
