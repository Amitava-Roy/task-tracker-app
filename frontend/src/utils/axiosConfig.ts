import axios from "axios";

export const baseApi = axios.create({
  baseURL: "https://task-tracker-app-98xe.onrender.com",
});
