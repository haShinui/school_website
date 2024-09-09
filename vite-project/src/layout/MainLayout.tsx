import React from 'react';
import Navbar from '../components/Navbar';  // Import the Navbar component

// Define that MainLayout takes a children prop of type React.ReactNode
const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
      <div>
        <Navbar />
        <main className="pt-16"> {/* Add padding to avoid content being blocked by the fixed navbar */}
          {children}
        </main>
      </div>
    );
  };
  
  export default MainLayout;
  
