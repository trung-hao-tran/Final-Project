const express = require('express')

const {
  createTask,
  getTasks,
  getTask,
  deleteTask,
  updateTask,
  filterTasks
} = require('../controllers/taskComtroller')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

//rquire auth for all task routes
router.use(requireAuth)

// GET all tasks
router.get('/', getTasks)

//GET a single task
router.get('/:id', getTask)

// POST a new task
router.post('/', createTask)

// DELETE a task
router.delete('/:id', deleteTask)

// UPDATE a task
router.patch('/:id', updateTask)

// filter tasks
router.post('/filter-tasks', filterTasks)


module.exports = router