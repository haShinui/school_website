import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface UserInfo {
  username?: string | null;
  firstName?: string | null;
  lastName?: string | null;
}

interface UserState {
  isAuthenticated: boolean;
  user?: UserInfo;
}

const AboutPage: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserState | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const username = sessionStorage.getItem('username');
    const firstName = sessionStorage.getItem('firstName');
    const lastName = sessionStorage.getItem('lastName');

    if (username || firstName || lastName) {
      setUserInfo({
        isAuthenticated: true,
        user: {
          username,
          firstName,
          lastName,
        },
      });
    } else {
      setUserInfo({ isAuthenticated: false });
    }
  }, []);

  const handleLogout = async () => {
    sessionStorage.clear();
    setUserInfo(null);
    navigate('/');
  };

  return (
    <div>
      <h1>About Page</h1>
      {userInfo && userInfo.isAuthenticated ? (
        <div>
          <p>Welcome, {userInfo.user?.username || `${userInfo.user?.firstName} ${userInfo.user?.lastName}`}!</p>
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


 /*
 also how often is getUserinfo called, i want that its only called after user logged in only then, can u make taht?
 */