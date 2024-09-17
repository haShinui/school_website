import React from 'react';
import { Link } from 'react-router-dom';
import ModeToggle from '../components/ThemeToggle'; // Import the ModeToggle component
import LanguageSwitcher from '@/components/LanguageSwitcher';



const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <h1 className="text-4xl font-bold mb-6">Welcome to the Home Page</h1>
      <p className="text-lg mb-4 text-center">
        This is the homepage. If you are not logged in, you can log in by clicking the link below.
      </p>
      
      <ModeToggle /> {/* Include the theme toggle button */}
    </div>
{/* Hover card section */}
<div className="flex justify-center items-center h-screen">
<HoverCard
  title="Something awesome"
  description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fuga placeat odio pariatur doloribus sint?"
  image="https://picsum.photos/600/800"  // Placeholder image with 4:3 ratio
/>
</div>
    
  );
};

export default HomePage;
