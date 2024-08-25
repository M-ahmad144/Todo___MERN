exports.sendCookie = (user, statusCode, res) => {
  // Generate the JWT token
  const token = user.generateToken();

  // Cookie options
  const cookieOptions = {
    expires: new Date(
      Date.now() +
        parseInt(process.env.JWT_COOKIE_EXPIRES_IN, 10) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true, // Prevents JavaScript access
  };

  // Secure cookie option for production
  if (process.env.NODE_ENV === "production") {
    cookieOptions.secure = true;
  }

  // Set the JWT token as a cookie in the response
  res.cookie("jwt", token, cookieOptions);

  // Prevent password from being sent in the response
  user.password = undefined;

  // Send the response back to the client with the token
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};
