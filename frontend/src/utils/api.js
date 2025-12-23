import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

const api = axios.create({
  baseURL: API_BASE + "/api",
});

// Automatically attach correct token
api.interceptors.request.use((config) => {
  const adminToken = localStorage.getItem("nmk_admin_token");
  const userToken = localStorage.getItem("nmk_user_token");

  // Always give priority to admin
  const token = adminToken || userToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
