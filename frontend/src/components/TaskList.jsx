import { motion, AnimatePresence } from "framer-motion";
import TaskCard from "./TaskCard";
const TaskList = ({ tasks, onDelete, onToggle, updatingTaskId, onUpdate }) => {
  if (tasks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        <p className="mt-4 text-gray-500 text-lg">No tasks found</p>
        <p className="text-gray-400 text-sm">
          Create a new task to get started
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-3">
      <AnimatePresence mode="popLayout">
        {tasks.map((task) => (
          <motion.div
            key={task._id}
            layout
            initial={{ opacity: 0, x: -20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{
              opacity: 0,
              x: 100,
              scale: 0.9,
              transition: { duration: 0.3 },
            }}
            transition={{
              layout: { duration: 0.3 },
              opacity: { duration: 0.3 },
              scale: { duration: 0.3 },
            }}
          >
            <TaskCard
              task={task}
              onDelete={onDelete}
              onToggle={onToggle}
              isUpdating={updatingTaskId === task._id}
              onUpdate={onUpdate}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;
