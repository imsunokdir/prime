// services/authService.js
import axiosInstance from "../api/axios";

export const loginService = async (email, password) => {
  const res = await axiosInstance.post("/auth/login", { email, password });
  return res.data;
};

export const registerService = async (name, email, password) => {
  const res = await axiosInstance.post("/auth/register", {
    name,
    email,
    password,
  });
  return res.data;
};

export const logoutService = async () => {
  await axiosInstance.post("/auth/logout");
};

export const getProfileService = async () => {
  const res = await axiosInstance.get("/users/profile");
  return res.data;
};
