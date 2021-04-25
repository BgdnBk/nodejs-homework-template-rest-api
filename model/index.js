const Contact = require("./schemas/contact");

const listContacts = async () => {
  const results = await Contact.find();
  return results;
  // return db.get("contacts").value();
};

const getContactById = async (id) => {
  const results = await Contact.findById(id);
  return results;
  // return db.get("contacts").find({ id }).value();
};

const removeContact = async (id) => {
  const results = await Contact.findByIdAndRemove(id);
  return results;
  // const [record] = db.get("contacts").remove({ id }).write();
  // return record;
};

const addContact = async (body) => {
  const results = await Contact.create(body);
  return results;
  // const record = { ...body };
  // db.get("contacts").push(record).write();
  // return record;
};

const updateContact = async (id, body) => {
  const results = await Contact.findByIdAndUpdate(
    id,
    { ...body },
    { new: true }
  );
  return results;

  // const record = db.get("contacts").find({ id }).assign(body).value();
  // db.write();
  // return record.id ? record : null;
};

const updateStatusContact = async (id, body) => {
  const results = await Contact.findByIdAndUpdate(
    id,
    { ...body },
    { new: true }
  );
  return results;

  // const record = db.get("contacts").find({ id }).assign(body).value();
  // db.write();
  // return record.id ? record : null;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
