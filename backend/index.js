const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");



// Import routes
const authRoutes = require("./routes/auth");
const todoRoutes = require("./routes/todo");
const userRoutes = require("./routes/users");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect("mongodb+srv://aa:bb@cluster0.8r4n1n7.mongodb.net/todoApp?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.use("/api/auth", authRoutes);     // Login / Signup
app.use("/api/todos", todoRoutes);    // Protected Todo routes
app.use("/api/users", userRoutes);    // (Optional) Manage users

// Default route
app.get("/", (req, res) => {
  res.send("🚀 Todo App API is running");
});

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
