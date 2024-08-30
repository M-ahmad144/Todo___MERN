import React from "react";
import { Typography, Button, CardFooter } from "@material-tailwind/react";

const TodoListFooter = () => {
  return (
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
  );
};

export default TodoListFooter;
