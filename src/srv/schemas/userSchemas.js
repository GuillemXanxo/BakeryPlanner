const { Joi } = require("express-validation");

const registerValidation = {
  body: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const loginValidation = {
  body: Joi.object({
    name: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

module.exports = { registerValidation, loginValidation };
