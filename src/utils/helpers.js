const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const variables = require("../../config/variables");

exports.verifyPassword = async (hash, password) => {
  const verified = await bcrypt.compare(password, hash);
  return verified;
};

exports.hashPassword = async (password) => {
  const hash = await bcrypt.hash(password, 12);
  return hash;
};

exports.signJWT = (payload) => {
  const token = jwt.sign(payload, variables.jwt.SECRET, {
    algorithm: "HS512",
  });
  return token;
};
