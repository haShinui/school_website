import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {HomePageComponent} from './pages/home-page';
import { LoginPageComponent }  from './components/login-page';
//import AboutPage from './pages/AboutPage';
import { AboutPageNew } from './pages/AboutPageNew';
import SignupCoursePage from './pages/signupCourse';
import {ManagerDashboardComponent} from './pages/ManagerDashboard'; // Ensure you import the ManagerDashboard component
import RequireAuth from './components/RequireAuth';
import { ThemeProvider } from "@/components/theme-provider";


const AppRouter: React.FC = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Routes>
        <Route path="/" element={<HomePageComponent />} />
        <Route path="/login" element={<LoginPageComponent />} />
        <Route path="/about" element={<AboutPageNew />} />
        {/* Protected route for manager role */}
        <Route 
          path="/manager-dashboard" 
          element={
            <RequireAuth requiredRole="manager">
              <ManagerDashboardComponent />
            </RequireAuth>
          }
        />
                <Route 
          path="/signup-course" 
          element={
            <RequireAuth requiredRole="normal">
              <SignupCoursePage />
            </RequireAuth>
          }
        />
        {/* Add more routes as needed */}
      </Routes>
      
    </ThemeProvider>
  );
};

export default AppRouter;
