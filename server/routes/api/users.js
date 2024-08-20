const express = require("express");
const User = require("../../models/userModel");

const { signupUser } = require("../../controllers/api/users");

const router = express.Router();

//signup
//login
//logout
//user Details

router.post("/signup", signupUser);

module.exports = router;
