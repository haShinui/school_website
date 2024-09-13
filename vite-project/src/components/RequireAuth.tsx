import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store'; // Adjust the import path as necessary

interface RequireAuthProps {
  children: React.ReactNode;
  requiredRole?: string;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children, requiredRole }) => {
    const location = useLocation();
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const userRole = useSelector((state: RootState) => state.auth.user?.role);

    // Check if user is not authenticated or does not have the required role
    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // If authenticated and has the required role, render the component that RequireAuth wraps
    return <>{children}</>;
};

export default RequireAuth;
