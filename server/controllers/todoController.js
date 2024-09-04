const catchAsync = require("../utils/catchAsync");
const Todo = require("../models/todoModel");
const Tag = require("../models/TagModel");
const errorHandler = require("../utils/errorHandler");
const QueryFeatures = require("../utils/QueryFeatures");

exports.getAllTodos = catchAsync(async (req, res, next) => {
  const todos = await Todo.find();
  res.status(200).json({
    status: "success",
    results: todos.length,
    data: {
      todos,
    },
  });
});

exports.getInCompleteTodo = catchAsync(async (req, res, next) => {
  // Initialize QueryFeatures with the base query and request query parameters
  const features = new QueryFeatures(
    Todo.find({ user: req.user._id, completed: false }),
    req.query
  )
    .filter()
    .sort()
    .limitedFields()
    .paginate()
    .filterTodosByStatus()
    .filterByPriority();
  await features.filterByTag();

  // Get the total number of todos that match the filters
  const totalTodos = await Todo.countDocuments({ user: req.user._id });

  // Execute the query to get the todos for the current page
  const todos = await features.query.populate("tag"); // Populate tags if needed

  // Calculate total pages
  const limit = parseInt(req.query.limit, 10) || 10;
  const totalPages = Math.ceil(totalTodos / limit);

  res.status(200).json({
    status: "success",
    results: todos.length,
    totalPages: totalPages, // Include totalPages in the response
    data: {
      todos,
    },
  });
});

exports.toggleTodoCompletion = catchAsync(async (req, res, next) => {
  // Find the todo by ID
  const todo = await Todo.findById(req.params.id);

  // Check if the todo exists
  if (!todo) {
    return next(new errorHandler("Todo not found", 404));
  }

  // Toggle the completed status
  todo.completed = !todo.completed;
  // Save the updated todo

  //disable validation before save
  todo.save({ validateBeforeSave: false });

  // Respond with the updated status
  res.status(200).json({
    status: "success",
    data: {
      completed: todo.completed,
    },
  });
});

exports.getCompletedTodos = catchAsync(async (req, res, next) => {
  const features = new QueryFeatures(
    Todo.find({ user: req.user._id, completed: true }),
    req.query
  )
    .filter()
    .sort()
    .limitedFields()
    .paginate()
    .filterTodosByStatus()
    .filterByPriority();
  await features.filterByTag();

  // Ensure the query is properly executed
  const todos = await features.query.populate("tag");

  res.status(200).json({
    status: "success",
    results: todos.length,
    data: {
      todos,
    },
  });
});

exports.getTodo = catchAsync(async (req, res, next) => {
  const todo = await Todo.findById(req.params.id).populate("tag");
  res.status(200).json({
    status: "success",
    data: {
      todo,
    },
  });
});

exports.addTodo = catchAsync(async (req, res, next) => {
  const { title, dueDate, priority, tag } = req.body;

  let tagId = null;

  // If a tag is provided, check if it exists
  if (tag) {
    const existingTag = await Tag.findOne({ name: tag.trim() });

    // If the tag does not exist, create a new one
    if (!existingTag) {
      const newTag = await Tag.create({ name: tag.trim() });
      tagId = newTag._id;
    } else {
      tagId = existingTag._id;
    }
  }

  const todo = await Todo.create({
    title,
    dueDate,
    priority,
    tag: tagId,
    user: req.user._id,
  });

  res.status(201).json({
    status: "success",
    data: {
      todo,
    },
  });
});

exports.updateTodo = catchAsync(async (req, res, next) => {
  const { title, dueDate, priority, tag, status, completed } = req.body;

  // Find the todo by ID
  const todo = await Todo.findById(req.params.id);

  // Check if the todo exists
  if (!todo) {
    return next(new errorHandler("Todo not found", 404));
  }

  // If a tag is provided, handle it
  let updatedTagId = todo.tag; // Default to the existing tag ID

  if (tag) {
    let existingTag = await Tag.findOne({ name: tag.trim() });

    if (!existingTag) {
      // Create new tag if it does not exist
      existingTag = await Tag.create({ name: tag.trim() });
    }

    updatedTagId = existingTag._id;
  }

  // Update the todo
  const updatedTodo = await Todo.findByIdAndUpdate(
    req.params.id,
    {
      title: title || todo.title,
      dueDate: dueDate || todo.dueDate,
      priority: priority || todo.priority,
      tag: updatedTagId,
      status: status || todo.status,
      completed: completed !== undefined ? completed : todo.completed, // Handle boolean explicitly
    },
    {
      new: true, // Return the updated document
      runValidators: true, // Run schema validation
    }
  );

  // Respond with the updated todo
  res.status(200).json({
    status: "success",
    data: {
      todo: updatedTodo,
    },
  });
});

exports.deleteTodo = catchAsync(async (req, res, next) => {
  //(req.params.id present in database) {
  if (await Todo.findById(req.params.id)) {
    res.status(200).json({
      status: "success",
      message: "Todo deleted successfully",
    });
  }

  errorHandler("Todo not found", 404);
});
