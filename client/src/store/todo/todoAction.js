// Add todo thunk
//get todos thunk
//update todo thunk
//delete todo thunk
//toggle todo thunk
//get completed todos thunk

// ****  get Todos headers:get todos that have a certain status - pending, overdue, today

// ****  get Todos that are completed - true or false

//***    get todos that have a certain tag - work, personal etc

// ****  get Todos :get todos that have a certain priority - high, medium, low

//**  Route to toggle the completion status of a specific todo by ID

// src/store/todo/todoAction.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Get all todos thunk
export const getInCompleteTodo = createAsyncThunk(
  "todo/getAllTodos",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/v1/todos/incomplete");
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
