const { Schema, model } = require("mongoose");

const RecipeGRSchema = new Schema({
  name: {
    type: String,
    required: true,
    min: 1,
    max: 200,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  recipePR: {
    type: Schema.Types.ObjectId,
    ref: "RecipePR",
    required: true,
  },
  ingredients: [
    {
      type: Schema.Types.ObjectId,
      ref: "Ingredient",
    },
  ],
});

const RecipeGR = model("RecipeGR", RecipeGRSchema, "recipesGR");

module.exports = RecipeGR;
