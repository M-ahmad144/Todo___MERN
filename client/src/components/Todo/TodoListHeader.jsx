import React, { useState, memo } from "react";
import { useDispatch } from "react-redux";
import { Button, CardHeader } from "@material-tailwind/react";
import { getTodos } from "../../store/todo/todoAction";
import AddTaskModal from "./AddTaskModal";
import FilterTag from "./FilterTag";

const TodoListHeader = memo(() => {
  const dispatch = useDispatch();
  const [activeFilter, setActiveFilter] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);

  // Handle filter changes based on label
  const handleFilterChange = (filter) => {
    setActiveFilter(filter.toLowerCase());
    let filterOptions = {};

    // Mapping the filter to specific query parameters
    switch (filter.toLowerCase()) {
      case "pending":
        filterOptions.status = "pending";
        break;
      case "completed":
        filterOptions.status = "completed";
        break;
      case "today":
        filterOptions.status = "today";
        break;
      case "overdue":
        filterOptions.status = "overdue";
        break;
      default:
        break;
    }

    // Dispatch the action with the filter parameters
    dispatch(getTodos(filterOptions));
  };

  // Open the modal to add tasks
  const handleAddTask = () => {
    setModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <CardHeader
      floated={false}
      shadow={false}
      className="relative bg-transparent rounded-none"
    >
      <div className="flex md:flex-row flex-col justify-between items-center gap-4 mt-4 md:mt-0 mb-4 p-4">
        <div className="flex justify-center mb-4 md:mb-0 w-full md:w-[80%] lg:w-[65%]">
          <div className="md:ml-[27rem] md:w-full">
            <div className="bg-gradient-to-r from-[#32264e] via-[#d87979] to-[#1b3f69] rounded-lg w-full text-white">
              <div className="flex mb-8">
                {["Today", "Pending", "Overdue", "Completed"].map((label) => (
                  <div
                    key={label}
                    onClick={() => handleFilterChange(label)}
                    className={`flex-1 px-4 py-2 rounded-lg font-semibold text-sm md:text-xl transition-colors duration-200 cursor-pointer ease-in-out ${
                      activeFilter === label.toLowerCase()
                        ? "bg-black text-white"
                        : "bg-transparent text-white hover:bg-black hover:text-white"
                    }`}
                  >
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-start items-center gap-4 md:mt-40 font-sans font-semibold">
          <Button
            onClick={handleAddTask}
            className="bg-black hover:bg-white text-white hover:text-black transition"
          >
            + Add Task
          </Button>
          <div className="flex md:mr-10 lg:mr-20">
            <FilterTag />
          </div>
        </div>
      </div>

      {/* Render AddTaskModal */}
      <AddTaskModal isOpen={isModalOpen} onClose={closeModal} />
    </CardHeader>
  );
});

export default TodoListHeader;
