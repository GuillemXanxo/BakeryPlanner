const { Schema, model } = require("mongoose");

const RecipePRSchema = new Schema({
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
    ref: "RecipeGR",
    required: true,
  },
  ingredients: [
    {
      type: Schema.Types.ObjectId,
      ref: "Ingredient",
    },
  ],
});

const RecipePR = model("RecipePR", RecipePRSchema, "recipesPR");

module.exports = RecipePR;
