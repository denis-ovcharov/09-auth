import axios from "axios";

const backendUrl = (
  process.env.BACKEND_API_URL ?? "https://nodejs-hw-5-fpei.onrender.com"
).replace(/\/+$/, "");

export const api = axios.create({
  baseURL: backendUrl,
  withCredentials: true,
});
