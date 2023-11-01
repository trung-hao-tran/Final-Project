const express = require('express')

const {
  createTask,
  getTasks,
  getTask,
  deleteTask,
  updateTask,
  getTaskers,
  assignTasker,
  filterTasks,
  addMilestoneToTask,
  markMilestoneAsCompleted,
  deleteMilestoneFromTask
} = require('../controllers/taskController')

//const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all task routes
// router.use(requireAuth)

// GET all tasks
router.get('/', getTasks)

// GET a single task
router.get('/:id', getTask)

// POST a new task
router.post('/', createTask)

// DELETE a task
router.delete('/:id', deleteTask)

// UPDATE a task
router.patch('/:id', updateTask)

// GET all taskers bidding on a given task
router.get('/taskers/:id', getTaskers)

// assign a tasker to complete a task
router.post('/taskers/:taskId/:taskerId', assignTasker)
// filter tasks
router.post('/filter-tasks', filterTasks)

// Add milestones to tasks
router.post('/:id/milestones', addMilestoneToTask);

// Mark milestone as complete
router.patch('/:taskId/milestones/:milestoneId/complete', markMilestoneAsCompleted);

// DELETE a milestone from a task
router.delete('/:taskId/milestones/:milestoneId', deleteMilestoneFromTask);

module.exports = router