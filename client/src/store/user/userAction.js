import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Signup thunk
export const signup = createAsyncThunk(
  "user/signup",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/v1/auth/signup", formData);

      if (data.status === "success") {
        return data.data.user;
      } else {
        return rejectWithValue("Signup failed. Please try again.");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// Login thunk
export const login = createAsyncThunk(
  "user/login",
  async (formData, { rejectWithValue }) => {
    try {
      await axios.post("/api/v1/auth/login", formData);

      return;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// Logout thunk
export const logout = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/v1/auth/logout");

      if (response.status === 200) {
        // Assuming the server will handle cookie removal
        return;
      } else {
        return rejectWithValue("Logout failed: unexpected status code");
      }
    } catch (error) {
      console.error("Logout error:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const getUser = createAsyncThunk(
  "user/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/v1/users/me");
      return data.data.user;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
