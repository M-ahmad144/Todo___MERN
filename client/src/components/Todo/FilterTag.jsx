import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import "primereact/resources/primereact.min.css";
import { useDispatch, useSelector } from "react-redux";
import { getTodos } from "../../store/todo/todoAction";
import { toast } from "react-toastify";

const tags = [
  { name: "Work", code: "WRK" },
  { name: "Personal", code: "PRS" },
  { name: "Urgent", code: "URG" },
  { name: "Shopping", code: "SHP" },
  { name: "Fitness", code: "FIT" },
  { name: "Study", code: "STY" },
  { name: "Household", code: "HLD" },
  { name: "Finance", code: "FIN" },
  { name: "Travel", code: "TRV" },
  { name: "Health", code: "HLT" },
  { name: "Events", code: "EVT" },
  { name: "Projects", code: "PRJ" },
];

const FilterTag = () => {
  const [selectedTag, setSelectedTag] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedTag) {
      handleSelectedTag(selectedTag);
    }
  }, [selectedTag]);

  const handleSelectedTag = async (tag) => {
    const tagName = tag ? tag.name.toLowerCase() : null;

    if (!tagName) return;

    // Prepare filter options for dispatch
    const filterOptions = { tag: tagName };

    try {
      // Dispatch the action with the filter options
      await dispatch(getTodos(filterOptions)); // Assuming getTodos handles filtering on the backend
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
