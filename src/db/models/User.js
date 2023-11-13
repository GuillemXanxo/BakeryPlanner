const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    min: 1,
    max: 200,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  recipes: [
    {
      type: Schema.Types.ObjectId,
      ref: "RecipePR",
    },
  ],
});

const User = model("User", UserSchema, "users");

module.exports = User;
