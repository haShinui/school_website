import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/apiService';
import ArrowButton from '@/components/animata/button/swipe-login'
const AboutPage: React.FC = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    username: sessionStorage.getItem('username') || '',
    firstName: sessionStorage.getItem('firstName') || '',
    lastName: sessionStorage.getItem('lastName') || ''
  });



  useEffect(() => {
    // If no username is found in session storage, fetch user info
    if (!userInfo.username) {
      const fetchUserInfo = async () => {
        try {
          const response = await apiService.getUserInfo();
          if (response.data.user) {
            setUserInfo({
              username: response.data.user.username || '',
              firstName: response.data.user.first_name || '',
              lastName: response.data.user.last_name || ''
            });
          }
        } catch (error) {
          console.error('Error fetching user info:', error);
        }
      };
      fetchUserInfo();
    }
  }, [userInfo.username]);

  // Handle user logout
  const handleLogout = async () => {
    try {
      const response = await apiService.logout();
      if (response.data.success) {
        sessionStorage.clear(); // Clear all session storage
        setUserInfo({ username: '', firstName: '', lastName: '' }); // Reset user info state
        navigate('/login'); // Redirect to the login page
        window.location.reload();
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
      
        <div>
          <p>Welcome, {userInfo.username || `${userInfo.firstName} ${userInfo.lastName}`}!</p>
          <button onClick={handleLogout}>Log Out</button>
        </div>
      
      <ArrowButton />
    </div>
  );
};

export default AboutPage;
