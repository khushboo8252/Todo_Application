// routes/todo.js
const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");
const auth = require("../middleware/auth");

// ✅ Create a Todo (protected)
router.post("/", auth, async (req, res) => {
  try {
    const todo = new Todo({ ...req.body, userId: req.user.id });
    await todo.save();
    res.json(todo);
  } catch (err) {
    console.error("Error saving todo:", err);
    res.status(500).json({ error: "Failed to save todo" });
  }
});

// ✅ Get all Todos for logged-in user
router.get("/", auth, async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.id });
    res.json(todos);
  } catch (err) {
    console.error("Error fetching todos:", err);
    res.status(500).json({ error: "Failed to fetch todos" });
  }
});

// ✅ Get a single Todo by ID
router.get("/:id", auth, async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo || todo.userId.toString() !== req.user.id)
      return res.status(403).json({ message: "Access denied" });
    res.json(todo);
  } catch (err) {
    console.error("Error fetching todo:", err);
    res.status(500).json({ error: "Failed to fetch todo" });
  }
});

// ✅ Update a Todo
router.put("/:id", auth, async (req, res) => {
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!todo) return res.status(404).json({ error: "Todo not found" });
    res.json(todo);
  } catch (err) {
    console.error("Error updating todo:", err);
    res.status(500).json({ error: "Failed to update todo" });
  }
});

// ✅ Delete a Todo
router.delete("/:id", auth, async (req, res) => {
  try {
    const result = await Todo.deleteOne({ _id: req.params.id, userId: req.user.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.json({ success: true });
  } catch (err) {
    console.error("Error deleting todo:", err);
    res.status(500).json({ error: "Failed to delete todo" });
  }
});

module.exports = router;
