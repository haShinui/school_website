import React, { useState, useEffect } from 'react';
import './ThemeToggle.css'; // Import the CSS file
import cloud1 from '../assets/cloud_1.svg';
import cloud2 from '../assets/cloud_2.svg';
import cloud3 from '../assets/cloud_3.svg';
import cloud4 from '../assets/cloud_4.svg';
import stars from '../assets/stars.svg';

const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <label className="switch" htmlFor="switch">
      <input
        type="checkbox"
        id="switch"
        checked={isDark}
        onChange={() => setIsDark(!isDark)}
      />
      <div className="sunmoon">
        <div className="darkside"></div>
      </div>
      <div className="border"></div>
      <div className="clouds">
        <img src={cloud1} alt="cloud" className="cloud cloud-1" />
        <img src={cloud2} alt="cloud" className="cloud cloud-2" />
        <img src={cloud3} alt="cloud" className="cloud cloud-3" />
        <img src={cloud4} alt="cloud" className="cloud cloud-4" />
        <img src={stars} alt="stars" className="stars" />
      </div>
    </label>
  );
};

export default ThemeToggle;
