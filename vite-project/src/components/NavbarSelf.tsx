import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button"; // Import shadcn button
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "@/components/ui/dropdown-menu"; // Import shadcn dropdown menu
import LanguageSwitcher from "./LanguageSwitcher"; // Your custom LanguageSwitcher
import { useTranslation } from "react-i18next";
import { Sun, Moon } from 'phosphor-react';
import { useTheme } from "@/components/theme-provider";
import apiService from '../services/apiService';  // Import the theme provider from shadcn

interface AuthStatus {
  isAuthenticated: boolean;
  role: string | null;
}

const Navbar: React.FC = () => {
  const [authStatus, setAuthStatus] = useState<AuthStatus>({
    isAuthenticated: false,
    role: null,
  });
  const { t } = useTranslation();

  // Fetch authentication status when the component mounts
  useEffect(() => {
    const fetchAuthStatus = async () => {
      try {
        const result = await apiService.checkAuth(); // Check if the user is authenticated
        setAuthStatus({ isAuthenticated: result.isAuthenticated, role: result.role ?? null });
      } catch (error) {
        console.error("Failed to fetch authentication status", error);
      }
    };

    fetchAuthStatus();
  }, []); // Fetch auth status when component mounts

  // Theme Toggle Logic (Directly embedded here)
  const { theme, setTheme } = useTheme(); // Access theme and setTheme from the theme provider
  const isDarkMode = theme === "dark"; // Determine if the current theme is dark

  // Toggle between dark and light themes
  const toggleTheme = () => {
    setTheme(isDarkMode ? "light" : "dark");
  };

  return (
    <nav className="w-full bg-gray-800 dark:bg-gray-900 p-4 sticky top-0 left-0 z-50 flex justify-between items-center transition duration-300 ease-in-out">
      {/* Navigation Links */}
      <ul className="flex space-x-6">
        <li>
          <Button variant="link" asChild>
            <Link to="/" className="text-white text-lg hover:text-blue-400 dark:hover:text-blue-300">
              {t("home")}
            </Link>
          </Button>
        </li>
        <li>
          <Button variant="link" asChild>
            <Link to="/about" className="text-white text-lg hover:text-blue-400 dark:hover:text-blue-300">
              {t("about")}
            </Link>
          </Button>
        </li>
        {!authStatus.isAuthenticated && (
          <li>
            <Button variant="link" asChild>
              <Link to="/login" className="text-white text-lg hover:text-blue-400 dark:hover:text-blue-300">
                {t("login")}
              </Link>
            </Button>
          </li>
        )}
        {authStatus.isAuthenticated && authStatus.role === "manager" && (
          <li>
            <Button variant="link" asChild>
              <Link to="/manager-dashboard" className="text-white text-lg hover:text-blue-400 dark:hover:text-blue-300">
                {t("manager_dashboard")}
              </Link>
            </Button>
          </li>
        )}
      </ul>

      {/* Language Switcher and Theme Toggle */}
      <div className="flex items-center space-x-4">
        <LanguageSwitcher />

        {/* Dropdown for Profile Options or Auth Links */}
        {authStatus.isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-white dark:text-gray-300">
                {t("profile")}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link to="/profile">{t("profile")}</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/logout">{t("logout")}</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button variant="ghost" className="text-white dark:text-gray-300">
            <Link to="/login">{t("login")}</Link>
          </Button>
        )}

        {/* Theme Toggle (Now inline) */}
        <div
          onClick={toggleTheme}
          className="relative w-12 h-6 bg-gray-300 dark:bg-slate-800 rounded-full flex items-center cursor-pointer ring-1 dark:ring-1 dark:ring-slate-600 ring-slate-500 dark:hover:ring-2 hover:ring-2 dark:hover:ring-green-500 hover:ring-green-500 transition-all p-0.5"
        >
          <div
            className={`w-5 h-5 rounded-full transform transition-transform duration-300 flex items-center justify-center ${
              isDarkMode ? "translate-x-[24.5px] bg-black" : "translate-x-[-0.5px] bg-white"
            }`}
          >
            {isDarkMode ? (
              <Moon className="text-white w-4 h-4" />
            ) : (
              <Sun className="text-slate-400 w-4 h-4" />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
