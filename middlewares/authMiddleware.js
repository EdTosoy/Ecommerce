const User = require("../models/userModels");
const expressAsyncHandler = require("express-async-handler");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
      }
    } catch (error) {
      throw new Error("Not Authorized token expirex, Please login again");
    }
  } else {
    throw new Error("There is no token found in headers");
  }
});

module.exports = authMiddleware;
