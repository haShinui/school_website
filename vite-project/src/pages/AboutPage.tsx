import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/apiService';
import { RootState, AppDispatch } from '../store';
import { resetAuthState } from '../store/authSlice'; // Import actions
import { fetchAuthUser } from '../store/actions'; // Async action to fetch user info

const AboutPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const user = useSelector((state: RootState) => state.auth.user);

  // Fetch user info on component mount
  useEffect(() => {
    dispatch(fetchAuthUser()); // Fetch authentication info on page load
  }, [dispatch]);

  // Handle user logout
  const handleLogout = async () => {
    try {
      const response = await apiService.logout(); // Send POST request to log out
      if (response.data.success) {
        dispatch(resetAuthState()); // Reset the auth state after logout
        navigate('/'); // Redirect to the homepage after logout
      } else {
        console.error('Logout failed');
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
