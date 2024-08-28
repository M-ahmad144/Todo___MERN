import React from "react";
import Header from "./header/HeaderComponent";
import { TodoList } from "./todoList/TodoList";

export default function Home() {
  return (
    <div>
      <Header />
      <TodoList />
    </div>
  );
}
