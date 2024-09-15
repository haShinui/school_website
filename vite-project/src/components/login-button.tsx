import React from 'react';
import { Button } from "@/components/ui/button"; // Assuming this is your custom button component
import { SignIn } from "phosphor-react"; // Phosphor icon for login
import { useNavigate } from "react-router-dom"; // React Router for navigation

export function LoginButton() {
  const navigate = useNavigate(); // React Router's hook to navigate

  const handleLogin = () => {
    navigate('/login'); // Redirects to the login page
  };

  return (
    <Button 
      className="border border-gray-300 text-gray-700 dark:text-white dark:border-gray-600 rounded-lg px-2.5 py-2 text-sm w-auto bg-white hover:bg-gray-200 dark:bg-gray-900 dark:hover:bg-gray-600 transition-colors duration-200"
      size="sm"
      onClick={handleLogin} // Attach the redirect logic
    >
      <SignIn className="mr-2 h-4 w-4" /> {/* Phosphor SignIn icon */}
      Login
    </Button>
  );
}

export default LoginButton;
