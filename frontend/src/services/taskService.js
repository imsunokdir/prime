import axiosInstance from "../api/axios";

// Get all tasks
export const fetchTasks = async (page = 1, limit = 5) => {
  const res = await axiosInstance.get(`/tasks?page=${page}&limit=${limit}`);
  return res.data;
};

// Create a new task
export const createTask = async (title, description) => {
  const res = await axiosInstance.post("/tasks", { title, description });
  return res.data;
};

// Update a task
export const updateTask = async (id, updates) => {
  const res = await axiosInstance.put(`/tasks/${id}`, updates);
  return res.data;
};

// Delete a task
export const deleteTask = async (id) => {
  await axiosInstance.delete(`/tasks/${id}`);
};
