// TaskModal.js
import React from "react";
import { TailSpin } from "react-loader-spinner";

const TaskModal = ({
  isOpen,
  onClose,
  todo,
  onChange,
  onDateChange,
  onSubmit,
  loading,
  actionLabel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white shadow-2xl p-8 rounded-lg w-full max-w-md transform transition-all">
        <h3 className="mb-6 font-bold text-gray-800 text-xl">
          {actionLabel} Task
        </h3>

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

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block mb-1 text-gray-800 text-sm">
              Title (required)
            </label>
            <input
              type="text"
              id="title"
              value={todo.title}
              onChange={onChange}
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
              onChange={onDateChange}
              className="border-gray-300 bg-gray-100 p-3 border rounded focus:ring-2 focus:ring-gray-500 w-full text-gray-800 text-sm focus:outline-none transition"
              required
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
              onChange={onChange}
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
              onChange={onChange}
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
              {actionLabel} Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
