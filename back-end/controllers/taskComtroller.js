const Task = require('../models/taskModel')
const User = require('../models/userModel')
const mongoose = require('mongoose')

// get all tasks
const getTasks = async (req, res) => {
    const tasks = await Task.find({}).sort({createdAt: -1})
    res.status(200).json(tasks)
}

// get a single task
const getTask = async (req, res) => {
  const user_id = req.user._id
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such task'})
  }

  const task = await Task.findById(id)

  if (!task) {
    return res.status(404).json({error: 'No such task'})
  }
  res.status(200).json(task)
}


// create new task
const createTask = async (req, res) => {
  if (req.user !== null) {
  const user_id = req.user._id
}
  else{
    res.status(400).json("the user does not exist")
  }
  const user_id = req.user._id
    const {
        title,
        description,
        categories,
        location,
        time,
        images,
        frequency,
        price
        } = req.body

    let emptyFields = []

  if(!title) {
    emptyFields.push('title')
  }
  if(!description) {
    emptyFields.push('description')
  }
  if(!time) {
    emptyFields.push('time')
  }
  if(!frequency) {
    emptyFields.push('frequency')
  }
  if(!price) {
    emptyFields.push('price')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  to_create = {};
  to_create.title = title
  to_create.description = description
  to_create.time = time
  to_create.frequency = frequency
  to_create.price = price
  to_create.user_id = user_id.toString()
  if(categories) {
    to_create.categories = categories
  }
  if(location) {
    to_create.location = location
  }
  if(images) {
    to_create.images = images
  }

  // add doc to db
  try {
    console.log(to_create)
    const task = await Task.create(to_create)
    res.status(200).json(task)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// delete a task
const deleteTask = async (req, res) => {
  const user_id = req.user._id
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such task'})
  }

  const task = await Task.findById(id)

  if (!task) {
    return res.status(400).json({error: 'No such task'})
  }

  if (user_id.toString() !== task.user_id && user_id.toString() !==process.env.ADMINID) {
    return res.status(401).json({error: 'No authority'})
  }
  const taskReturn = await Task.findOneAndDelete({_id: id})

  res.status(200).json(taskReturn)
}

// update a task
const updateTask = async (req, res) => {
  const user_id = req.user._id
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such task'})
  }

  const task = await Task.findById(id)

  if (!task) {
    return res.status(400).json({error: 'No such task'})
  }

  //console.log(task.user_id.toString(), "admin", process.env.ADMINID)
  if (user_id.toString() !== task.user_id && task.user_id.toString() !== process.env.ADMINID) {
    return res.status(401).json({error: 'No authority'})
  }
  const taskReturn = await Task.findOneAndUpdate({_id: id}, {
    ...req.body
  }, {new: true})

  res.status(200).json(taskReturn)
}


// filter tasks
const filterTasks = async (req, res) => {
  try {
    const { title, categories, location, time, frequency, price } = req.body
    const query = {};

    if (title && title.length > 0) {
      query.title = new RegExp(title, 'i');
    }

    if (categories && categories.length > 0) {
      query.categories = {
        $in: categories.map(category => new RegExp(category, 'i'))
      };
    }

    if (location && location.length > 0) {
      query.location = new RegExp(location, 'i');
    }

    // filter by two time points
    if (time && time.length === 2) {
      query.time = {
        $gte: new Date(time[0]),
        $lte: new Date(time[1])
      };
    }

    // filter by frequency range
    if (frequency && frequency.length === 2) {
      query.frequency = {
        $gte: frequency[0],
        $lte: frequency[1]
      };
    }

    // filter by price range
    if (price && price.length === 2) {
      query.price = {
        $gte: price[0],
        $lte: price[1]
      };
    }

    const tasks = await Task.find(query);
    res.status(200).json(tasks);
  
  } catch (error) {
    res.status(400).json({error: 'server error'})
  }
}


module.exports = {
  getTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask,
  filterTasks
}