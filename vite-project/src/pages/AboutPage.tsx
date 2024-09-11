import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState, AppDispatch } from '../store';
import { checkAuthentication, resetAuthState } from '../store/authSlice';
import apiService from '../services/apiService';

const AboutPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const user = useSelector((state: RootState) => state.auth.user);

  // Check authentication status on component mount
  useEffect(() => {
    dispatch(checkAuthentication());
  }, [dispatch]);

  // Handle user logout
  const handleLogout = async () => {
    try {
      const response = await apiService.logout(); // Call the logout endpoint
      if (response.data.success) {
        dispatch(resetAuthState()); // This will clear the local auth state
        navigate('/login'); // Redirect to the login page
      } else {
        console.error('Logout failed:', response.data.message);
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div>
      <h1>About Page</h1>
      {isAuthenticated && user ? (
        <div>
          <p>Welcome, {user.username || `${user.first_name} ${user.last_name}`}!</p>
          <p>Role: {user.role}</p>
          <button onClick={handleLogout}>Log Out</button>
        </div>
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>
  );
};

export default AboutPage;
