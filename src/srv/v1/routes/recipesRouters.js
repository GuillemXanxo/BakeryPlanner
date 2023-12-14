const express = require("express");
const { validate } = require("express-validation");
const {
  getUserRecipesPR,
  createRecipePR,
} = require("../../controllers/recipeControllers");
const { newRecipePR } = require("../../schemas/recipePRSchemas");
const auth = require("../../middlewares/auth");

const router = express.Router();

router.post("/new-recipe-pr", validate(newRecipePR), auth, createRecipePR);

/**
 * @openapi
 * /user/recipes/get-my-recipes:
 *   post:
 *     tags:
 *       - Recipes
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                type: object
 *                example: {name:"Baguette", author:"ObjectId", createdAt:"2023-07-04T14:24:11.130+00:00", recipeGR: "ObjectId", ingredients:[{name: "flour", quantity:"1000"}]}
 */
router.post("/get-my-recipes", auth, getUserRecipesPR);

module.exports = router;
