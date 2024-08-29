import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
  Select,
  Option,
} from "@material-tailwind/react";
import { useState } from "react"; // Import useState for handling state

const TABS = [
  { label: "Today", value: "today" },
  { label: "Pending", value: "pending" },
  { label: "Overdue", value: "overdue" },
];

const TAGS = ["Work", "Personal", "Urgent"];

const TABLE_HEAD = ["Title", "Due Date", "Priority", "Completed", "Actions"];

// Sample todos data for filtering
const TABLE_ROWS = [
  {
    title: "Task 1",
    dueDate: "2024-08-30",
    priority: "High",
    completed: false,
    tag: "Work",
    status: "today",
  },
  {
    title: "Task 2",
    dueDate: "2024-09-01",
    priority: "Medium",
    completed: false,
    tag: "Personal",
    status: "pending",
  },
  {
    title: "Task 3",
    dueDate: "2024-09-02",
    priority: "Low",
    completed: true,
    tag: "Urgent",
    status: "overdue",
  },
  // Add more tasks as needed...
];

export function TodoList() {
  const [selectedTab, setSelectedTab] = useState("today"); // State for active tab
  const [selectedTag, setSelectedTag] = useState(""); // State for active tag

  // Filter todos based on selected tab (status) and selected tag
  const filteredTodos = TABLE_ROWS.filter(
    (todo) =>
      (selectedTab === "all" || todo.status === selectedTab) &&
      (selectedTag === "" || todo.tag === selectedTag)
  );

  return (
    <Card className="bg-transparent w-full h-full">
      <CardHeader
        floated={false}
        shadow={false}
        className="relative bg-transparent rounded-none"
      >
        <div className="flex md:flex-row flex-col justify-between items-center gap-4 mt-4 md:mt-8 mb-4 p-4">
          <div className="flex justify-center mb-4 md:mb-0 w-full md:w-[80%] lg:w-[65%]">
            <Tabs
              value={selectedTab}
              onChange={(value) => setSelectedTab(value)}
              className="w-full"
            >
              <TabsHeader className="bg-gradient-to-r from-[#32264e] via-[#d87979] to-[#1b3f69] rounded-lg w-full text-white">
                {TABS.map(({ label, value }) => (
                  <Tab
                    key={value}
                    value={value}
                    className="hover:bg-yellow-50 px-4 py-2 rounded-lg font-semibold text-sm md:text-xl hover:text-black transition-colors duration-200 ease-in-out"
                  >
                    {label}
                  </Tab>
                ))}
              </TabsHeader>
            </Tabs>
          </div>

          <div className="flex justify-center md:ml-4 w-full md:w-auto">
            <Button className="flex items-center gap-2 bg-black hover:bg-white w-full md:w-auto text-white hover:text-black transition">
              + Add Task
            </Button>
          </div>
        </div>
        <div className="flex justify-start mb-4 md:mb-0 w-full">
          <Select
            label="Filter by Tag"
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="ml-5 border border-black rounded-lg w-36 md:w-44 h-10 text-black"
            color="gray"
            size="lg"
            variant="standard"
            icon={<ChevronUpDownIcon strokeWidth={2} className="w-4 h-4" />}
            iconPosition="right"
            iconClassName="text-black"
            iconSelectedClassName="text-black"
            style={{
              backgroundColor: "white",
              alignItems: "center",
            }}
          >
            <Option value="" className="text-center text-white">
              All Tags
            </Option>
            {TAGS.map((tag) => (
              <Option key={tag} value={tag} className="text-center text-white">
                {tag}
              </Option>
            ))}
          </Select>
        </div>
      </CardHeader>

      <CardBody className="flex-grow bg-transparent p-4 overflow-x-auto">
        <table className="mt-4 w-full min-w-max text-left table-auto">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={head}
                  className="border-y bg-gray-900 hover:bg-gray-800 p-2 md:p-4 border-black transition-colors cursor-pointer"
                >
                  <Typography
                    variant="small"
                    color="white"
                    className="flex justify-between items-center gap-2 font-normal leading-none"
                  >
                    {head}{" "}
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
            {filteredTodos.map((todo, index) => {
              const isLast = index === filteredTodos.length - 1;
              const classes = isLast
                ? "p-2 md:p-4"
                : "p-2 md:p-4 border-b border-gray-600";
              return (
                <tr key={todo.title}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="white"
                      className="font-normal"
                    >
                      {todo.title}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="white"
                      className="font-normal"
                    >
                      {todo.dueDate}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="white"
                      className="font-normal"
                    >
                      {todo.priority}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Chip
                      value={todo.completed ? "Completed" : "Pending"}
                      color={todo.completed ? "green" : "red"}
                      className="text-white"
                    />
                  </td>
                  <td className={classes}>
                    <Tooltip content="Edit Task">
                      <IconButton variant="text">
                        <PencilIcon className="w-4 h-4 text-white" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip content="Delete Task">
                      <IconButton variant="text">
                        <TrashIcon className="w-4 h-4 text-white" />
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex justify-between items-center p-4 border-t border-black">
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
