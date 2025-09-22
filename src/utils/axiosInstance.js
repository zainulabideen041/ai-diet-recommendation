import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:7004",
  baseURL: "https://diatry-backend.vercel.app/",
  withCredentials: true,
});

export default instance;
