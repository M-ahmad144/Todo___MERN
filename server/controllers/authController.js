const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const { sendCookie } = require("../utils/sendCookie");
const ErrorHandler = require("../utils/errorHandler");

exports.signupUser = catchAsync(async (req, res, next) => {
  const { name, email, password, passwordConfirm } = req.body;
  const user = await User.create({ name, email, password, passwordConfirm });

  sendCookie(user, 201, res);
});

exports.loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please provide email and password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.comparePassword(password, user.password))) {
    return next(new ErrorHandler("Incorrect email or password", 401));
  }
  sendCookie(user, 200, res);
});
