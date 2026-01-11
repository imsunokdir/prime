const Task = require("../models/task.model");

// Create new task
const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const task = await Task.create({
      user: req.user._id,
      title,
      description,
    });
    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all tasks for user
// const getTasks = async (req, res) => {
//   try {
//     const tasks = await Task.find({ user: req.user._id });
//     res.json(tasks);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

const getTasks = async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    // Base query
    const query = { user: req.user._id };

    // If pagination params are NOT provided → return all tasks
    if (!page || !limit) {
      const tasks = await Task.find(query).sort({ createdAt: -1 });
      return res.json({
        tasks,
        total: tasks.length,
        paginated: false,
      });
    }

    // Pagination logic
    const skip = (page - 1) * limit;

    const [tasks, total] = await Promise.all([
      Task.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Task.countDocuments(query),
    ]);

    res.json({
      tasks,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      paginated: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update task
const updateTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
    if (!task) return res.status(404).json({ message: "Task not found" });

    const { title, description, completed } = req.body;
    if (title) task.title = title;
    if (description) task.description = description;
    if (completed !== undefined) task.completed = completed;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete task
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json({ message: "Task deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { createTask, getTasks, updateTask, deleteTask };
