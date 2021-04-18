const Joi = require("joi");

const schemaCreateContacts = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "gmail"] } })
    .required(),
  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),
});

const schemaUpdateContacts = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).optional(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "gmail"] } })
    .optional(),
  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .optional(),
}).or("name", "email", "phone");

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
};
