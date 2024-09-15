import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {HomePageComponent} from './pages/home-page';
import {LoginPageComponent} from './components/login-page';
import AboutPage from './pages/AboutPage';
import ManagerDashboard from './pages/ManagerDashboard'; // Ensure you import the ManagerDashboard component
import RequireAuth from './components/RequireAuth';
import { ThemeProvider } from "@/components/theme-provider";

const AppRouter: React.FC = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route path="/" element={<HomePageComponent />} />
        <Route path="/login" element={<LoginPageComponent />} />
        <Route path="/about" element={<AboutPage />} />
        {/* Protected route for manager role */}
        <Route 
          path="/manager-dashboard" 
          element={
            <RequireAuth requiredRole="manager">
              <ManagerDashboard />
            </RequireAuth>
          }
        />
        {/* Add more routes as needed */}
      </Routes>
    </ThemeProvider>
  );
};

export default AppRouter;
