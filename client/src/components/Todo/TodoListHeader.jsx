import React from "react";
import { Button, CardHeader } from "@material-tailwind/react";
import FilterTag from "./FilterTag";

const TodoListHeader = () => {
  return (
    <CardHeader
      floated={false}
      shadow={false}
      className="relative bg-transparent rounded-none"
    >
      <div className="flex md:flex-row flex-col justify-between items-center gap-4 mt-4 mb-4 p-4">
        <div className="flex justify-center mb-4 md:mb-0 w-full md:w-[80%] lg:w-[65%]">
          <div className="md:ml-[27rem] md:w-full">
            <div className="bg-gradient-to-r from-[#32264e] via-[#d87979] to-[#1b3f69] rounded-lg w-full text-white">
              <div className="flex mb-8">
                {["Today", "Pending", "Overdue", "Completed"].map((label) => (
                  <div
                    key={label}
                    className="flex-1 bg-transparent hover:bg-black px-4 py-2 rounded-lg font-semibold text-sm md:text-xl hover:text-white transition-colors duration-200 cursor-pointer ease-in-out"
                  >
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-start items-center gap-4 md:mt-40 font-sans font-semibold">
          <Button className="bg-black hover:bg-white text-white hover:text-black transition">
            + Add Task
          </Button>
          <div className="flex md:mr-10 lg:mr-20">
            <FilterTag />
          </div>
        </div>
      </div>
    </CardHeader>
  );
};

export default TodoListHeader;
