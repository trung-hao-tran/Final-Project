const express = require("express");
const checkAdmin = require("../middleware/checkAdmin");
const {
  createTask,
  getTasksByUserId,
  getTasks,
  getTask,
  deleteTask,
  adminDeleteTask,
  updateTask,
  getTaskers,
  assignTasker,
  filterTasks,
  addMilestoneToTask,
  updateMilestoneStatus,
  getMilestonesForTask,
} = require("../controllers/taskController");

const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// require auth for all task routes
// router.use(requireAuth)

// GET all tasks
router.get("/", getTasks);

// GET all tasks
router.get("/all/:id", getTasksByUserId);

// GET a single task
router.get("/:id", getTask);

// POST a new task
router.post("/", requireAuth, createTask);

// DELETE a task
router.delete("/:id", requireAuth, deleteTask);

router.delete("admin/:id", checkAdmin, adminDeleteTask);

// UPDATE a task
router.patch("/:id", requireAuth, updateTask);

// GET all taskers bidding on a given task
router.get("/taskers/:id", getTaskers);

// assign a tasker to complete a task
router.post("/taskers/:taskId/:taskerId", requireAuth, assignTasker);

// filter tasks
router.post("/filter-tasks", filterTasks);

// Add milestones to tasks
router.post("/:id/milestones", addMilestoneToTask);

// Update the Status of a Milestone
router.put("/:taskId/milestones/:milestoneId", updateMilestoneStatus);

// Get a List of Milestones for Task
router.get("/:taskId/milestones", getMilestonesForTask);

module.exports = router;
