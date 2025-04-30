const router = require("express").Router();
const taskController = require("../controllers/taskController");

const authController = require("../controllers/authController");

router.get("/:projectId", authController.protect, taskController.getTask);
router.post("/", authController.protect, taskController.createTask);

router
  .route("/:taskId")
  .patch(authController.protect, taskController.updateTask)
  .delete(authController.protect, taskController.deleteTask);

module.exports = router;
