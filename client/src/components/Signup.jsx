import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";

export default function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.password !== formData.passwordConfirm) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      // Replace with your actual API call
      // await signup(formData);
      toast.success("Signup successful!");
    } catch (err) {
      toast.error("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex lg:flex-row flex-col bg-gray-900 h-screen text-white">
      <div className="flex-shrink-0 lg:w-6/12 xl:w-6/12">
        <img
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          className="rounded-xl w-full h-72 lg:h-full object-cover"
          alt="Sample image"
        />
      </div>

      <div className="flex justify-center items-center p-6 w-full lg:w-6/12 xl:w-5/12">
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="mb-8 text-center">
            <p className="mb-2 font-bold text-3xl">Sign up</p>
            <p className="text-gray-400 text-sm">Create a new account</p>
          </div>

          <div className="mb-6">
            <label
              htmlFor="username"
              className="block mb-2 font-medium text-gray-300 text-sm"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              className="border-gray-700 focus:border-primary bg-gray-900 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary w-full text-white transition duration-300 placeholder-gray-500"
              placeholder="Enter your username"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 font-medium text-gray-300 text-sm"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="border-gray-700 focus:border-primary bg-gray-900 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary w-full text-white transition duration-300 placeholder-gray-500"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 font-medium text-gray-300 text-sm"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="border-gray-700 focus:border-primary bg-gray-900 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary w-full text-white transition duration-300 placeholder-gray-500"
              placeholder="Enter your password"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="passwordConfirm"
              className="block mb-2 font-medium text-gray-300 text-sm"
            >
              Confirm Password
            </label>
            <input
              id="passwordConfirm"
              type="password"
              value={formData.passwordConfirm}
              onChange={handleChange}
              className="border-gray-700 focus:border-primary bg-gray-900 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary w-full text-white transition duration-300 placeholder-gray-500"
              placeholder="Confirm your password"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-red-400 hover:bg-red-500 focus:bg-red-600 active:bg-red-700 shadow-md px-6 py-3 rounded-lg font-medium text-white transition duration-300"
              disabled={loading}
            >
              {loading ? (
                <TailSpin height={24} width={24} color="#ffffff" />
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
