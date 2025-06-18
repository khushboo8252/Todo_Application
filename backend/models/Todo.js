const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  title: String,
  description: String,
  tags: [String],
  priority: { type: String, enum: ["High", "Medium", "Low"] },
  notes: [String],
  mentionedUsers: [String],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
}, { timestamps: true });

module.exports = mongoose.model("Todo", TodoSchema);
