import React from 'react';
import { Link } from 'react-router-dom';
import { ModeToggle } from '../components/mode-toggle';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <h1 className="text-4xl font-bold mb-6">Welcome to the Home Page</h1>
      <p className="text-lg mb-4 text-center">
        This is the homepage. If you are not logged in, you can log in by clicking the link below.
      </p>
      <ModeToggle />
      {/* Link to the login page */}
      <Link 
        to="/login" 
        className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300"
      >
        Go to Login
      </Link>
    </div>
  );
};

export default HomePage;
