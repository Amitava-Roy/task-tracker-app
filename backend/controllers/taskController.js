const Task = require("../models/taskModel");
const ResponseDto = require("../utils/ResponseDto");
const asyncHandler = require("../utils/createAsync");
const AppError = require("../utils/AppError");

//create a task
exports.createTask = asyncHandler(async (req, res, next) => {
  // Create a new task
  const newTask = await Task.create(req.body);

  res
    .status(201)
    .json(new ResponseDto("Task created successfully.", 1, newTask));
});

exports.getTask = asyncHandler(async (req, res, next) => {
  const { projectId } = req.params;

  // Find the task by ID
  const task = await Task.find({ projectId }).select("-__v");
  if (!task) {
    return next(new AppError("Task not found.", 404, 0));
  }
  res.status(200).json(new ResponseDto("Task fetched successfully.", 1, task));
});

exports.updateTask = asyncHandler(async (req, res, next) => {
  const { taskId } = req.params;

  // Find the task by ID and update it
  const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedTask) {
    return next(new AppError("Task not found.", 404, 0));
  }

  res
    .status(200)
    .json(new ResponseDto("Task updated successfully.", 1, updatedTask));
});

exports.deleteTask = asyncHandler(async (req, res, next) => {
  const { taskId } = req.params;

  // Find the task by ID and delete it
  const deletedTask = await Task.findByIdAndDelete(taskId);

  if (!deletedTask) {
    return next(new AppError("Task not found.", 404, 0));
  }

  res.status(204).json(new ResponseDto("Task deleted successfully.", 1, null));
});
