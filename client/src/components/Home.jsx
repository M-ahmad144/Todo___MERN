import React from "react";
import Header from "./header/HeaderComponent";
import { TodoList } from "./Todo/TodoList";

export default function Home() {
  return (
    <div>
      <Header />
      <TodoList />
    </div>
  );
}
