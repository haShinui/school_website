import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import apiService from '../services/apiService'; // Ensure you have the correct path to your apiService

interface RequireAuthProps {
  children: React.ReactNode;
  requiredRole?: string;
}

interface AuthStatus {
  isAuthenticated: boolean;
  role: string | null;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children, requiredRole }) => {
  const location = useLocation();
  const [authStatus, setAuthStatus] = useState<AuthStatus>({ isAuthenticated: false, role: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthStatus = async () => {
      try {
        const result = await apiService.checkAuth(); // Call your API service to check the auth status
        setAuthStatus({ isAuthenticated: result.isAuthenticated, role: result.role });
      } catch (error) {
        console.error('Failed to fetch auth status:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAuthStatus();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Or any other loading indicator
  }

  if (!authStatus.isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && authStatus.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default RequireAuth;
