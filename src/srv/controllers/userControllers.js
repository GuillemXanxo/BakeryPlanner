const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const encrypt = require("../../utils/encrypt");
const User = require("../../db/models/User");

const userLogin = async (req, res, next) => {
  const { name, password } = req.body;
  const fetchedUser = await User.findOne({ name });
  if (!fetchedUser) {
    const error = new Error("Some of your data is invalid");
    error.status = 401;
    return next(error);
  }
  const isRightPassword = await bcrypt.compare(password, fetchedUser.password);
  if (!isRightPassword) {
    const errorWrongPwd = new Error("Some of your data is invalid");
    errorWrongPwd.status = 401;
    return next(errorWrongPwd);
  }
  const userData = {
    name: fetchedUser.name,
    id: fetchedUser.id,
  };
  const token = jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: "7d" });
  return res.json({ token });
};

const userRegister = async (req, res, next) => {
  const { name, email, password } = req.body;
  const fetchedUser = await User.findOne({ name });
  if (!name || !password || !email || fetchedUser) {
    const errorWPW = new Error(`Something went wrong while registering`);
    errorWPW.status = 400;
    return next(errorWPW);
  }
  const encryptedPasword = await encrypt(password);
  const createdAt = new Date().getUTCDate();
  await User.create({
    name,
    email,
    password: encryptedPasword,
    createdAt,
    recipes: [],
  });
  return res.status(201).json({ message: `User ${name} register completed` });
};

module.exports = { userLogin, userRegister };
