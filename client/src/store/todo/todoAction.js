// src/store/todo/todoAction.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Get all Incomplete Todos with dynamic filters
export const getTodos = createAsyncThunk(
  "todo/getTodos",
  async ({ filters, page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      // Build the query string with pagination parameters
      const query = new URLSearchParams({ ...filters, page, limit }).toString();
      const response = await axios.get(`/api/v1/todos/incomplete?${query}`);
      if (response.status === 200) {
        console.log("API Response:", response.data);
        console.log("Total Pages:", response.data.totalPages);

        return {
          todos: response.data.data.todos,
          totalPages: response.data.totalPages,
        };
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

export const toggleTodoCompletion = createAsyncThunk(
  "todo/toggleTodoCompletion",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`/api/v1/todos/${id}/toggle`);
      if (response.status === 200) {
        console.log("API Response:", response.data);
        return response.data.data.todo;
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

// Get all Completed Todos
export const getCompletedTodo = createAsyncThunk(
  "todo/getCompletedTodo",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/v1/todos/completed");
      if (response.status === 200) {
        console.log("API Response:", response.data);
        return response.data.data.todos;
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

export const addTodo = createAsyncThunk(
  "todo/addTodo",
  async (todo, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/v1/todos/add", todo);
      if (response.status === 200) {
        console.log("ADD todo API Response:", response.data);
        return response.data.data.todo;
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
