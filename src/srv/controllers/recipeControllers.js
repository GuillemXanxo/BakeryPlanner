const RecipeGR = require("../../db/models/RecipeGR");
const RecipePR = require("../../db/models/RecipePR");
const User = require("../../db/models/User");

const getUserRecipesPR = async (req, res, next) => {
  try {
    const userRecipesPR = await User.findById(req.userId).populate("recipesPR");
    res.json(userRecipesPR.recipesPR);
  } catch (error) {
    error.status = 400;
    error.message = "Unable to find user's recipes";
    next(error);
  }
};

const createRecipePR = async (req, res, next) => {
  try {
    //from front we only receive name and ingredients
    const toCreateRecipePR = req.body;
    const createdAt = new Date();
    toCreateRecipePR.createdAt = createdAt;
    toCreateRecipePR.author = req.userId;
    const createdRecipePR = await RecipePR.create(toCreateRecipePR);
    await User.findByIdAndUpdate(
      { _id: req.userId },
      { $push: { recipes: createdRecipePR.id } }
    );
    res.status(201).json(createdRecipePR);
  } catch (error) {
    const newError = new Error("Recipe invalid or with errors");
    newError.status = 400;
    next(newError);
  }
};
module.exports = {
  getUserRecipesPR,
  createRecipePR,
};
