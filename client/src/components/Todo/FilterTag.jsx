// File: FilterTag.js
import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import "primereact/resources/primereact.min.css"; // PrimeReact CSS

// Dummy data for tags - replace with your actual tags data
const tags = [
  { name: "Work", code: "WRK" },
  { name: "Personal", code: "PRS" },
  { name: "Urgent", code: "URG" },
  { name: "Shopping", code: "SHP" },
  { name: "Fitness", code: "FIT" },
];

const FilterTag = () => {
  const [selectedTag, setSelectedTag] = useState(null);

  // Template for displaying the selected tag
  const selectedTagTemplate = (option, props) => {
    if (option) {
      return (
        <div className="flex items-center">
          <span>{option.name}</span>
        </div>
      );
    }
    return <span>{props.placeholder}</span>;
  };

  // Template for displaying each tag in the dropdown
  const tagItemTemplate = (option) => {
    return (
      <div className="flex items-center hover:bg-gray-100">
        <div className="mr-2"></div>
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
