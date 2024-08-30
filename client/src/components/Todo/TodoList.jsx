import React from "react";
import { Card } from "@material-tailwind/react";
import TodoListHeader from "./TodoListHeader";
import TodoTable from "./TodoTable";
import TodoListFooter from "./TodoListFooter";

export function TodoList() {
  return (
    <Card className="bg-transparent w-full h-full">
      <TodoListHeader />
      <TodoTable />
      <TodoListFooter />
    </Card>
  );
}

export default TodoList;
