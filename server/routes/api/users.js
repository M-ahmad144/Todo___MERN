const express = require("express");
const { getMe, updateMe } = require("../../controllers/userController");
const { protect } = require("../../middlewares/authProtectMiddleware");

const router = express.Router();

router.use(protect);
router.get("/me", getMe);
router.patch("/updateMe", updateMe);

module.exports = router;
