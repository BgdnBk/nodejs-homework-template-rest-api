const Joi = require("joi");
const mongoose = require("mongoose");

const schemaCreateContacts = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "gmail"] } })
    .required(),
  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),
  favorite: Joi.boolean().optional(),
});

const schemaUpdateContacts = Joi.object({
  name: Joi.string().min(3).max(30).optional(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "gmail"] } })
    .optional(),
  phone: Joi.string()
    .length(14)
    .pattern(/^[0-9]+$/)
    .optional(),
  favorite: Joi.boolean().optional(),
}).or("name", "email", "phone", "favorite");

// const schemaValidateAuth = Joi.object({
//   email: Joi.string().email().required(),
//   password: Joi.string().min(7).required(),
// });

const schemaQueryContacts = Joi.object({
  sortBy: Joi.string().valid("email", "name", "id").optional(),
  sortByDesc: Joi.string().valid("email", "name", "id").optional(),
  filter: Joi.string().optional(),
  limit: Joi.number().integer().min(1).max(40).optional(),
  offset: Joi.number().integer().min(0).optional(),
  favorite: Joi.boolean().optional(),
}).without("sortBy", "sortByDesc");

const validate = async (schema, obj, next) => {
  try {
    await schema.validateAsync(obj);
    return next();
  } catch (err) {
    next({ status: 400, message: err.message.replace(/"/g, "'") });
  }
};

module.exports = {
  validCreateContact: async (req, res, next) => {
    return await validate(schemaCreateContacts, req.body, next);
  },
  validUpdateContact: async (req, res, next) => {
    return await validate(schemaUpdateContacts, req.body, next);
  },
  validObjectId: async (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return next({ status: 400, message: `Invalid Object ID` });
    }
    next();
  },
  validQueryContact: async (req, res, next) => {
    return await validate(schemaQueryContacts, req.query, next);
  },

  // validAuth: async (req, res, next) => {
  //   return await validate(schemaValidateAuth, req.body, next);
  // },
};
