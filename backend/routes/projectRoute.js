const router = require("express").Router();
const projectController = require("../controllers/projectController");
const authController = require("../controllers/authController");

router
  .route("/")
  .get(authController.protect, projectController.getAllProjects)
  .post(authController.protect, projectController.createProject);

module.exports = router;
