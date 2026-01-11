import { useState } from "react";

// Add Task Form Component
const AddTaskForm = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onAdd(title, description);
      setTitle("");
      setDescription("");
    } finally {
      // Keep loading state for at least 500ms for better UX
      setTimeout(() => setIsSubmitting(false), 500);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && e.ctrlKey) {
      handleSubmit();
    }
  };
  return (
    <div className="relative bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6 overflow-hidden">
      {/* Shimmer loading effect */}
      {isSubmitting && (
        <>
          <div className="absolute inset-0 bg-white/60 z-10 rounded-lg"></div>
          <div className="absolute inset-0 z-20 rounded-lg">
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-blue-200/40 to-transparent"></div>
          </div>
        </>
      )}

      <div className="relative z-0">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Create New Task
        </h2>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              placeholder="Enter task title"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isSubmitting}
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              placeholder="Enter task description (optional)"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow resize-none disabled:opacity-50 disabled:cursor-not-allowed"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isSubmitting}
            />
          </div>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Adding...
              </>
            ) : (
              "Add Task"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskForm;
