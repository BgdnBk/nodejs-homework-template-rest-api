const Contacts = require("../model/index");
const { HttpCode } = require("../helper/constants");
const getAll = async (req, res, next) => {
  try {
    const userId = req.user?.id;

    const allContacts = await Contacts.listContacts(userId, req.query);
    return res.json({
      status: "success",
      code: 200,
      data: {
        allContacts,
      },
    });
  } catch (e) {
    next(e);
  }
};

const getById = async (req, res, next) => {
  try {
    const userId = req.user?.id;

    const contact = await Contacts.getContactById(userId, req.params.id);
    if (contact) {
      return res.json({
        status: "success",
        code: 200,
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        data: "Not Found",
      });
    }
  } catch (e) {
    next(e);
  }
};

const addContact = async (req, res, next) => {
  try {
    const userId = req.user?.id;

    const contact = await Contacts.addContact(userId, req.body);

    return res.status(201).json({
      status: "success",
      code: 201,
      data: {
        contact,
      },
    });
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(HttpCode.BAD_REQUEST).json({
        status: "error",
        code: HttpCode.BAD_REQUEST,
        message: "Bad request",
      });
    }
    const userId = req.user?.id;

    const contact = await Contacts.updateContact(
      userId,
      req.params.id,
      req.body
    );
    if (contact) {
      return res.json({
        status: "success",
        code: HttpCode.OK,
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: HttpCode.NOT_FOUND,
        data: "Not Found!",
      });
    }
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const userId = req.user?.id;

    const contact = await Contacts.removeContact(userId, req.params.id);
    if (contact) {
      return res.json({
        status: "success",
        code: 200,
        message: "Contact Delete",
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        data: "Not Found",
      });
    }
  } catch (e) {
    next(e);
  }
};

const updateFavorite = async (req, res, next) => {
  try {
    const userId = req.user?.id;

    if (req.body) {
      const contact = await Contacts.updateStatusContact(
        userId,
        req.params.id,
        req.body
      );
      if (contact) {
        return res.json({
          status: "success",
          code: 200,
          message: "Contact updated",
          data: {
            contact,
          },
        });
      } else {
        return res.status(404).json({
          status: "error",
          code: 404,
          data: "Not found",
        });
      }
    } else {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "missing field favorite",
      });
    }
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAll,
  getById,
  addContact,
  update,
  remove,
  updateFavorite,
};
