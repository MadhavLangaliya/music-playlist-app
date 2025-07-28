import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:5000/api",
    baseURL: "https://music-playlist-api.onrender.com/", // ← your actual backend URL
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;
