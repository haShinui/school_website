import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AboutPage from './pages/AboutPage';
import Navbar from './components/Navbar';  // Import the Navbar

const AppRouter: React.FC = () => {
  return (
    <Router>
      {/* The Navbar is rendered here, it will appear on every route */}
      <Navbar />  
      
      {/* Define your routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
