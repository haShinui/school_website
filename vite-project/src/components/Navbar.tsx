import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store'; // Adjust the import path as necessary
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import { ModeToggle } from './mode-toggle'; // Import the ModeToggle component

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const userRole = useSelector((state: RootState) => state.auth.user?.role);

  return (
    <nav className="w-full bg-gray-800 dark:bg-gray-900 p-4 fixed top-0 left-0 z-50 flex justify-between items-center">
      <ul className="flex space-x-6">
        <li>
          <Link to="/" className="text-white text-lg hover:text-blue-400 dark:hover:text-blue-300">
            {t('home')}
          </Link>
        </li>
        {isAuthenticated && (
          <li>
            <Link to="/about" className="text-white text-lg hover:text-blue-400 dark:hover:text-blue-300">
              {t('about')}
            </Link>
          </li>
        )}
        {!isAuthenticated && (
          <li>
            <Link to="/login" className="text-white text-lg hover:text-blue-400 dark:hover:text-blue-300">
              {t('login')}
            </Link>
          </li>
        )}
        {isAuthenticated && userRole === 'manager' && (
          <li>
            <Link to="/manager-dashboard" className="text-white text-lg hover:text-blue-400 dark:hover:text-blue-300">
              {t('manager_dashboard')}
            </Link>
          </li>
        )}
      </ul>
      <div className="flex items-center space-x-4">
        <LanguageSwitcher />
        <ModeToggle /> {/* Include the theme toggle button */}
      </div>
    </nav>
  );
};

export default Navbar;
