"use client";
//import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { SignIn } from "phosphor-react"; // Phosphor icon for login
import { cn } from "@/lib/utils"; // Utility function to merge classes

export default function ArrowButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const navigate = useNavigate(); // Initialize navigate

  const handleClick = () => {
    navigate("/login"); // Navigate to /login when clicked
  };

  return (
    <button
      {...props}
      onClick={handleClick} // Add onClick to handle navigation
      className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden rounded-full border-2 border-gray-400 bg-white dark:bg-slate-950 dark:border-white px-4 py-2 text-sm font-medium shadow-md transition duration-300 ease-out",
        props.className
      )}
    >
      {/* Background overlay (changes color based on light/dark mode) */}
      <span
        className={cn(
          "ease absolute -inset-0 flex h-full w-[120%] -translate-x-full items-center justify-center bg-black dark:bg-white text-white dark:text-black duration-300 group-hover:-translate-x-2"
        )}
      >
        <SignIn size={20} className="text-white dark:text-black" /> {/* Reduced icon size */}
      </span>

      {/* Button text (adjusted for size and color based on light/dark mode) */}
      <span
        className="absolute flex h-full w-full transform items-center justify-center font-semibold text-black dark:text-white transition-all duration-300 ease-in-out group-hover:translate-x-full"
      >
        Login
      </span>

      {/* Invisible element to maintain button size */}
      <span className="invisible relative">Button</span>
    </button>
  );
}
