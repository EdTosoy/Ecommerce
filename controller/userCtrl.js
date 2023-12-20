const { generateToken } = require("../config/jwtToken");
const User = require("../models/userModels");
const asyncHandler = require("express-async-handler");

const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email });

  if (!findUser) {
    // create a new user
    const NewUser = await User.create(req.body);
    res.json(NewUser);
  } else {
    throw new Error("User already exists");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // check if user exists
  const findUser = await User.findOne({ email });
  const isPasswordMatch = await findUser.isPasswordMatch(password);
  if (findUser && isPasswordMatch) {
    const { _id, firstname, lastname, email, mobile } = findUser;
    res.json({
      _id,
      firstname,
      lastname,
      email,
      mobile,
      token: generateToken(findUser._id),
    });
  } else {
    throw new Error("Invalid credentials");
  }
});

module.exports = { createUser, loginUser };
