import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Moon, Sun } from "phosphor-react"; // Icons for theme toggling

const NavbarTest: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Dropdown state

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark", !isDarkMode); // Toggle dark class on the root
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav
      className="w-full bg-gray-800 dark:bg-gray-900 p-4 sticky top-0 left-0 z-50 flex justify-between items-center transition duration-300 ease-in-out transform translate3d(0, 0, 0)"
    >
      {/* Navigation Links with Fading and Sliding Animations */}
      <ul className="flex space-x-6">
        <li className="transition-opacity duration-500 ease-in-out hover:opacity-50">
          <Link to="/" className="text-white text-lg hover:text-blue-400 dark:hover:text-blue-300">
            Home
          </Link>
        </li>
        <li className="transition-transform duration-500 ease-in-out hover:translate-x-2">
          <Link to="/about" className="text-white text-lg hover:text-blue-400 dark:hover:text-blue-300">
            About
          </Link>
        </li>
        <li className="transition-transform duration-500 ease-in-out hover:translate-x-2">
          <Link to="/services" className="text-white text-lg hover:text-blue-400 dark:hover:text-blue-300">
            Services
          </Link>
        </li>
        <li className="transition-transform duration-500 ease-in-out hover:translate-x-2">
          <Link to="/contact" className="text-white text-lg hover:text-blue-400 dark:hover:text-blue-300">
            Contact
          </Link>
        </li>
      </ul>

      {/* Theme Toggle Switch */}
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleTheme}
          aria-label="Toggle Theme"
          className="bg-gray-300 dark:bg-gray-600 p-2 rounded-full flex items-center justify-center transition-transform duration-300 ease-in-out"
        >
          {isDarkMode ? <Moon className="text-white w-6 h-6" /> : <Sun className="text-yellow-500 w-6 h-6" />}
        </button>

        {/* Dropdown Menu for Buttons */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg transition-transform duration-300 ease-in-out hover:scale-110"
          >
            Account
          </button>

          {/* Dropdown Content */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-lg rounded-lg py-2">
              <Link
                to="/login"
                className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavbarTest;
