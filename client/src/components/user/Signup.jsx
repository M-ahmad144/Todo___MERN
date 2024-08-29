import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";
import { signup } from "../../store/user/userAction";

import {
  selectUserLoading,
  selectUserError,
} from "../../store/user/userSelectors";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const dispatch = useDispatch();
  const loading = useSelector(selectUserLoading);
  const error = useSelector(selectUserError);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(signup(formData))
      .unwrap()
      .then(() => {
        navigate("/login");
        toast.success("Signup successful!");
        // Clear the form
        setFormData({
          name: "",
          email: "",
          password: "",
          passwordConfirm: "",
        });
      })
      .catch(() => {
        toast.error(error || "Something went wrong. Please try again.");
      });
  };

  return (
    <section className="flex lg:flex-row flex-col h-screen text-gray-100">
      {/* Left column container with background */}
      <div className="relative flex justify-center items-center lg:w-6/12 xl:w-6/12 h-full">
        <img
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          className="top-1/2 left-1/2 absolute rounded-xl w-[80%] h-auto transform -translate-x-1/2 -translate-y-1/2 object-cover"
          alt="Sample image"
        />
      </div>

      <div className="flex justify-center items-center p-6 w-full lg:w-6/12 xl:w-5/12">
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="mb-8 text-center">
            <p className="mb-2 font-bold text-3xl">Sign up</p>
            <p className="text-gray-50 text-sm">Create a new account</p>
          </div>

          <div className="mb-6">
            <label
              htmlFor="username"
              className="block mb-2 font-medium text-gray-50 text-sm"
            >
              Username
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="border-gray-700 focus:border-primary bg-gray-900 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary w-full text-gray-100 transition duration-300 placeholder-gray-500"
              placeholder="Enter your username"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 font-medium text-gray-50 text-sm"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="border-gray-700 focus:border-primary bg-gray-900 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary w-full text-gray-100 transition duration-300 placeholder-gray-500"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 font-medium text-gray-50 text-sm"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="border-gray-700 focus:border-primary bg-gray-900 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary w-full text-gray-100 transition duration-300 placeholder-gray-500"
              placeholder="Enter your password"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="passwordConfirm"
              className="block mb-2 font-medium text-gray-50 text-sm"
            >
              Confirm Password
            </label>
            <input
              id="passwordConfirm"
              type="password"
              value={formData.passwordConfirm}
              onChange={handleChange}
              className="border-gray-700 focus:border-primary bg-gray-900 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary w-full text-gray-100 transition duration-300 placeholder-gray-500"
              placeholder="Confirm your password"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-red-400 hover:bg-red-500 focus:bg-red-600 active:bg-red-700 shadow-md px-6 py-3 rounded-lg font-medium text-gray-100 transition duration-300"
              disabled={loading}
            >
              {loading ? (
                <TailSpin height={24} width={24} color="#F8F8F8" />
              ) : (
                "Sign up"
              )}
            </button>
          </div>

          <div className="mt-4 text-center">
            <p className="font-semibold text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-red-600 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
