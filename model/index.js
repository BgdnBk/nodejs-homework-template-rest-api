const Contact = require("./schemas/contact");

const listContacts = async (userId, query) => {
  const {
    sortBy,
    sortByDesc,
    filter,
    subscription = null,
    limit = 5,
    offset = 0,
  } = query;
  const optionsSearch = { owner: userId };
  if (subscription !== null) {
    optionsSearch.subscription = subscription;
  }
  const results = await Contact.paginate(optionsSearch, {
    limit,
    offset,
    sort: {
      ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
      ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
    },
    select: filter ? filter.split("|").join(" ") : "",
    populate: {
      path: "owner",
      select: " email subscription -_id",
    },
  });
  return results;
};

const getContactById = async (userId, id) => {
  const results = await Contact.findById(id, { owner: userId }).populate({
    path: "owner",
    select: " email subscription -_id",
  });
  return results;
};

const removeContact = async (userId, id) => {
  const results = await Contact.findByIdAndRemove(id, { owner: userId });
  return results;
};

const addContact = async (userId, body) => {
  const results = await Contact.create({ ...body, owner: userId });
  return results;
};

const updateContact = async (userId, id, body) => {
  const results = await Contact.findByIdAndUpdate(
    { _id: id, owner: userId },
    { ...body },
    { new: true }
  );
  return results;
};

const updateStatusContact = async (userId, id, body) => {
  const results = await Contact.findByIdAndUpdate(
    { _id: id, owner: userId },
    { ...body },
    { new: true }
  );
  return results;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
