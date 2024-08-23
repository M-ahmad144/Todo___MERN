import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <section className="flex lg:flex-row flex-col bg-gray-900 h-screen text-white">
      {/* Left column container with background */}
      <div className="flex-shrink-0 lg:w-6/12 xl:w-6/12">
        <img
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          className="rounded-xl w-full h-72 lg:h-full object-cover"
          alt="Sample image"
        />
      </div>

      {/* Right column container */}
      <div className="flex justify-center items-center p-6 w-full lg:w-6/12 xl:w-5/12">
        <form className="w-full max-w-md">
          {/* Sign in section */}
          <div className="mb-8 text-center">
            <p className="mb-2 font-bold text-3xl">Sign in</p>
            <p className="text-gray-400 text-sm">Access your account</p>
          </div>

          {/* Email input */}
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
              className="border-gray-700 focus:border-primary bg-gray-900 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary w-full text-white transition duration-300 placeholder-gray-500"
              placeholder="Enter your email"
            />
          </div>

          {/* Password input */}
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
              className="border-gray-700 focus:border-primary bg-gray-900 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary w-full text-white transition duration-300 placeholder-gray-500"
              placeholder="Enter your password"
            />
          </div>

          {/* Login button */}
          <div className="text-center">
            <button
              type="button"
              className="bg-red-400 hover:bg-red-500 focus:bg-red-600 active:bg-red-700 shadow-md px-6 py-3 rounded-lg font-medium text-white transition duration-300"
            >
              Login
            </button>
          </div>

          {/* Register link */}
          <div className="mt-4 text-center">
            <p className="font-semibold text-sm">
              Don't have an account?{" "}
              <Link to="/signup" className="text-red-600 hover:underline">
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
