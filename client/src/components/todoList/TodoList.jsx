import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
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
} from "@material-tailwind/react";

const TABS = [
  {
    label: "Today",
    value: "all",
  },
  {
    label: "Pending",
    value: "monitored",
  },
  {
    label: "overdue",
    value: "unmonitored",
  },
];

const TABLE_HEAD = ["Member", "Function", "Status", "Employed", ""];

const TABLE_ROWS = [
  // Your existing data...
];

export function TodoList() {
  return (
    <Card className="bg-transparent w-full h-full">
      {/* Card header */}
      <CardHeader
        floated={false}
        shadow={false}
        className="bg-transparent rounded-none"
      >
        {/* Header Container */}
        <div className="flex md:flex-row flex-col justify-between items-center mt-8 p-6">
          <div className="flex flex-grow justify-center mb-4">
            {/* Tabs */}
            <Tabs value="all" className="ml-7 w-full md:w-[80%] lg:w-[65%]">
              <TabsHeader className="bg-gradient-to-r from-[#32264e] via-[#d87979] to-[#1b3f69] rounded-lg text-white">
                {TABS.map(({ label, value }) => (
                  <Tab
                    key={value}
                    value={value}
                    className="hover:bg-yellow-50 px-6 py-3 rounded-lg font-semibold text-white text-xl md:text-2xl hover:text-black transition-all duration-200 ease-in-out"
                  >
                    {label}
                  </Tab>
                ))}
              </TabsHeader>
            </Tabs>
          </div>

          {/* Add Task Button */}
          <div className="flex justify-end items-center gap-4">
            <Button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white transition">
              {/* Include a relevant task icon if needed */}+ Add Task
            </Button>
          </div>
        </div>
      </CardHeader>

      {/* Card body */}
      <CardBody className="bg-transparent px-0 overflow-scroll">
        <table className="mt-4 w-full min-w-max text-left table-auto">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={head}
                  className="border-white border-y bg-transparent hover:bg-gray-800 p-4 transition-colors cursor-pointer"
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
            {TABLE_ROWS.map(
              ({ img, name, email, job, org, online, date }, index) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-gray-600";

                return (
                  <tr key={name}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Avatar src={img} alt={name} size="sm" />
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="white"
                            className="font-normal"
                          >
                            {name}
                          </Typography>
                          <Typography
                            variant="small"
                            color="gray-200"
                            className="opacity-70 font-normal"
                          >
                            {email}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="white"
                          className="font-normal"
                        >
                          {job}
                        </Typography>
                        <Typography
                          variant="small"
                          color="gray-200"
                          className="opacity-70 font-normal"
                        >
                          {org}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={online ? "online" : "offline"}
                          color={online ? "green" : "gray"}
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="gray-200"
                        className="font-normal"
                      >
                        {date}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Tooltip content="Edit User">
                        <IconButton variant="text">
                          <PencilIcon className="w-4 h-4 text-white" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </CardBody>

      {/* Card footer */}
      <CardFooter className="flex justify-between items-center border-white p-4 border-t">
        <Typography variant="small" color="white" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button
            variant="outlined"
            size="sm"
            className="border-white text-white"
          >
            Previous
          </Button>
          <Button
            variant="outlined"
            size="sm"
            className="border-white text-white"
          >
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
