//import React, { useState } from 'react';
import { Sun, MoonStars  } from 'phosphor-react';
import { useTheme } from "@/components/theme-provider"

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme(); // Get the theme and setTheme from context
  const isDarkMode = theme === "dark";

  const toggleDarkMode = () => {
    setTheme(isDarkMode ? "light" : "dark");
  };

  return (
    <div
      onClick={toggleDarkMode}
      className="relative w-12 h-6 bg-gray-300 dark:bg-slate-800 rounded-full flex items-center cursor-pointer ring-1 dark:ring-1 dark:ring-slate-600 ring-slate-500 dark:hover:ring-2 hover:ring-2 dark:hover:ring-green-500 hover:ring-green-500 transition-all p-0.5"
    >
      {/* Toggle Knob */}
      <div
        className={`w-5 h-5 rounded-full transform transition-transform duration-300 flex items-center justify-center ${
          isDarkMode ? "translate-x-[24.5px] bg-black" : "translate-x-[-0.5px] bg-white"
        }`}
      >
        {/* Toggle Icon */}
        {isDarkMode ? (
          <MoonStars  className="text-white w-4 h-4" />
        ) : (
          <Sun className="text-slate-400 w-4 h-4" />
        )}
      </div>
    </div>
  );
};
  
  export default ThemeToggle;