import React from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'react-i18next'; // Import translation hook

const Navbar: React.FC = () => {
  const { t } = useTranslation(); // Use the translation function

  return (
    <nav className="w-full bg-gray-800 dark:bg-gray-900 p-4 fixed top-0 left-0 z-50 flex justify-between items-center">
      {/* Left side: Links */}
      <ul className="flex space-x-6">
        <li>
          <Link to="/" className="text-white text-lg hover:text-blue-400 dark:hover:text-blue-300">
            {t('home')} {/* Translate home */}
          </Link>
        </li>
        <li>
          <Link to="/about" className="text-white text-lg hover:text-blue-400 dark:hover:text-blue-300">
            {t('about')} {/* Translate about */}
          </Link>
        </li>
        <li>
          <Link to="/login" className="text-white text-lg hover:text-blue-400 dark:hover:text-blue-300">
            {t('login')} {/* Translate login */}
          </Link>
        </li>
      </ul>

      {/* Right side: Language Switcher and Theme Toggle */}
      <div className="flex space-x-4">
        <LanguageSwitcher />
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
