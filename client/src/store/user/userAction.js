import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

export const signup = createAsyncThunk(
  "user/signup",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/v1/auth/signup", formData);

      if (data.status === "success") {
        Cookies.set("token", data.token);
        return data.user;
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

export const login = createAsyncThunk(
  "user/login",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/v1/auth/login", formData);
      Cookies.set("token", data.token);
      return data.user;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const logout = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      // Perform the logout request
      const response = await axios.get("/api/v1/auth/logout");

      // Check if the response status is success
      if (response.status === 200) {
        // Assuming 200 is the success status code
        Cookies.remove("token"); // Remove the token
        console.log("Logged out successfully");
        return; // Indicate successful logout
      } else {
        return rejectWithValue("Logout failed: unexpected status code"); // Handle unexpected status
      }
    } catch (error) {
      // Handle errors from the request
      console.error("Logout error:", error);
      return rejectWithValue(error.message); // Pass the error message to the rejected action
    }
  }
);
export const getUser = createAsyncThunk(
  "user/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/v1/users/me");
      return data.user;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
