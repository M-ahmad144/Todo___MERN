import React from "react";
import {
  PencilIcon,
  TrashIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  CardFooter,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import FilterTag from "./FilterTag";

const TABLE_HEAD = ["Title", "Due Date", "Priority", "Actions"];

const TABLE_ROWS = [
  {
    title: "Task 1",
    dueDate: "2024-08-30",
    priority: "High",
    completed: false,
  },
  {
    title: "Task 2",
    dueDate: "2024-09-01",
    priority: "Medium",
    completed: false,
  },
  { title: "Task 3", dueDate: "2024-09-02", priority: "Low", completed: true },
];

export function TodoList() {
  return (
    <Card className="bg-transparent w-full h-full">
      <CardHeader
        floated={false}
        shadow={false}
        className="relative bg-transparent rounded-none"
      >
        <div className="flex md:flex-row flex-col justify-between items-center gap-4 mt-4 md:mt-8 mb-4 p-4">
          <div className="flex justify-center mb-4 md:mb-0 w-full md:w-[80%] lg:w-[65%]">
            <div className="md:ml-[27rem] md:w-full">
              <div className="bg-gradient-to-r from-[#32264e] via-[#d87979] to-[#1b3f69] rounded-lg w-full text-white">
                <div className="flex mb-8">
                  <div className="flex-1 bg-transparent hover:bg-black px-4 py-2 rounded-lg font-semibold text-sm md:text-xl hover:text-white transition-colors duration-200 cursor-pointer ease-in-out">
                    Today
                  </div>
                  <div className="flex-1 bg-transparent hover:bg-black px-4 py-2 rounded-lg font-semibold text-sm md:text-xl hover:text-white transition-colors duration-200 cursor-pointer ease-in-out">
                    Pending
                  </div>
                  <div className="flex-1 bg-transparent hover:bg-black px-4 py-2 rounded-lg font-semibold text-sm md:text-xl hover:text-white transition-colors duration-200 cursor-pointer ease-in-out">
                    Overdue
                  </div>
                  <div className="flex-1 bg-transparent hover:bg-black px-4 py-2 rounded-lg font-semibold text-sm md:text-xl hover:text-white transition-colors duration-200 cursor-pointer ease-in-out">
                    Completed
                  </div>
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

      <CardBody className="flex-grow bg-transparent lg:mr-20 lg:ml-20 p-4 overflow-x-auto">
        <table className="mt-4 w-full min-w-max text-left table-auto">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={head}
                  className="border-y bg-gray-900 hover:bg-gray-800 p-2 md:p-4 border-black transition-colors cursor-pointer"
                >
                  <Typography
                    variant="large"
                    color="white"
                    className="flex justify-between items-center gap-2 font-normal leading-none"
                  >
                    {head}
                    {index !== TABLE_HEAD.length - 1 && (
                      <ChevronUpDownIcon
                        strokeWidth={2}
                        className="w-4 h-4 text-white"
                      />
                    )}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map((todo) => (
              <tr
                key={todo.title}
                className="hover:bg-blue-800/20 transition-colors duration-200"
              >
                <td className="border-purple-700 p-2 md:p-4 border-b">
                  <Typography
                    variant="large"
                    style={{ color: "black" }}
                    className="font-semiBold"
                  >
                    {todo.title}
                    {/* check Box here for completed task  */}
                  </Typography>
                </td>
                <td className="border-gray-700 p-2 md:p-4 border-b">
                  <Typography variant="large" style={{ color: "black" }}>
                    {todo.dueDate}
                  </Typography>
                </td>
                <td className="border-gray-700 p-2 md:p-4 border-b">
                  <Typography
                    variant="large"
                    style={{
                      color:
                        todo.priority === "High"
                          ? "red"
                          : todo.priority === "Medium"
                          ? "yellow"
                          : "green",
                    }}
                    className="font-semibold"
                  >
                    {todo.priority}
                  </Typography>
                </td>
                <td className="border-gray-700 p-2 border-b">
                  <div className="flex justify-center items-center gap-8 md:gap-10">
                    <Tooltip content="Edit Task">
                      <IconButton variant="text">
                        <PencilIcon className="w-4 h-4 text-blue-600" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip content="Delete Task">
                      <IconButton variant="text">
                        <TrashIcon className="w-4 h-4 text-red-600" />
                      </IconButton>
                    </Tooltip>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardBody>

      <CardFooter className="flex justify-between items-center lg:mr-20 lg:ml-20 p-4">
        <Typography variant="large" color="black" className="font-semibold">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button
            variant="outlined"
            size="sm"
            className="bg-black hover:bg-white border-black text-white hover:text-black transition-colors duration-200 ease-in-out"
          >
            Previous
          </Button>
          <Button
            variant="outlined"
            size="sm"
            className="border-white bg-white hover:bg-black text-black hover:text-white transition-colors duration-200 ease-in-out"
          >
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export default TodoList;
