const Task = require("../models/taskModel");
const User = require("../models/userModel");
const Bid = require("../models/bidModel");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

// get all tasks
const getTasks = async (req, res) => {
  // verify user is authenticated
  const { authorization } = req.headers;

  if (!authorization) {
    const tasks = await Task.find({}).sort({ createdAt: -1 });
    res.status(200).json(tasks);
    return;
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);

    req.user = await User.findOne({ _id }).select("_id");
    const tasks = await Task.find({ user_id: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

// get a single task
const getTask = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such task" });
  }

  const task = await Task.findById(id);

  if (!task) {
    return res.status(404).json({ error: "No such task" });
  }
  res.status(200).json(task);
};

// create new task
const createTask = async (req, res) => {
  if (req.user !== null) {
    const user_id = req.user._id;
  } else {
    res.status(400).json("the user does not exist");
  }
  const user_id = req.user._id;
  const {
    title,
    description,
    categories,
    address,
    time,
    images,
    frequency,
    price,
    priority,
    domain_knowledge,
  } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!description) {
    emptyFields.push("description");
  }
  if (!time.start || !time.end) {
    emptyFields.push("time");
  }
  if (!frequency) {
    emptyFields.push("frequency");
  }
  if (!price) {
    emptyFields.push("price");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  to_create = {};
  to_create.title = title;
  to_create.description = description;
  to_create.time = time;
  to_create.frequency = frequency;
  to_create.price = price;
  to_create.priority = priority;
  to_create.user_id = user_id.toString();
  to_create.domain_knowledge = domain_knowledge;
  if (categories) {
    to_create.categories = categories;
  }
  if (address) {
    to_create.address = address;
  }
  if (images) {
    to_create.images = images;
  }

  // add doc to db
  try {
    console.log(to_create);
    const task = await Task.create(to_create);
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a task
const deleteTask = async (req, res) => {
  const user_id = req.user._id;
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such task" });
  }

  const task = await Task.findById(id);

  if (!task) {
    return res.status(400).json({ error: "No such task" });
  }

  if (
    user_id.toString() !== task.user_id &&
    user_id.toString() !== process.env.ADMINID
  ) {
    return res.status(401).json({ error: "No authority" });
  }
  const taskReturn = await Task.findOneAndDelete({ _id: id });

  res.status(200).json(taskReturn);
};

// update a task
const updateTask = async (req, res) => {
  const user_id = req.user._id;
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such task" });
  }

  const task = await Task.findById(id);

  if (!task) {
    return res.status(400).json({ error: "No such task" });
  }

  //console.log(task.user_id.toString(), "admin", process.env.ADMINID)
  if (
    user_id.toString() !== task.user_id &&
    task.user_id.toString() !== process.env.ADMINID
  ) {
    return res.status(401).json({ error: "No authority" });
  }
  const taskReturn = await Task.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    },
    { new: true }
  );

  res.status(200).json(taskReturn);
};

// GET all taskers bidding on a given task
const getTaskers = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such task" });
  }
  const bids = await Bid.find({ task_id: id });

  if (!bids) {
    return res.status(404).json({ error: "No bid yet!" });
  }

  taskers = [];
  for (const bid of bids) {
    taskers = User.findById(bid.user_id);
    taskers.push(taskers);
  }

  res.status(200).json(taskers);
};

const assignTasker = async (req, res) => {
  const user_id = req.user._id;
  const taskId = req.params.taskId;
  const taskerId = req.params.taskerId;

  // check task exist
  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    return res.status(404).json({ error: "No such task" });
  }

  const task = await Task.findById(taskId);

  if (!task) {
    return res.status(400).json({ error: "No such task" });
  }

  if (task.user_id !== user_id) {
    return res
      .status(400)
      .json({ error: "can not assign tasks not belonging to you!" });
  }

  // check if the tasker bids on the task
  if (!mongoose.Types.ObjectId.isValid(taskerId)) {
    return res.status(404).json({ error: "No such tasker" });
  }

  const tasker = await Task.findById(taskerId);

  if (!tasker) {
    return res.status(400).json({ error: "No such tasker" });
  }

  const bid = await Bid.findOne({ task_id: taskId, user_id: taskerId });

  if (!bid) {
    return res
      .status(400)
      .json({ error: "the tasker have no bid on the task" });
  }

  // assign tasker to the task
  const taskReturn = await Task.findOneAndUpdate(
    { _id: taskId },
    { taskerId: taskerId },
    { new: true }
  );
  res.status(200).json(taskReturn);
};

// filter tasks
const filterTasks = async (req, res) => {
  try {
    const { title, categories, address, time, frequency, price } = req.body;
    const query = {};

    if (title && title.length > 0) {
      query.title = new RegExp(title, "i");
    }

    if (categories && categories.length > 0) {
      query.categories = {
        $in: categories.map((category) => new RegExp(category, "i")),
      };
    }

    if (address && address.length > 0) {
      query.address = new RegExp(address, "i");
    }

    // filter by two time points
    if (time && time.start && time.end) {
      query["time.start"] = {
        $gte: new Date(time.start),
        $lte: new Date(time.end),
      };
    }

    // filter by frequency range
    if (frequency && frequency.length === 2) {
      query.frequency = {
        $gte: frequency[0],
        $lte: frequency[1],
      };
    }

    // filter by price range
    if (price && price.length === 2) {
      query.price = {
        $gte: price[0],
        $lte: price[1],
      };
    }

    const tasks = await Task.find(query);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json({ error: "server error" });
  }
};

const addMilestoneToTask = async (req, res) => {
  console.log("triggered");
  const { id } = req.params; // Task id
  console.log("req.body", req.body);
  console.log(typeof req.body);
  console.log("check");
  if (!req.body) {
    return res.status(400).json({ error: "No data for milestones" });
  }

  try {
    const milestones = req.body;

    console.log("milestones", milestones);

    if (!Array.isArray(milestones)) {
      return res.status(400).json({ error: "Invalid data for milestones" });
    }

    const updatedTask = await Task.findOneAndUpdate(
      { _id: id },
      {
        milestones,
      },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task does not exist" });
    }

    res.status(200).json({ status: "success", data: updatedTask });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};

const updateMilestoneStatus = async (req, res) => {
  const { taskId, milestoneId } = req.params;
  const { status } = req.body;

  try {
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    const milestone = task.milestones.id(milestoneId);

    if (!milestone) {
      return res.status(404).json({ error: "Milestone not found" });
    }

    milestone.status = status;
    await task.save();

    res.status(200).json({
      message: "Milestone status updated successfully",
      milestone: {
        id: milestone._id,
        status: milestone.status,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const getMilestonesForTask = async (req, res) => {
  const { taskId } = req.params;

  try {
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    const milestones = task.milestones.map((milestone) => ({
      id: milestone._id,
      description: milestone.description,
      status: milestone.status,
    }));

    res.status(200).json({ milestones });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask,
  getTaskers,
  assignTasker,
  filterTasks,
  addMilestoneToTask,
  updateMilestoneStatus,
  getMilestonesForTask,
};
