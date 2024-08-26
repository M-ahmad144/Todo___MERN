import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { logout, getUser } from "../../store/user/userAction";

function Header() {
  const [showMenu, setShowMenu] = useState(false); // State to toggle the dropdown menu
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.user); // Access user state from Redux store

  // Fetch user information on component mount
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  // Handle logout
  const handleLogout = () => {
    try {
      dispatch(logout());
      toast.success("Logged out successfully");

      // Redirect to login page
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        event.target.closest(".user-menu-button") === null &&
        event.target.closest(".user-menu") === null
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle loading and error states
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  if (loading) {
    return (
      <header className="flex justify-between items-center bg-gradient-to-r from-purple-800 via-purple-600 to-purple-500 shadow-lg p-4">
        <Link
          to="#"
          className="flex items-center bg-gradient-to-r from-gray-900 via-gray-600 to-gray-500 hover:opacity-90 px-10 rounded-tl-full rounded-br-full h-10 font-bold text-white italic uppercase"
        >
          Todo App
        </Link>
        <div className="relative">
          {/* Replace with a spinner or loading indicator */}
          <div className="border-4 border-gray-300 border-t-4 border-t-purple-600 border-t-transparent rounded-full w-8 h-8 animate-spin"></div>
        </div>
      </header>
    );
  }

  return (
    <header className="flex justify-between items-center bg-gradient-to-r from-purple-800 via-purple-600 to-purple-500 shadow-lg p-4">
      {/* Logo Section */}
      <Link
        to="#"
        className="flex items-center bg-gradient-to-r from-gray-900 via-gray-600 to-gray-500 hover:opacity-90 px-10 rounded-tl-full rounded-br-full h-10 font-bold text-white italic uppercase"
      >
        Todo App
      </Link>

      {/* User Info Button */}
      <nav className="relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="flex justify-center items-center bg-gray-800 hover:bg-gray-700 shadow-md rounded-full w-14 h-14 text-gray-100 transition-colors user-menu-button focus:outline-none"
        >
          <FaUser className="text-xl" />
        </button>

        {/* Dropdown Menu */}
        {showMenu && (
          <div className="top-16 right-0 absolute bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 shadow-lg p-4 rounded-lg w-64 transform origin-top-right transition-all duration-300 ease-in-out scale-100 user-menu">
            <div className="flex flex-col items-center">
              <div className="w-full">
                <div className="flex flex-col items-center mb-4">
                  <div className="bg-gray-200 rounded-full w-16 h-16 overflow-hidden">
                    <FaUser className="p-2 w-full h-full text-gray-500" />
                  </div>
                  <p className="mt-2 font-semibold text-gray-100 text-lg">
                    {user?.name}
                  </p>
                  <p className="text-gray-200 text-sm">{user?.email}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={handleLogout}
                    className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md w-full text-gray-100 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
