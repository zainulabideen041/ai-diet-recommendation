import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:7004/",
  withCredentials: true,
});

export default instance;
