// src/store/todo/todoSelectors.js

export const selectGetInCompleteTodo = (state) => state.todos.todos;

// *** Todo Error Loading State Selectors ***
// src/store/todo/todoSelectors.js
export const selectLoading = (state) => state.todos.loading;
export const selectToggleTodoCompletionLoading = (state) =>
  state.todos.toggleLoading;
export const selectError = (state) => state.todos.error;
export const selectToggleTodoCompletionError = (state) =>
  state.todos.toggleError;

// *** Selectors for toggleTodoCompletion action ***

// Selector to find a specific todo by ID
export const selectTodoById = (state, todoId) =>
  state.todos.todos.find((todo) => todo._id === todoId);

// Selector to check if a specific todo is completed
export const selectTodoCompletionStatus = (state, todoId) => {
  const todo = state.todos.todos.find((todo) => todo._id === todoId);
  return todo ? todo.completed : false;
};

// Selector to get incomplete todos
export const selectIncompleteTodos = (state) =>
  state.todos.todos.filter((todo) => !todo.completed);
