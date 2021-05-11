const User = require("./schemas/user");

const findById = async (id) => {
  return await User.findById(id);
};

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

const create = async (userOptions) => {
  const user = new User(userOptions);
  return await user.save();
};

const updateToken = async (id, token) => {
  return await User.findByIdAndUpdate(id, { token });
};

const updateAvatarModel = async (id, avatar) => {
  return await User.findByIdAndUpdate(id, { avatar });
};

module.exports = {
  findById,
  findByEmail,
  create,
  updateToken,
  updateAvatarModel,
};
