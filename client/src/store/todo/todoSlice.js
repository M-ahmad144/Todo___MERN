// src/store/todo/todoSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { getTodos, toggleTodoCompletion, addTodo } from "./todoAction";

const initialState = {
  todos: [],
  loading: false,
  error: null,
  toggleLoading: false, // Separate loading state for toggle
  toggleError: null,
  totalPages: 1,
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload.todos;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(toggleTodoCompletion.pending, (state) => {
        state.toggleLoading = true; // Only set toggleLoading to true
        state.toggleError = null;
      })
      .addCase(toggleTodoCompletion.fulfilled, (state, action) => {
        state.toggleLoading = false; // Properly reset toggleLoading

        // Add debug information here
        console.log("Received payload in fulfilled:", action.payload);

        const updatedTodo = action.payload;

        // Ensure updatedTodo is defined and has _id
        if (updatedTodo && updatedTodo._id) {
          state.todos = state.todos.map((todo) =>
            todo._id === updatedTodo._id ? updatedTodo : todo
          );
        } else {
          console.error("Invalid payload:", updatedTodo);
        }

        state.toggleError = null;
      })
      .addCase(toggleTodoCompletion.rejected, (state, action) => {
        state.toggleLoading = false; // Reset toggleLoading on error
        state.toggleError = action.error.message; // Capture the error message
      });
  },
});

export default todoSlice.reducer;
