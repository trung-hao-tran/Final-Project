const mongoose = require('mongoose')

const Schema = mongoose.Schema

const taskSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  categories: {
    type: [String],
    required: false
  },
  location: {
    type: String,
    required: false
  },
  time: {
    start: {
      type: Date,
      required: true
    },
    end: {
      type: Date,
      required: true
    }
  },
  images: {
    type: [String],
    required: false
  },
  frequency: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  user_id: {
    type: String,
    required: true
  },
  tasker_id: {
    type: String,
    default: "None"
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  },
  milestones:[
    {
      title: String,
      description: String,
      date: {
        type: Date,
        default: Date.now
      },
      completed: {
        type: Boolean,
        default: false
      },
      priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Medium'
      }
    }
  ]
}, { timestamps: true })

module.exports = mongoose.model('Task', taskSchema)