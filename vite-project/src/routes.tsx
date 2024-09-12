import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'; // Import your pages
import LoginPage from './pages/LoginPage';
import AboutPage from './pages/AboutPage';
import MainLayout from './layout/MainLayout';  // Import the MainLayout
import RequireAuth from './components/RequireAuth';

const AppRouter: React.FC = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />  {/* Login page route */}
        <Route 
          path="/about" 
          element={
            <RequireAuth>
              <AboutPage />
            </RequireAuth>
          } 
        />
        {/* Add more routes here */}
      </Routes>
    </MainLayout>
  );
};

export default AppRouter;
