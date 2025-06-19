import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi"; 

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");

    if (token) {
      setIsLoggedIn(true);
      setUsername(storedUsername || "User");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setUsername("");
    navigate("/");
  };

  return (
    <nav className="w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
       
        <Link to="/" className="text-2xl font-bold text-blue-600">
          StayFinder
        </Link>

      
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <Link
            to="/dashboard"
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Become a Host
          </Link>

          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-full hover:bg-blue-50 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <span className="text-gray-700 font-medium">{username}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-red-500 border border-red-500 rounded-full hover:bg-red-50 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      
      {isMenuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3">
          <Link
            to="/dashboard"
            className="block text-gray-700 hover:text-blue-600 font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Become a Host
          </Link>

          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="block px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-full hover:bg-blue-50 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <span className="block text-gray-700 font-medium">{username}</span>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm font-medium text-red-500 border border-red-500 rounded-full hover:bg-red-50 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
