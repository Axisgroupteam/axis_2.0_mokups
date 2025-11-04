import { createAsyncThunk } from "@reduxjs/toolkit";
import getAxios from "@/utils/axios";
import toast from "react-hot-toast";

/**
 * Login async thunk
 * @param {Object} credentials - { email: string, password: string }
 * @returns {Promise} - User data with token
 */
export const loginThunk = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const api = getAxios();
      const response = await api.post("/auth/signin", credentials);

      // Store token in localStorage
      if (response.data?.data?.token) {
        localStorage.setItem("token", response.data.data.token);
      }

      // Show success toast
      toast.success("Logged In!!");

      return response.data.data;
    } catch (error) {
      const errorMessage = error?.response?.data?.err || "Failed to login";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);
