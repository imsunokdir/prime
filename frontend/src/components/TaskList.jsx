import { motion, AnimatePresence } from "framer-motion";
import TaskCard from "./TaskCard";

const TaskList = ({ tasks, onDelete, onToggle, onUpdate, updatingTaskId }) => {
  if (tasks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <p className="mt-4 text-gray-500 text-lg">No tasks found</p>
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
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
          >
            <TaskCard
              task={task}
              onDelete={onDelete}
              onToggle={onToggle}
              onUpdate={onUpdate}
              isUpdating={updatingTaskId === task._id}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;
