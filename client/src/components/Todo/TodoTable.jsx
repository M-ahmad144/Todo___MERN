// src/components/TodoTable.js

import React, { useState, useEffect, Suspense, lazy } from "react";

/***   Redux Imports   ***/
import { useDispatch, useSelector } from "react-redux";
import {
  selectGetInCompleteTodo,
  selectLoading,
  selectError,
  selectToggleTodoCompletionLoading,
  selectToggleTodoCompletionError,
} from "../../store/todo/todoSelectors";
import {
  getInCompleteTodo,
  toggleTodoCompletion,
} from "../../store/todo/todoAction";

//  Component
import CheckBox from "./CheckBox";
const AddTaskModal = lazy(() => import("./AddTaskModal"));

/***  Material Tailwind Imports    ***/
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";
import {
  Typography,
  CardBody,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import {
  PencilIcon,
  TrashIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/solid";

const TABLE_HEAD = ["Title", "Due Date", "Priority", "Actions"];

const TodoTable = React.memo(() => {
  const dispatch = useDispatch();
  const todos = useSelector(selectGetInCompleteTodo);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const toggleLoading = useSelector(selectToggleTodoCompletionLoading);
  const toggleError = useSelector(selectToggleTodoCompletionError);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getInCompleteTodo());
  }, [dispatch]);

  useEffect(() => {
    if (toggleError) {
      toast.error(toggleError);
    }
    if (error) {
      toast.error(error);
    }
  }, [toggleError, error]);

  const handleEditTask = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleCheckboxChange = async (todoId, completed) => {
    if (toggleLoading || loading) return; // Prevent updates if loading

    try {
      await dispatch(toggleTodoCompletion(todoId)).unwrap();
      toast.success("Task Completed Successfully !!");
      dispatch(getInCompleteTodo()); // Refresh todos to reflect changes
    } catch (error) {
      toast.error("Failed to update todo status: " + error.message);
    }
  };

  return (
    <CardBody className="flex-grow bg-transparent lg:mr-20 lg:ml-20 p-4 overflow-x-auto">
      {loading || toggleLoading ? (
        <div className="flex justify-center items-center h-full">
          <TailSpin
            height="80"
            width="80"
            color="black"
            ariaLabel="tail-spin-loading"
            radius="1"
            visible={true}
          />
        </div>
      ) : (
        <table className="mt-4 w-full min-w-max text-left table-auto">
          {/* Table header */}
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={head}
                  className="border-y bg-gray-900 hover:bg-gray-800 p-2 md:p-4 border-black transition-colors cursor-pointer"
                >
                  <div className="flex justify-between items-center gap-2">
                    <Typography
                      variant="small"
                      color="white"
                      className="font-normal leading-none"
                    >
                      {head}
                    </Typography>
                    {index !== TABLE_HEAD.length - 1 && (
                      <ChevronUpDownIcon
                        strokeWidth={2}
                        className="w-4 h-4 text-white"
                      />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          {/* Table body */}
          <tbody>
            {todos && todos.length > 0 ? (
              todos.map((todo) => (
                <tr
                  key={todo._id}
                  className="hover:bg-pink-800/20 transition-colors duration-200"
                >
                  {/* Title and Checkbox */}
                  <td className="border-purple-700 p-2 md:p-4 border-b font-sans md:font-semibold md:text-lg">
                    <div className="flex justify-between items-center gap-2">
                      <Typography
                        variant="small"
                        style={{ color: "black" }}
                        className="font-semiBold"
                      >
                        {todo.title}
                      </Typography>
                      <CheckBox
                        checked={todo.completed}
                        onChange={() =>
                          handleCheckboxChange(todo._id, todo.completed)
                        }
                      />
                    </div>
                  </td>
                  {/* Due Date */}
                  <td className="border-gray-700 p-2 md:p-4 border-b">
                    <Typography variant="small" style={{ color: "black" }}>
                      {new Date(todo.dueDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })}
                    </Typography>
                  </td>
                  {/* Priority */}
                  <td className="border-gray-700 p-2 md:p-4 border-b">
                    <Typography
                      variant="small"
                      style={{
                        color:
                          todo.priority === "high"
                            ? "red"
                            : todo.priority === "medium"
                            ? "yellow"
                            : "green",
                      }}
                      className="font-semibold"
                    >
                      {todo.priority}
                    </Typography>
                  </td>
                  {/* Action */}
                  <td className="border-gray-700 p-2 border-b">
                    <div className="flex justify-center items-center gap-1 md:gap-10">
                      <Tooltip content="Edit Task">
                        <IconButton
                          onClick={handleEditTask}
                          variant="text"
                          className="bg-transparent p-4"
                        >
                          <PencilIcon className="w-4 h-4 text-black" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip content="Delete Task">
                        <IconButton
                          variant="text"
                          className="bg-transparent p-1 rounded-full text-red-600"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={TABLE_HEAD.length} className="p-4 text-center">
                  No tasks available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
      <Suspense fallback={<div>Loading...</div>}>
        <AddTaskModal isOpen={isModalOpen} onClose={closeModal} />
      </Suspense>
    </CardBody>
  );
});

export default TodoTable;
