import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>
        This is the homepage. If you are not logged in, you can log in by clicking the link below.
      </p>
      {/* Link to the login page */}
      <Link to="/login">Go to Login</Link>
    </div>
  );
};

export default HomePage;
