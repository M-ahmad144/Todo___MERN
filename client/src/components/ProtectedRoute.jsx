import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();
  if (!isAuthenticated) {
    toast.error("Please login first");
    navigate("/login");
  }
  // If the user is authenticated, allow access to the protected route
  return children;
};

export default ProtectedRoute;
