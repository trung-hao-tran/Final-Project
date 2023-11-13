const Task = require('../models/taskModel')
const Bid = require('../models/bidModel')
const mongoose = require('mongoose');

const getBid = async (req, res) => {
    const {id, sort} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such task' })
      }
      const bids = await Bid.find({ task_id: id }).sort(sort)
    
      if (!bids) {
        return res.status(404).json({ error: 'No bid yet!' })
      }
      res.status(200).json(bids)

}


const createBid = async (req, res) => {
    try {
        // Check if the task exists
        const task = await Task.findById(req.body.task_id);
        if (!task) {
            return res.status(404).json({ message: 'Task dose not exist.' });
        }

        // Create a new bid
        const newBid = await Bid.create({
            description: req.body.description,
            user_id: req.user.id,  // get the user id
            task_id: req.body.task_id
        });

        res.status(201).json({
            status: 'success',
            data: {
                bid: newBid
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};

module.exports = {
    getBid,
    createBid,
}