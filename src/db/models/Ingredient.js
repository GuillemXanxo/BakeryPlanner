const { Schema, model } = require("mongoose");

const IngredientSchema = new Schema({
  name: {
    type: String,
    required: true,
    min: 1,
    max: 200,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const Ingredient = model("Ingredient", IngredientSchema, "ingredients");

module.exports = Ingredient;
