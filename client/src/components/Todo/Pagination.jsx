import React, { useEffect, useState } from "react";
import { Typography, Button, CardFooter } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { getTodos } from "../../store/todo/todoAction";
import { selectTotalPages } from "../../store/todo/todoSelectors";

/**
 * Footer component for the TodoList component.
 *
 * This component renders a pagination system to navigate through the list
 * of todos. It displays the current page number and the total number of
 * pages. It also provides two buttons to navigate to the previous or next
 * page.
 *
 * The component uses the useSelector hook to get the totalPages from the
 * store, and the useDispatch hook to dispatch the getTodos action to fetch
 * the todos for the current page.
 *
 * The component also uses the useState hook to store the current page
 * number, and the useEffect hook to fetch the todos when the component
 * mounts or when the page number changes.
 */

const TodoListFooter = () => {
  const dispatch = useDispatch();
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
