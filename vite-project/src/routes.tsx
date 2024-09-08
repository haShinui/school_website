import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Do not import BrowserRouter here
import HomePage from './pages/HomePage'; // Import your pages
import LoginPage from './pages/LoginPage';
import AboutPage from './pages/AboutPage';

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />  {/* Login page route */}
      <Route path="/about" element={<AboutPage />} />
      {/* Add more routes here */}
    </Routes>
  );
};

export default AppRouter;
