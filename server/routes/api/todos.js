const express = require("express");
const { addTodo } = require("../../controllers/todoController");
const { protect } = require("../../middlewares/authProtectMiddleware");

const router = express.Router();

router.use(protect);
router.post("/add", addTodo);

module.exports = router;
