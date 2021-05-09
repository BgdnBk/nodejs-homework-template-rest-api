const { User, users } = require("./data");

const findById = jest.fn((id) => {
  const [user] = users.filter((el) => String(el._id) === String(id));
  return user;
});

const findByEmail = jest.fn((email) => {
  return {};
});

const create = jest.fn((userOptions) => {
  return {};
});

const updateToken = jest.fn((id, token) => {
  return {};
});

const updateAvatarModel = jest.fn((id, avatar) => {
  return {};
});

module.exports = {
  findById,
  findByEmail,
  create,
  updateToken,
  updateAvatarModel,
};
