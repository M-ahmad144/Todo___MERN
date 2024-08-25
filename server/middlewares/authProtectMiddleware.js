const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const ErrorHandler = require("../utils/errorHandler");

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
    console.log(token);
  }

  if (!token) {
    return next(
      new ErrorHandler(
        "You are not logged in. Please log in to get access.",
        401
      )
    );
  }

  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decode.id);
  if (!currentUser) {
    return next(
      new ErrorHandler(
        "The user belonging to this token no longer exists.",
        401
      )
    );
  }

  req.user = currentUser;

  next();
});

exports.isLoggedIn = catchAsync(async (req, res, next) => {
  // Check if a JWT is present in cookies
  if (req.cookies.jwt) {
    try {
      // Verify the token
      const decode = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      console.log(decode);

      // Fetch the current user
      const currentUser = await User.findById(decode.id);

      // If the user does not exist, skip to next middleware
      if (!currentUser) {
        return next();
      }

      // Set the user in the request object
      req.user = currentUser;
    } catch (error) {
      console.error("Error in isLoggedIn middleware:", error);
    }
  }

  // Proceed to the next middleware or route handler
  next();
});
