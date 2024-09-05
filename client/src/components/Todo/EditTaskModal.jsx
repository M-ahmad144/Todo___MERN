// EditTaskModal.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateTodo, getTodos } from "../../store/todo/todoAction";
import { selectLoading } from "../../store/todo/todoSelectors";
import TaskModal from "./TaskModal";

const EditTaskModal = ({ isOpen, onClose, currentTodo }) => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);

  const [todo, setTodo] = useState({
    title: "",
    dueDate: "",
    priority: "medium",
    tag: "work",
  });

  // Populate the form with the current todo data when editing
  useEffect(() => {
    console.log("currentTodo in EditTaskModal useEffect:", currentTodo);
    if (currentTodo) {
      setTodo({
        title: currentTodo.title || "",
        dueDate: currentTodo.dueDate
          ? new Date(currentTodo.dueDate).toISOString().split("T")[0]
          : "",
        priority: currentTodo.priority || "medium",
        tag: currentTodo.tag || "work",
      });
    }
  }, [currentTodo]);

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
      await dispatch(updateTodo({ _id: currentTodo._id, ...todo })).unwrap();
      console.log(todo);
      // Fetch updated todos
      dispatch(getTodos({}));
      toast.success("Task updated successfully");
      onClose();
    } catch (err) {
      toast.error("Failed to update task");
    }
  };

  return (
    <TaskModal
      isOpen={isOpen}
      onClose={onClose}
      todo={todo}
      onChange={handleChange}
      onDateChange={handleDateChange}
      onSubmit={handleSubmit}
      loading={loading}
      actionLabel="Edit"
    />
  );
};

export default EditTaskModal;
