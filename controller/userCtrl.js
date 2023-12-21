const { generateToken } = require("../config/jwtToken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModels");
const { validateMongoDbId } = require("../utils/validateMongodbid");

// Register A User
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

// Login A user
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

// Get All users
const getAllUser = asyncHandler(async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    throw new Error(error);
  }
});

// Get A Single User
const getAUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  const user = req.user;
  try {
    const user = await User.findById(id);
    res.json(user);
  } catch (error) {
    throw new Error(error);
  }
});

// Delete A Single User
const deleteAUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const user = await User.findByIdAndDelete(id);
    res.json(user);
  } catch (error) {
    throw new Error(error);
  }
});

// Update A user
const updateAUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const { firstname, lastname, email, mobile } = req.body;

    // check if user exists and update
    const updatedUser = await User.findOneAndUpdate(
      _id,
      {
        firstname,
        lastname,
        email,
        mobile,
      },
      {
        new: true,
      }
    );

    res.json(updatedUser);
  } catch (error) {
    throw new Error(error);
  }
});

// Block A user
const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const blockUser = await User.findByIdAndUpdate(
      { _id: id },
      {
        isBlocked: true,
      },
      {
        new: true,
      }
    );
    res.json({
      message: "User blocked successfully",
      blockUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// UnBlock A User
const unblockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const unBlockUser = await User.findByIdAndUpdate(
      { _id: id },
      {
        isBlocked: false,
      },
      {
        new: true,
      }
    );
    res.json({
      message: "User unblocked successfully",
      unBlockUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createUser,
  loginUser,
  getAllUser,
  getAUser,
  deleteAUser,
  updateAUser,
  blockUser,
  unblockUser,
};
