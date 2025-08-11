"use client";

import axios from "axios";
import { toast } from "react-toastify";
import { getSession } from "next-auth/react";

const axiosInstance = axios.create({
  baseURL: process.env.API_URL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    const token = session?.accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers["ngrok-skip-browser-warning"] = "69420";

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor with toast messages
axiosInstance.interceptors.response.use(
  (response) => {
    const backendMessage = response.data?.message || response.data?.msg;
    if (response.status === 200 && backendMessage) {
      toast.success(backendMessage);
    }
    return response;
  },
  (error) => {
    const status = error.response?.status;
    const backendMessage =
      error.response?.data?.message || error.response?.data?.error;

    const showError = (defaultMsg: string) => {
      toast.error(backendMessage || defaultMsg);
    };

    switch (status) {
      case 400:
        showError("Bad request. Please check your input.");
        break;
      case 401:
        showError("Unauthorized. Please login again.");
        break;
      case 403:
        showError("Forbidden. Access denied.");
        break;
      case 404:
        showError("Not found. Please check the endpoint.");
        break;
      case 409:
        toast.info(backendMessage || "Conflict: Already exists.");
        break;
      case 500:
        showError("Server error. Please try again later.");
        break;
      default:
        showError("Something went wrong.");
        break;
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
