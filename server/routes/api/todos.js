const express = require("express");
const {
  getAllTodos,
  addTodo,
  getInCompleteTodo,
  getCompletedTodos,
  updateTodo,
  getTodo,
  deleteTodo,
  toggleTodoCompletion,
} = require("../../controllers/todoController");
const { protect } = require("../../middlewares/authProtectMiddleware");

const router = express.Router();

// Protect all routes that follow this middleware
router.use(protect);

router.get("/all", getAllTodos);

// Route to get all todos
router.get("/incomplete", getInCompleteTodo);

// Route to add a new todo
router.post("/add", addTodo);

// Route to get completed todos
router.get("/completed", getCompletedTodos);
// Route to get a specific todo by ID
router.get("/todo/:id", getTodo);

// Route to update a specific todo by ID
router.patch("/update/:id", updateTodo);

// Route to toggle the completion status of a specific todo by ID
router.patch("/:id/toggle", toggleTodoCompletion);

// Route to delete a specific todo by ID
router.delete("/delete/:id", deleteTodo);

module.exports = router;
