import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService, { UserInfo } from '../services/apiService';

const AboutPage: React.FC = () => {
  const [userInfo, setUserInfo] = useState<{ isAuthenticated: boolean; user: UserInfo } | null>(null);
  const navigate = useNavigate();

  // Fetch user info on component mount
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await apiService.getUserInfo();
        setUserInfo(response.data); // Set user info from API response
      } catch (error) {
        console.error('Error fetching user info:', error);
        setUserInfo({ isAuthenticated: false, user: {} as UserInfo }); // Set as unauthenticated if an error occurs
      }
    };
    fetchUserInfo();
  }, []);

  // Handle user logout
  const handleLogout = async () => {
    try {
      const response = await apiService.logout();
      if (response.data.success) {
        setUserInfo(null); // Clear user info after logout
        navigate('/'); // Redirect to homepage after logout
      } else {
        console.error('Logout failed:', response.data.message); // Use response.data.message safely now
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div>
      <h1>About Page</h1>
      {userInfo && userInfo.isAuthenticated ? (
        <div>
          {userInfo.user.username ? (
            <p>Welcome, {userInfo.user.username}!</p>
          ) : (
            <p>
              Welcome, {userInfo.user.first_name} {userInfo.user.last_name}!
            </p>
          )}
          <button onClick={handleLogout}>Sign Out</button>
        </div>
      ) : (
        <div>
          <p>You are not logged in.</p>
          <a href="http://localhost:8082/login">Login with Microsoft</a>
        </div>
      )}
    </div>
  );
};

export default AboutPage;
