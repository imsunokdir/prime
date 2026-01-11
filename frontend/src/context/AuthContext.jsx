import { createContext, useState, useEffect } from "react";
import {
  loginService,
  logoutService,
  registerService,
  getProfileService,
} from "../services/authService";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Check auth on app load
  useEffect(() => {
    const initAuth = async () => {
      try {
        const profile = await getProfileService();
        setUser(profile);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    const res = await loginService(email, password);
    console.log("red:", res);
    setUser(res);
  };

  const register = async (name, email, password) => {
    await registerService(name, email, password);
    const profile = await getProfileService();
    setUser(profile);
  };

  const logout = async () => {
    setIsLoggingOut(true);
    try {
      await logoutService();
      setTimeout(() => {
        setUser(null);
        setIsLoggingOut(false);
      }, 500);
    } catch (error) {
      setIsLoggingOut(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, isLoggingOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
