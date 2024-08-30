import React from "react";
import {
  Typography,
  CardBody,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import {
  PencilIcon,
  TrashIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/solid";

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

const TodoTable = () => {
  return (
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
  );
};

export default TodoTable;
