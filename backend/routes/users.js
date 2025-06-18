const express = require("express");
const router = express.Router();
const User = require("../models/Users");

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to load users" });
  }
});

module.exports = router;
