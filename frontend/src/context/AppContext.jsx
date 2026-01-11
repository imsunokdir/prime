import { QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./AuthContext";
import { TaskProvider } from "./TaskContext";
import { queryClient } from "../queryClient";

const AppProvider = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {/* <TaskProvider>{children}</TaskProvider> */}
        {children}
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default AppProvider;
