import { AuthProvider } from "./AuthContext";
import { TaskProvider } from "./TaskContext";

const AppProvider = ({ children }) => {
  return (
    <AuthProvider>
      <TaskProvider>{children}</TaskProvider>
    </AuthProvider>
  );
};

export default AppProvider;
