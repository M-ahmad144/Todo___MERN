import React, { useState, useEffect, Suspense, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectGetTodos,
  selectLoading,
  selectError,
  selectToggleTodoCompletionLoading,
  selectToggleTodoCompletionError,
} from "../../store/todo/todoSelectors";
import {
  getTodos,
  toggleTodoCompletion,
  deleteTodo,
} from "../../store/todo/todoAction";
import CheckBox from "./CheckBox";
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

// Lazy load the modal
const EditTaskModal = lazy(() => import("./EditTaskModal"));

const TABLE_HEAD = ["Title", "Due Date", "Priority", "Actions"];

const TodoTable = React.memo(() => {
  const dispatch = useDispatch();
  const todos = useSelector(selectGetTodos);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const toggleLoading = useSelector(selectToggleTodoCompletionLoading);
  const toggleError = useSelector(selectToggleTodoCompletionError);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null); // State for the current task being edited

  useEffect(() => {
    dispatch(getTodos({}));
  }, [dispatch]);

  useEffect(() => {
    if (toggleError) {
      toast.error(toggleError);
    }
    if (error) {
      toast.error(error);
    }
  }, [toggleError, error]);

  const handleEditTask = (todo) => {
    setCurrentTodo(todo);
    console.log(todo);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentTodo(null);
  };

  const handleCheckboxChange = async (todoId, completed) => {
    try {
      await dispatch(toggleTodoCompletion(todoId)).unwrap();
      toast.success(
        completed
          ? "Task Marked as Incomplete!"
          : "Task Completed Successfully!"
      );
      dispatch(getTodos({}));
    } catch (error) {
      toast.error("Failed to toggle task status.");
    }
  };

  const handleDeleteTask = (todoId) => {
    dispatch(deleteTodo(todoId));
    dispatch(getTodos({}));
    toast.success("Task Deleted Successfully!");
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
          <tbody>
            {todos && todos.length > 0 ? (
              todos.map((todo) => (
                <tr
                  key={todo._id}
                  className="hover:bg-pink-800/20 transition-colors duration-200"
                >
                  <td className="border-purple-700 p-2 md:p-4 border-b font-sans md:font-semibold md:text-lg">
                    <div className="flex justify-between items-center gap-2">
                      <Typography
                        variant="small"
                        style={{ color: "black" }}
                        className="font-semiBold"
                      >
                        {todo.title || "Untitled"}
                      </Typography>
                      <CheckBox
                        checked={todo.completed}
                        onChange={() =>
                          handleCheckboxChange(todo._id, todo.completed)
                        }
                      />
                    </div>
                  </td>
                  <td className="border-gray-700 p-2 md:p-4 border-b">
                    <Typography variant="small" style={{ color: "black" }}>
                      {new Date(todo.dueDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })}
                    </Typography>
                  </td>
                  <td className="border-gray-700 p-2 md:p-4 border-b">
                    <Typography
                      variant="small"
                      style={{
                        color:
                          todo.priority === "high"
                            ? "red"
                            : todo.priority === "medium"
                            ? "purple"
                            : "green",
                      }}
                      className="font-semibold"
                    >
                      {todo.priority}
                    </Typography>
                  </td>
                  <td className="border-gray-700 p-2 border-b">
                    <div className="flex justify-center items-center gap-1 md:gap-10">
                      <Tooltip content="Edit Task">
                        <IconButton
                          onClick={() => handleEditTask(todo)}
                          variant="text"
                          className="bg-transparent p-4"
                        >
                          <PencilIcon className="w-4 h-4 text-black" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip content="Delete Task">
                        <IconButton
                          onClick={() => handleDeleteTask(todo._id)}
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
        {isModalOpen && currentTodo && (
          <EditTaskModal
            isOpen={isModalOpen}
            onClose={closeModal}
            currentTodo={currentTodo}
          />
        )}
      </Suspense>
    </CardBody>
  );
});

export default TodoTable;
