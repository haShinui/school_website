import React from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation to check current route
import Navbar from './components/navbar';  // Import the Navbar
import Routes from './routes'; // Import the routing logic
import { ThemeProvider } from "@/components/theme-provider"

const App: React.FC = () => {
  const location = useLocation(); // Get the current route

  // Check if the current page is the login page
  const isLoginPage = location.pathname === "/login";

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="App">
        {/* Conditionally render the Navbar only if it's not the login page */}
        {!isLoginPage && <Navbar />}

        {/* Render your routes inside the layout */}
        <div className="content">
          <Routes />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
