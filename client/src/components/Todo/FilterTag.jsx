import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import "primereact/resources/primereact.min.css";
import { useDispatch } from "react-redux";
import { getTodos } from "../../store/todo/todoAction";
import { toast } from "react-toastify";

const tags = [
  { name: "work", code: "WRK" },
  { name: "personal", code: "PRS" },
  { name: "urgent", code: "URG" },
  { name: "shopping", code: "SHP" },
  { name: "fitness", code: "FIT" },
  { name: "study", code: "STY" },
  { name: "household", code: "HLD" },
  { name: "finance", code: "FIN" },
  { name: "travel", code: "TRV" },
  { name: "health", code: "HLT" },
  { name: "events", code: "EVT" },
  { name: "projects", code: "PRJ" },
];

const FilterTag = () => {
  const [selectedTag, setSelectedTag] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedTag) {
      handleSelectedTag(selectedTag);
    }
  }, [selectedTag]);

  const handleSelectedTag = (tag) => {
    const tagName = tag?.name.toLowerCase();

    if (!tagName) return;

    // Prepare filter options for dispatch
    const filterOptions = { tag: tagName };

    try {
      // Dispatch the action with the filter options
      dispatch(getTodos({ filters: filterOptions })); // Ensure getTodos handles the
    } catch (error) {
      // Show a general error if fetching fails
      toast.error("Something went wrong. Please try again.");
    }
  };

  // Template for displaying the selected tag
  const selectedTagTemplate = (option) => {
    if (option) {
      return (
        <div className="flex items-center">
          <span>{option.name}</span>
        </div>
      );
    }
    return <span>Select a Tag</span>;
  };

  // Template for displaying each tag in the dropdown
  const tagItemTemplate = (option) => {
    return (
      <div className="flex items-center hover:bg-gray-100">
        <span>{option.name}</span>
      </div>
    );
  };

  return (
    <Dropdown
      value={selectedTag}
      onChange={(e) => setSelectedTag(e.value)}
      options={tags}
      optionLabel="name"
      placeholder="Select a Tag"
      filter
      valueTemplate={selectedTagTemplate}
      itemTemplate={tagItemTemplate}
      className="bg-white/40 border-none w-full md:w-44"
    />
  );
};

export default FilterTag;
