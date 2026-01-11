import { createContext, useContext, useState, useEffect } from "react";
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/taskService";
import { AuthContext } from "./AuthContext";

export const TaskContext = createContext(null);

export const TaskProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   console.log("tasks:", tasks);
  // }, [tasks]);

  // Load tasks when user changes
  useEffect(() => {
    if (!user) {
      setTasks([]);
      setLoading(false);
      return;
    }

    const loadTasks = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data);
      } catch {
        setTasks([]);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, [user]);

  const addTask = async (title, description) => {
    const newTask = await createTask(title, description);
    setTasks((prev) => [...prev, newTask]);
  };

  const editTask = async (id, updates) => {
    const updatedTask = await updateTask(id, updates);
    setTasks((prev) => prev.map((t) => (t._id === id ? updatedTask : t)));
  };

  const removeTask = async (id) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

  return (
    <TaskContext.Provider
      value={{ tasks, loading, addTask, editTask, removeTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};
