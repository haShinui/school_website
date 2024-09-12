import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store'; // Adjust the import path as necessary

// Define the props type to include children
interface RequireAuthProps {
  children: React.ReactNode;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
    const location = useLocation();
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    // Check if user is not authenticated
    if (!isAuthenticated) {
        // Redirect them to the login page, but encode the current location so you can redirect them back after logging in
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // If authenticated, render the component that RequireAuth wraps
    return <>{children}</>;
};

export default RequireAuth;
