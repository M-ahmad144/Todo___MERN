const express = require("express");
const {
  addTodo,
  getAllTodos,
  updateTodo,
  getTodo,
  deleteTodo,
  getCompletedTodos,
  toggleTodoCompletion,
} = require("../../controllers/todoController");
const { protect } = require("../../middlewares/authProtectMiddleware");

const router = express.Router();

router.use(protect);
router.post("/add", addTodo);
router.get("/getAllTodos", getAllTodos);
router.get("/getCompletedTodos", getCompletedTodos);
router.get("/getTodo/:id", getTodo);
router.patch("/update/:id", updateTodo);
router.patch("/toggleTodoCompletion/:id", toggleTodoCompletion);
router.delete("/delete/:id", deleteTodo);

module.exports = router;
