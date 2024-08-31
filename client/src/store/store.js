import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import todoReducer from "./todo/todoSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    todos: todoReducer,
  },
});

export default store;
