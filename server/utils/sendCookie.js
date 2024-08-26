exports.sendCookie = (user, statusCode, res) => {
  const token = user.generateToken();

  // Set cookie options
  const cookieOptions = {
    expires: new Date(
      Date.now() +
        parseInt(process.env.JWT_COOKIE_EXPIRES_IN, 10) * 24 * 60 * 60 * 1000 // Cookie expiration
    ),
    httpOnly: true, // Prevents JavaScript access
  };

  if (process.env.NODE_ENV === "production") {
    cookieOptions.secure = true; // Ensures cookie is sent over HTTPS only
    cookieOptions.sameSite = "none"; // Required for cross-site cookies with secure
  } else {
    cookieOptions.sameSite = "lax"; // Default for development
    cookieOptions.secure = false; // Allow cookies over HTTP in development
  }

  res.cookie("jwt", token, cookieOptions);

  // Hide the password from the response
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};
