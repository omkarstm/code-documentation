// utils/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5001/api", // replace with your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token from localStorage or AsyncStorage
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // or AsyncStorage.getItem for React Native
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
