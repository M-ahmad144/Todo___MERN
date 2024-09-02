import React, { useEffect, useState } from "react";
import { Typography, Button, CardFooter } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { getTodos } from "../../store/todo/todoAction";
import {
  selectGetTodos,
  selectTotalPages,
} from "../../store/todo/todoSelectors";

const TodoListFooter = () => {
  const dispatch = useDispatch();
  const todos = useSelector(selectGetTodos);
  const totalPages = useSelector(selectTotalPages);

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getTodos({ page, limit: 10 }));
  }, [dispatch, page]);

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <CardFooter className="flex justify-between items-center lg:mr-20 lg:ml-20 p-4">
      <Typography variant="small" color="black" className="font-semibold">
        Page {page} of {totalPages}
      </Typography>
      <div className="flex gap-2">
        <Button
          variant="outlined"
          size="sm"
          className="bg-black hover:bg-white border-black text-white hover:text-black transition-colors duration-200 ease-in-out"
          onClick={handlePrevious}
          disabled={page === 1}
        >
          Previous
        </Button>
        <Button
          variant="outlined"
          size="sm"
          className="border-white bg-white hover:bg-black text-black hover:text-white transition-colors duration-200 ease-in-out"
          onClick={handleNext}
          disabled={page === totalPages}
        >
          Next
        </Button>
      </div>
    </CardFooter>
  );
};

export default TodoListFooter;
