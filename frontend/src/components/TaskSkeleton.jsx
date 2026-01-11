const TaskSkeleton = ({ count = 5 }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 animate-pulse">
      <div className="flex items-start justify-between">
        {/* Content */}
        <div className="flex-1 flex items-start gap-3">
          {/* Checkbox skeleton */}
          <div className="h-5 w-5 bg-gray-200 rounded mt-1"></div>

          <div className="flex-1">
            {/* Title skeleton */}
            <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>

            {/* Description skeleton */}
            <div className="space-y-2">
              <div className="h-4 bg-gray-100 rounded w-full"></div>
              <div className="h-4 bg-gray-100 rounded w-5/6"></div>
            </div>
          </div>
        </div>

        {/* Action buttons skeleton */}
        <div className="ml-4 flex gap-2">
          <div className="h-9 w-9 bg-gray-200 rounded-lg"></div>
          <div className="h-9 w-9 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default TaskSkeleton;
