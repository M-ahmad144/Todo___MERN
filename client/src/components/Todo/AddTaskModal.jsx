import React, { useState } from "react";

const AddTaskModal = ({ isOpen, onClose }) => {
  // State to hold form values
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [tag, setTag] = useState("Work");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, dueDate, priority, tag });
    setTitle("");
    setDueDate("");
    setPriority("Medium");
    setTag("Work");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white shadow-2xl p-8 rounded-lg w-full max-w-md transform transition-all">
        <h3 className="mb-6 font-bold text-gray-800 text-xl">Add New Task</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title Input */}
          <div>
            <label htmlFor="title" className="block mb-1 text-gray-800 text-sm">
              Title (required)
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-gray-300 bg-gray-100 p-3 border rounded focus:ring-2 focus:ring-gray-500 w-full text-gray-800 text-sm placeholder-gray-400 focus:outline-none transition"
              placeholder="Enter task title"
              required
            />
          </div>

          {/* Due Date Input */}
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
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="border-gray-300 bg-gray-100 p-3 border rounded focus:ring-2 focus:ring-gray-500 w-full text-gray-800 text-sm focus:outline-none transition"
              required
            />
          </div>

          {/* Priority Dropdown */}
          <div>
            <label
              htmlFor="priority"
              className="block mb-1 text-gray-800 text-sm"
            >
              Priority
            </label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="border-gray-300 bg-gray-100 p-3 border rounded focus:ring-2 focus:ring-gray-500 w-full text-gray-800 text-sm focus:outline-none transition"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          {/* Tag Dropdown */}
          <div>
            <label htmlFor="tag" className="block mb-1 text-gray-800 text-sm">
              Tag
            </label>
            <select
              id="tag"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="border-gray-300 bg-gray-100 p-3 border rounded focus:ring-2 focus:ring-gray-500 w-full text-gray-800 text-sm focus:outline-none transition"
            >
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Urgent">Urgent</option>
              <option value="Later">Later</option>
            </select>
          </div>

          {/* Buttons */}
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
