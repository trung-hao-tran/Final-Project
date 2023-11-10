const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bidSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
    bid: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    task_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bid", bidSchema);
