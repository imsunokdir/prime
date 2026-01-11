import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/taskService";

export const useTasks = () => {
  const { user } = useContext(AuthContext);
  const limit = 3;
  const queryClient = useQueryClient();

  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["tasks"],
      queryFn: ({ pageParam = 1 }) => fetchTasks(pageParam, limit),
      enabled: !!user,
      getNextPageParam: (lastPage, pages) =>
        pages.length < lastPage.totalPages ? pages.length + 1 : undefined,
    });

  const tasks = data?.pages.flatMap((page) => page.tasks) || [];

  // ➕ Add
  const addTaskMutation = useMutation({
    mutationFn: ({ title, description }) => createTask(title, description),
    onSuccess: (newTask) => {
      queryClient.setQueryData(["tasks"], (old) => {
        if (!old) return old;
        return {
          ...old,
          pages: [
            {
              ...old.pages[0],
              tasks: [newTask, ...old.pages[0].tasks],
            },
            ...old.pages.slice(1),
          ],
        };
      });
    },
  });

  // ✏️ Edit
  const editTaskMutation = useMutation({
    mutationFn: ({ id, updates }) => updateTask(id, updates),
    onMutate: async ({ id, updates }) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });

      const previous = queryClient.getQueryData(["tasks"]);

      queryClient.setQueryData(["tasks"], (old) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            tasks: page.tasks.map((t) =>
              t._id === id ? { ...t, ...updates } : t
            ),
          })),
        };
      });

      return { previous };
    },
    onError: (_, __, ctx) => {
      queryClient.setQueryData(["tasks"], ctx.previous);
    },
  });

  // ❌ Delete (NO STUCK STATE)
  const deleteTaskMutation = useMutation({
    mutationFn: (id) => deleteTask(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });

      const previous = queryClient.getQueryData(["tasks"]);

      queryClient.setQueryData(["tasks"], (old) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            tasks: page.tasks.filter((t) => t._id !== id),
          })),
        };
      });

      return { previous };
    },
    onError: (_, __, ctx) => {
      queryClient.setQueryData(["tasks"], ctx.previous);
    },
  });

  return {
    tasks,
    loading: isLoading,
    loadingMore: isFetchingNextPage,
    hasMore: hasNextPage,

    loadMore: fetchNextPage,

    addTask: (title, description) =>
      addTaskMutation.mutateAsync({ title, description }),

    editTask: (id, updates) => editTaskMutation.mutateAsync({ id, updates }),

    removeTask: (id) => deleteTaskMutation.mutateAsync(id),
  };
};
