const ResponseDto = require("../utils/ResponseDto");
const asyncHandler = require("../utils/createAsync");
const AppError = require("../utils/AppError");
const Project = require("../models/projectModel");

exports.createProject = asyncHandler(async (req, res) => {
  if (!req.user) {
    return next(new AppError("User not logged in.", 401, 0));
  }

  const projectData = { ...req.body, author: req.user._id };

  // Create a new project
  const newProject = await Project.create(projectData);

  res
    .status(201)
    .json(new ResponseDto("Project created successfully.", 1, newProject));
});

exports.getAllProjects = asyncHandler(async (req, res) => {
  if (!req.user) {
    return next(new AppError("User not logged in.", 401, 0));
  }
  const projects = await Project.find({ author: req.user._id }).select(
    "-__v -author"
  );

  res
    .status(200)
    .json(new ResponseDto("Projects fetched successfully.", 1, projects));
});
