const mongoose = require("mongoose");
const { trim } = require("validator");

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      min: [3, "Project name must be at least 3 characters."],
      max: [50, "Project name must be at most 50 characters."],
      trim: true,
      required: [true, "Project must have a name."],
      trim: true,
    },
    description: {
      type: String,
      min: [10, "Project description must be at least 10 characters."],
      max: [500, "Project description must be at most 500 characters."],
      trim: true,
      required: [true, "Project must have a description."],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Project must have an author."],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
