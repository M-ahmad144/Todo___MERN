const catchAsync = require("../utils/catchAsync");
const Todo = require("../models/todoModel");
const Tag = require("../models/TagModel");

exports.addTodo = catchAsync(async (req, res, next) => {
  const { title, description, dueDate, priority, tag, status, completed } =
    req.body;

  let existingTag;

  // If a tag is provided, check if it exists
  if (tag) {
    existingTag = await Tag.findOne({ name: tag.trim() });

    // If the tag does not exist, create a new one
    if (!existingTag) {
      existingTag = await Tag.create({ name: tag.trim() });
    }
  }

  const todo = await Todo.create({
    title,
    description,
    dueDate,
    priority,
    tag: existingTag._id,
    status,
    completed,
    user: req.user._id,
  });
  res.status(201).json({
    status: "success",
    data: {
      todo,
    },
  });
});
