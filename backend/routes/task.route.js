const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/task.controller");

const taskRouter = express.Router();

taskRouter.post("/", authMiddleware, createTask);
taskRouter.get("/", authMiddleware, getTasks);
taskRouter.put("/:id", authMiddleware, updateTask);
taskRouter.delete("/:id", authMiddleware, deleteTask);

module.exports = taskRouter;
