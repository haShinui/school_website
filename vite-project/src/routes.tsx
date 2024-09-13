import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AboutPage from './pages/AboutPage';
import ManagerDashboard from './pages/ManagerDashboard';  // Ensure you import the ManagerDashboard component
import MainLayout from './layout/MainLayout';
import RequireAuth from './components/RequireAuth';
import { ThemeProvider } from "@/components/theme-provider";

const AppRouter: React.FC = () => {
  return (
    <MainLayout>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route 
            path="/about" 
            element={
              <RequireAuth>
                <AboutPage />
              </RequireAuth>
            }
          />
          <Route 
            path="/manager-dashboard" 
            element={
              <RequireAuth requiredRole="manager">
                <ManagerDashboard />
              </RequireAuth>
            }
          />
          {/* Add more routes here */}
        </Routes>
      </ThemeProvider>
    </MainLayout>
  );
};

export default AppRouter;
