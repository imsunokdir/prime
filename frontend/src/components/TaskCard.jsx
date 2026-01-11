import { useState } from "react";

const TaskCard = ({ task, onDelete, onToggle, onUpdate, isUpdating }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(
    task.description || ""
  );
  const [isSaving, setIsSaving] = useState(false);

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    setShowDeleteConfirm(false);

    try {
      await onDelete(task._id);
    } catch (error) {
      setIsDeleting(false);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  const handleEditClick = () => {
    setEditTitle(task.title);
    setEditDescription(task.description || "");
    setIsEditing(true);
  };

  const handleSaveEdit = async () => {
    if (!editTitle.trim()) return;

    setIsSaving(true);
    try {
      await onUpdate(task._id, {
        title: editTitle,
        description: editDescription,
      });
      setIsEditing(false);
    } catch (error) {
      // Handle error if needed
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setEditTitle(task.title);
    setEditDescription(task.description || "");
    setIsEditing(false);
  };

  return (
    <div className="relative bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow overflow-hidden">
      {/* Shimmer loading effect for updating */}
      {isUpdating && (
        <>
          <div className="absolute inset-0 bg-white/60 z-10 rounded-lg"></div>
          <div className="absolute inset-0 z-20 rounded-lg">
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
          </div>
        </>
      )}

      {/* Shimmer loading effect for saving */}
      {isSaving && (
        <>
          <div className="absolute inset-0 bg-blue-50/80 z-30 rounded-lg"></div>
          <div className="absolute inset-0 z-40 rounded-lg">
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-blue-200/50 to-transparent"></div>
          </div>
          <div className="absolute inset-0 z-50 flex items-center justify-center">
            <div className="bg-white/90 rounded-lg px-4 py-2 flex items-center gap-2 shadow-lg">
              <svg
                className="animate-spin h-5 w-5 text-blue-600"
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
              <span className="text-sm font-medium text-gray-700">
                Saving...
              </span>
            </div>
          </div>
        </>
      )}

      {/* Shimmer loading effect for deleting */}
      {isDeleting && (
        <>
          <div className="absolute inset-0 bg-red-50/80 z-30 rounded-lg"></div>
          <div className="absolute inset-0 z-40 rounded-lg">
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-red-200/50 to-transparent"></div>
          </div>
          <div className="absolute inset-0 z-50 flex items-center justify-center">
            <div className="bg-white/90 rounded-lg px-4 py-2 flex items-center gap-2 shadow-lg">
              <svg
                className="animate-spin h-5 w-5 text-red-600"
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
              <span className="text-sm font-medium text-gray-700">
                Deleting...
              </span>
            </div>
          </div>
        </>
      )}

      <div className="flex items-start justify-between p-5 relative z-0">
        {/* Content */}
        <div className="flex-1">
          {isEditing ? (
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 font-medium"
                  placeholder="Task title"
                  autoFocus
                  disabled={isSaving}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 resize-none"
                  rows={3}
                  placeholder="Add a description (optional)"
                  disabled={isSaving}
                />
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3 mb-2">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => onToggle(task._id)}
                  disabled={isUpdating || isDeleting}
                  className="h-5 w-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <h3
                  className={`text-lg font-semibold ${
                    task.completed
                      ? "text-gray-500 line-through"
                      : "text-gray-900"
                  }`}
                >
                  {task.title}
                </h3>
              </div>
              {task.description && (
                <p className="text-gray-600 ml-8">{task.description}</p>
              )}
            </>
          )}
        </div>

        {/* Action buttons */}
        <div
          className={`ml-4 flex gap-2 ${
            showDeleteConfirm || isDeleting
              ? "opacity-0 pointer-events-none"
              : "opacity-100"
          }`}
        >
          {isEditing ? (
            <>
              <button
                onClick={handleSaveEdit}
                disabled={isSaving || !editTitle.trim()}
                className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Save"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </button>
              <button
                onClick={handleCancelEdit}
                disabled={isSaving}
                className="p-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Cancel"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleEditClick}
                disabled={isUpdating || isDeleting}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Edit task"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button>
              <button
                onClick={handleDeleteClick}
                disabled={isUpdating || isDeleting}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Delete task"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Delete confirmation buttons - slide in from right */}
      <div
        className={`absolute right-0 top-0 bottom-0 flex items-center gap-2 bg-gray-50 border-l border-gray-200 px-4 transition-all duration-300 ${
          showDeleteConfirm && !isDeleting
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0"
        }`}
      >
        <button
          onClick={handleCancelDelete}
          className="p-2.5 bg-white hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 border border-gray-300"
          title="Cancel"
        >
          <svg
            className="h-5 w-5 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <button
          onClick={handleConfirmDelete}
          className="p-2.5 bg-red-500 hover:bg-red-600 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-400"
          title="Confirm delete"
        >
          <svg
            className="h-5 w-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </button>
      </div>

      {/* <style>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-shimmer {
          animation: shimmer 1s ease-in-out;
        }
      `}</style> */}
    </div>
  );
};

export default TaskCard;
