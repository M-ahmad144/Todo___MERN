import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";
import { addTodo, getTodos } from "../../store/todo/todoAction"; // Ensure getTodos is imported
import { selectLoading } from "../../store/todo/todoSelectors";
import { format } from "date-fns";

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

    // Get the current date and format it as 'YYYY-MM-DD'
    const today = new Date().toISOString().split("T")[0];

    // Check if the due date is in the past
    if (name === "dueDate" && value < today) {
      toast.info("Due date cannot be in the past");
      return;
    }

    // Update state if date is valid
    setTodo({ ...todo, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      const formattedDueDate = format(new Date(todo.dueDate), "yyyy-MM-dd");

      dispatch(
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
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white shadow-2xl p-8 rounded-lg w-full max-w-md transform transition-all">
        <h3 className="mb-6 font-bold text-gray-800 text-xl">Add New Task</h3>

        {loading && (
          <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-70 rounded-lg">
            <TailSpin
              height="50"
              width="50"
              color="#4A90E2"
              aria-label="loading"
            />
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block mb-1 text-gray-800 text-sm">
              Title (required)
            </label>
            <input
              type="text"
              id="title"
              value={todo.title}
              onChange={handleChange}
              className="border-gray-300 bg-gray-100 p-3 border rounded focus:ring-2 focus:ring-gray-500 w-full text-gray-800 text-sm placeholder-gray-400 focus:outline-none transition"
              placeholder="Enter task title"
              required
            />
          </div>

          <div>
            <label
              htmlFor="dueDate"
              className="block mb-1 text-gray-800 text-sm"
            >
              Due Date (required)
            </label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={todo.dueDate}
              onChange={handleDateChange}
              className="border-gray-300 bg-gray-100 p-3 border rounded focus:ring-2 focus:ring-gray-500 w-full text-gray-800 text-sm focus:outline-none transition"
              required
              // Disable past dates by setting the minimum value to today
              min={new Date().toISOString().split("T")[0]}
            />
          </div>

          <div>
            <label
              htmlFor="priority"
              className="block mb-1 text-gray-800 text-sm"
            >
              Priority
            </label>
            <select
              id="priority"
              value={todo.priority}
              onChange={handleChange}
              className="border-gray-300 bg-gray-100 p-3 border rounded focus:ring-2 focus:ring-gray-500 w-full text-gray-800 text-sm focus:outline-none transition"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label htmlFor="tag" className="block mb-1 text-gray-800 text-sm">
              Tag
            </label>
            <select
              id="tag"
              value={todo.tag}
              onChange={handleChange}
              className="border-gray-300 bg-gray-100 p-3 border rounded focus:ring-2 focus:ring-gray-500 w-full text-gray-800 text-sm focus:outline-none transition"
            >
              <option value="work">Work</option>
              <option value="personal">Personal</option>
              <option value="urgent">Urgent</option>
              <option value="shopping">Shopping</option>
              <option value="fitness">Fitness</option>
              <option value="study">Study</option>
              <option value="household">Household</option>
              <option value="finance">Finance</option>
              <option value="travel">Travel</option>
              <option value="health">Health</option>
              <option value="events">Events</option>
              <option value="projects">Projects</option>
            </select>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg font-semibold text-gray-800 text-sm transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg font-semibold text-sm text-white transition"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
