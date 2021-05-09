const { contacts } = require("./data");

const listContacts = jest.fn((userId, query) => {
  const { limit = 5, offset = 0 } = query;
  return { contacts, total: contacts.lenhth, limit, offset };
});

const getContactById = jest.fn((userId, id) => {
  const [contact] = contacts.filter((el) => String(el._id) === String(id));
  return contact;
});

const removeContact = jest.fn((userId, id) => {
  const index = contacts.findIndex((el) => String(el._id) === String(id));
  if (index === -1) {
    return null;
  }
  const [contact] = contacts.splice(index, 1);
  return contact;
});

const addContact = jest.fn((userId, body) => {
  contacts.push({ ...body, _id: "6081bff46009a91588e2deag" });
  return contacts;
});

const updateContact = jest.fn((userId, id, body) => {
  const [contact] = contacts.filter((el) => String(el._id) === String(id));
  if (contact) {
    contact = { ...contact, ...body };
  }
  return contact;
});

const updateStatusContact = jest.fn((userId, id, body) => {
  const [contact] = contacts.filter((el) => String(el._id) === String(id));
  if (contact) {
    contact = { ...contact, ...body };
  }
  return contact;
});

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
