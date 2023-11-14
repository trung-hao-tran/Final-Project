const Task = require("../models/taskModel");
const Bid = require("../models/bidModel");
const User = require("../models/userModel");
const mongoose = require("mongoose");

const getBid = async (req, res) => {
  const { id } = req.params;

  // Check if the task ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such task" });
  }

  try {
    // Find bids related to the task
    const bids = await Bid.find({ task_id: id }).sort();

    // Check if there are any bids
    if (!bids.length) {
      return res.status(404).json({ error: "No bid yet!" });
    }

    // Update user_id in each bid with the user object
    const updatedBids = await Promise.all(
      bids.map(async (bid) => {
        const bidObject = bid.toObject();
        const userData = await User.findById(bid.user_id);

        // If user data is found, replace user_id with the user object
        if (userData) {
          bidObject.user = {
            id: userData._id,
            name: userData.name,
            email: userData.email,
            image: userData.image,
          };
        }

        return bidObject;
      })
    );

    // Return the updated bids
    res.status(200).json(updatedBids);
  } catch (error) {
    // Handle potential errors
    res.status(500).json({ error: error.message });
  }
};

const createBid = async (req, res) => {
  try {
    // Check if the task exists
    const task = await Task.findById(req.body.task_id);
    if (!task) {
      return res.status(404).json({ message: "Task does not exist." });
    }

    // Create a new bid
    const newBid = await Bid.create({
      description: req.body.description,
      user_id: req.user.id, // get the user id
      task_id: req.body.task_id,
      price: req.body.price,
    });

    res.status(201).json({
      status: "success",
      data: {
        bid: newBid,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

module.exports = {
  getBid,
  createBid,
};
