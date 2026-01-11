const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const authRouter = require("./routes/auth.route");
const userRouter = require("./routes/user.route");
const taskRouter = require("./routes/task.route");
dotenv.config();

const app = express();

// Middleware
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL, // Your frontend URL
    credentials: true, // Allow credentials (cookies, authorization headers)
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// MongoDB connection
connectDB();

// Routes
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/tasks", taskRouter);

// Basic Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
