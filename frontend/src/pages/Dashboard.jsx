import { useContext, useMemo, useState } from "react";
import DashHeader from "../components/DashHeader";
import AddTaskForm from "../components/AddTaskForm";
import SearchBar from "../components/SearchBar";
import TaskList from "../components/TaskList";
import { AuthContext } from "../context/AuthContext";
import { TaskContext } from "../context/TaskContext";

const Dashboard = () => {
  const { user, logout, isLoggingOut } = useContext(AuthContext);
  const { tasks, addTask, editTask, removeTask, loading } =
    useContext(TaskContext);

  const [search, setSearch] = useState("");
  const [updatingTaskId, setUpdatingTaskId] = useState(null);

  const filteredTasks = useMemo(() => {
    return tasks.filter((t) =>
      t.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [tasks, search]);

  const handleUpdateTask = async (taskId, updates) => {
    setUpdatingTaskId(taskId);
    try {
      await editTask(taskId, updates);
    } finally {
      setTimeout(() => setUpdatingTaskId(null), 500);
    }
  };

  const handleToggleComplete = (taskId) => {
    const task = tasks.find((t) => t._id === taskId);
    if (task) {
      handleUpdateTask(taskId, { completed: !task.completed });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gray-50">
      {isLoggingOut && (
        <div className="fixed inset-0 bg-white/40 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            <p className="mt-4 text-gray-700 font-medium">Logging out...</p>
          </div>
        </div>
      )}

      <DashHeader userName={user?.name} onLogout={logout} />

      <main className="max-w-4xl mx-auto px-6 pb-12">
        <AddTaskForm onAdd={addTask} />
        <SearchBar value={search} onChange={setSearch} />

        <TaskList
          tasks={filteredTasks}
          onDelete={removeTask}
          onToggle={handleToggleComplete}
          onUpdate={handleUpdateTask}
          updatingTaskId={updatingTaskId}
        />
      </main>
    </div>
  );
};

export default Dashboard;
