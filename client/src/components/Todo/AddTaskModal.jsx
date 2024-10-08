import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";
import { addTodo, getTodos } from "../../store/todo/todoAction";
import { selectLoading } from "../../store/todo/todoSelectors";
import { format } from "date-fns";
import TaskModal from "./TaskModal";

const AddTaskModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);

  const [todo, setTodo] = useState({
    title: "",
    dueDate: "",
    priority: "medium",
    tag: "work",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setTodo((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    const today = new Date().toISOString().split("T")[0];
    if (name === "dueDate" && value < today) {
      toast.info("Due date cannot be in the past");
      return;
    }
    setTodo({ ...todo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedDueDate = format(new Date(todo.dueDate), "yyyy-MM-dd");
      await dispatch(
        addTodo({
          ...todo,
          dueDate: formattedDueDate,
        })
      ).unwrap();
      // Fetch updated todos
      dispatch(getTodos({}));
      toast.success("Task added successfully");
      onClose();
      setTodo({
        title: "",
        dueDate: "",
        priority: "medium",
        tag: "work",
      });
    } catch (err) {
      toast.error("Failed to add task");
    }
  };

  if (!isOpen) return null;

  return (
    <TaskModal
      isOpen={isOpen}
      onClose={onClose}
      todo={todo}
      onChange={handleChange}
      onDateChange={handleDateChange}
      onSubmit={handleSubmit}
      loading={loading}
      actionLabel="Add"
      min={new Date()}
    />
  );
};

export default AddTaskModal;
