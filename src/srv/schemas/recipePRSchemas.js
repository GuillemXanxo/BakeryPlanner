const { Joi } = require("express-validation");

const newRecipePR = {
  body: Joi.object({
    name: Joi.string().required(),
    ingredients: Joi.array().items(
      Joi.object({
        name: Joi.string().required(),
        quantity: Joi.number().required(),
      })
    ),
  }),
};

module.exports = { newRecipePR };
