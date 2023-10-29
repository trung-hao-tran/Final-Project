const express = require('express')

const {
  createTask,
  getTasks,
  getTask,
  deleteTask,
  updateTask,
  getTaskers,
  assignTasker
} = require('../controllers/taskComtroller')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all task routes
router.use(requireAuth)

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

module.exports = router