import axios, { AxiosError } from "axios";

const appUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "");

function getApiBaseUrl() {
  if (typeof window !== "undefined") {
    return "/api";
  }

  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000/api";
  }

  if (!appUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not set");
  }

  return `${appUrl}/api`;
}

export const nextServer = axios.create({
  baseURL: getApiBaseUrl(),
  withCredentials: true,
});

export type ApiError = AxiosError<{ error: string }>;
