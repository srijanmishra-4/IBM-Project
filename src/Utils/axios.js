import axios from "axios";

const api = axios.create({
  // baseURL:  process.env.BASE_URL,
  baseURL: import.meta.env.VITE_BASE_URL,

  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type" : "application/json",
  },
});

export default api;
