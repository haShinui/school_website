import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import apiService from '../services/apiService';
import { checkAuthentication } from '../store/actions';  // Make sure to import the correct action
import { AppDispatch } from '../store'; // Import the AppDispatch type from your store

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>(); // Type dispatch as AppDispatch

  // Handle the login with username and password
  const secureAllauthLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const loginData = { username, password };
      const response = await apiService.secureAllauthLogin(loginData);
      
      if (response.data.success) {
        dispatch(checkAuthentication()); // Fetch the authenticated user after login
        navigate('/'); // Redirect to the homepage after successful login
      } else {
        setLoginError(response.data.message);
      }
    } catch (error) {
      setLoginError('Error during login. Please check the console for more details.');
      console.error('Error during login:', error);
    }
  };

  // Handle Microsoft login
  const initiateMicrosoftLogin = async () => {
    try {
      const response = await apiService.secureMicrosoftLogin();
      
      if (response.data.login_url) {
        window.location.href = response.data.login_url; // Redirect to the Microsoft login URL
      } else {
        console.error('Microsoft login URL not found.');
      }
    } catch (error) {
      console.error('Error initiating Microsoft login:', error);
    }
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      <form onSubmit={secureAllauthLogin}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login with Username and Password</button>
      </form>
      {loginError && <p>Login failed: {loginError}</p>}
      <hr />
      <h2>Or</h2>
      <button onClick={initiateMicrosoftLogin}>Login with Microsoft</button>
    </div>
  );
};

export default LoginPage;
