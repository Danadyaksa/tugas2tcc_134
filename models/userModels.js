const User = require("../schema/User");

const findAll = async () => {
  return await User.findAll({
    attributes: ["id", "username", "email"],
  });
};

const create = async (userData) => {
  return await User.create(userData);
}

module.exports = {
  findAll,
  create,
};
